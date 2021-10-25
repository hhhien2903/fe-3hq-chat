import {
  Alert,
  Avatar,
  Button,
  Col,
  Image,
  Input,
  Row,
  Tooltip,
  Typography,
  Upload,
  message,
} from 'antd';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineInfoCircle, AiOutlineSearch, AiOutlineUserAdd } from 'react-icons/ai';
import { FaRegFileImage, FaRegFileVideo, FaRegSmile } from 'react-icons/fa';
import { ImAttachment } from 'react-icons/im';
import { RiSendPlaneFill } from 'react-icons/ri';
import { AppContext } from '../../contexts/AppProvider';
import Message from '../Message/Message';
import RoomToolbar from '../RoomToolbar/RoomToolbar';
import './ChatWindow.scss';
import SimpleBar from 'simplebar-react';
import { AuthContext } from '../../contexts/AuthProvider';
import MessageType from '../../enums/messageType';
import FormData from 'form-data';
import userApi from '../../api/userApi';
function ChatWindow() {
  const { currentRoom, socket } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [activeToolbar, setActiveToolbar] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [roomMessages, setRoomMessages] = useState([]);
  const inputRef = useRef();
  const chatBoxScrollRef = useRef();

  const handleActiveToolbar = () => {
    setActiveToolbar(!activeToolbar);
  };

  const addEmoji = (emoji) => {
    const ref = inputRef.current;
    ref.focus();
    let beforeCursorMessage = inputMessage.substring(0, ref.input.selectionEnd);
    let afterCursorMessage = inputMessage.substring(ref.input.selectionEnd);
    const message = beforeCursorMessage + emoji.native + afterCursorMessage;
    setInputMessage(message);
    setCursorPosition(beforeCursorMessage.length + emoji.native.length);
  };

  const handleShowEmojiPicker = () => {
    inputRef.current.focus();
    setShowEmojis(!showEmojis);
  };

  useEffect(() => {
    const getCursorPositionInputChat = () => {
      if (inputRef.current) {
        inputRef.current.input.selectionEnd = cursorPosition;
      }
    };
    getCursorPositionInputChat();
  }, [cursorPosition]);

  useEffect(() => {
    chatBoxScrollRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
    });
  }, [roomMessages]);

  useEffect(() => {
    if (socket && currentRoom) {
      socket.once('receive', (message) => {
        console.log(message);
        setRoomMessages([...roomMessages, message]);
      });
    }
  }, [roomMessages]);

  useEffect(() => {
    if (socket && currentRoom) {
      socket.emit('joinRoom', { roomId: currentRoom._id });
      socket.once('joinedRoom', (data) => {
        console.log('join room', data);
      });
      socket.emit('loadAllMessage', { roomId: currentRoom._id });
      socket.once('receiveAllMessage', (data) => {
        console.log('receiveAllMessage', data);
        setRoomMessages(data);
      });
    }

    const leaveRoomEvent = () => {
      socket.emit('leaveRoom', { roomId: currentRoom._id });
      socket.once('leftRoom', (data) => {
        console.log('left room', data);
      });
    };

    return () => {
      if (socket && currentRoom) {
        leaveRoomEvent();
      }
    };
  }, [currentRoom]);

  const handleSendTextMessage = () => {
    const sendMessageData = {
      userId: user._id,
      roomId: currentRoom._id,
      content: inputMessage,
      messageType: MessageType.TEXT,
    };

    if (socket) {
      socket.emit('send', sendMessageData);
      setInputMessage('');
      setShowEmojis(false);
    }
  };

  const handleUploadImage = async (fileData) => {
    const formData = new FormData();
    formData.append('file', fileData.file);
    try {
      const imageData = await userApi.uploadFile(formData);
      const sendMessageData = {
        userId: user._id,
        roomId: currentRoom._id,
        content: imageData.url,
        messageType: MessageType.IMAGE,
      };
      if (socket) {
        socket.emit('send', sendMessageData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadVideo = async (fileData) => {
    const formData = new FormData();
    formData.append('file', fileData.file);
    try {
      const videoData = await userApi.uploadFile(formData);
      const sendMessageData = {
        userId: user._id,
        roomId: currentRoom._id,
        content: videoData.url,
        messageType: MessageType.VIDEO,
      };
      if (socket) {
        socket.emit('send', sendMessageData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkFileIsImage = {
    beforeUpload: (file) => {
      if (!file['type'].includes('image')) {
        message.error(`${file.name} không phải là tệp hình ảnh`);
        return false;
      }
      return true;
    },
  };

  const checkFileIsVideo = {
    beforeUpload: (file) => {
      if (!file['type'].includes('video')) {
        message.error(`${file.name} không phải là tệp video`);
        return false;
      }
      return true;
    },
  };
  return (
    <>
      {currentRoom ? (
        <Row className="chat-window-container">
          <Col lg={activeToolbar ? 17 : 24} sm={activeToolbar ? 15 : 24}>
            <div className="chat-window">
              <Row className="chat-header" align="middle">
                <Col flex="70px">
                  <Row justify="center">
                    <Avatar
                      style={{ margin: '0px 0px 0px 8px' }}
                      size={50}
                      icon={<Image preview={false} src={currentRoom.avatarUrl} />}
                    />
                  </Row>
                </Col>
                <Col className="title" flex="1 1 0%">
                  <Typography.Title style={{ margin: '0px 5px' }} level={4}>
                    {currentRoom.title}
                  </Typography.Title>
                </Col>
                <Col flex="initial">
                  <Row justify="end" style={{ paddingRight: '10px' }}>
                    <AiOutlineSearch className="btn search" size={35} color="#394E60" />
                    <AiOutlineUserAdd className="btn add-member" size={35} color="#394E60" />
                    <AiOutlineInfoCircle
                      className="btn info"
                      size={35}
                      color="#394E60"
                      onClick={() => handleActiveToolbar()}
                    />
                  </Row>
                </Col>
              </Row>
              <div className="chat-box">
                <SimpleBar style={{ maxHeight: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>
                    {roomMessages.map((roomMessage) => (
                      <Message key={roomMessage._id} message={roomMessage} />
                    ))}
                  </div>
                  <div ref={chatBoxScrollRef} />
                </SimpleBar>
              </div>
              <Row className="chat-menu" align="middle">
                <Tooltip title="Gửi Hình Ảnh">
                  <Upload
                    {...checkFileIsImage}
                    previewFile={false}
                    multiple
                    customRequest={handleUploadImage}
                    progress={false}
                  >
                    <Button id="btn-send-image" icon={<FaRegFileImage size={23} />} />
                  </Upload>
                </Tooltip>
                <Tooltip title="Gửi Video">
                  <Upload
                    {...checkFileIsVideo}
                    previewFile={false}
                    multiple
                    customRequest={handleUploadVideo}
                    progress={false}
                    previewFile={false}
                  >
                    <Button id="btn-send-image" icon={<FaRegFileVideo size={23} />} />
                  </Upload>
                </Tooltip>
                <Tooltip title="Gửi Tệp Tin">
                  <Upload>
                    <Button id="btn-send-file" icon={<ImAttachment size={23} />} />
                  </Upload>
                </Tooltip>
              </Row>
              <Row align="middle" className="chat-input">
                {showEmojis && (
                  <div>
                    <Picker
                      native={true}
                      style={{ width: '250px' }}
                      showSkinTones={false}
                      emojiTooltip={false}
                      onSelect={addEmoji}
                    />
                  </div>
                )}
                <Col style={{ paddingRight: '8px' }} flex="auto">
                  <Input
                    autoComplete="off"
                    value={inputMessage}
                    ref={inputRef}
                    onPressEnter={() => handleSendTextMessage()}
                    onChange={(e) => setInputMessage(e.target.value)}
                    bordered={false}
                    id="input-chat"
                    suffix={
                      <FaRegSmile color="#394e60" size={25} onClick={handleShowEmojiPicker} />
                    }
                    placeholder="Aa"
                  />
                </Col>
                <Col flex="initial">
                  <Button
                    id="btn-send-message"
                    type="primary"
                    shape="circle"
                    icon={<RiSendPlaneFill style={{ margin: '4px 4px 0px 0px' }} size={30} />}
                  />
                </Col>
              </Row>
            </div>
          </Col>
          {activeToolbar && (
            <Col className="toolbar-container" lg={7} sm={8}>
              <SimpleBar style={{ maxHeight: '100vh' }}>
                <RoomToolbar />
              </SimpleBar>
            </Col>
          )}
        </Row>
      ) : (
        <Row style={{ height: '40vh' }} justify="center" align="middle">
          <Alert
            message="Chọn Phòng Chat"
            description="Mời bạn chọn Phòng Chat ở thanh bên trái để bắt đầu Chat"
            type="info"
            showIcon
          />
        </Row>
      )}
    </>
  );
}

export default ChatWindow;
