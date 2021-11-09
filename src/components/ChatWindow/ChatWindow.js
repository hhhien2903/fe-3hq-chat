import {
  Alert,
  Avatar,
  Button,
  Col,
  Image,
  Input,
  message,
  Row,
  Tooltip,
  Typography,
  Upload,
  Form,
  Select,
  Modal,
} from 'antd';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import FormData from 'form-data';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineInfoCircle, AiOutlineSearch, AiOutlineUserAdd } from 'react-icons/ai';
import { FaRegFileImage, FaRegFileVideo, FaRegSmile } from 'react-icons/fa';
import { ImAttachment } from 'react-icons/im';
import { RiSendPlaneFill } from 'react-icons/ri';
import SimpleBar from 'simplebar-react';
import userApi from '../../api/userApi';
import { AppContext } from '../../contexts/AppProvider';
import { AuthContext } from '../../contexts/AuthProvider';
import MessageType from '../../enums/messageType';
import removeAccents from '../../utils/removeAccents';
import Message from '../Message/Message';
import RoomToolbar from '../RoomToolbar/RoomToolbar';
import './ChatWindow.scss';
import roomApi from '../../api/roomApi';
function ChatWindow() {
  const { currentRoom, socket, setCurrentRoom } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [activeToolbar, setActiveToolbar] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [roomMessages, setRoomMessages] = useState([]);
  const inputRef = useRef();
  const chatBoxScrollRef = useRef();
  const [isAddFriendToRoomModalVisible, setIsAddFriendToRoomModalVisible] = useState(false);
  const [formAddFriendToRoom] = Form.useForm();
  const [friendList, setFriendList] = useState([]);
  const [messagePageIndex, setMessagePageIndex] = useState(0);
  const firstMessageRef = useRef();
  const scrollBar = useRef();

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
    if (socket && currentRoom) {
      socket.on('receive', (message) => {
        console.log('receive', message);
        setRoomMessages([...roomMessages, message]);
        chatBoxScrollRef.current?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
      });
    }
    return () => {
      socket?.off('receive');
    };
  }, [currentRoom, roomMessages]);

  useEffect(() => {
    if (socket && currentRoom) {
      socket.emit('joinRoom', { roomId: currentRoom._id, userId: user._id });
      socket.once('joinedRoom', (data) => {
        console.log('join room', data);
      });

      socket.once('receiveAllMessage', async (data) => {

        await setRoomMessages(data);
        // chatBoxScrollRef.current?.scrollToBottom();
        chatBoxScrollRef.current?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
        console.log('receiveAllMessage', data);
      });
    }

    const leaveRoomEvent = () => {
      if (socket && currentRoom) {
        socket.emit('leaveRoom', { roomId: currentRoom._id, userId: user._id });
        socket.once('leftRoom', (data) => {
          console.log('left room', data);
        });
        setMessagePageIndex(0);
        console.log(messagePageIndex);
      }
    };

    return () => {
      leaveRoomEvent();
    };
  }, [currentRoom]);

  const sendMessageToServer = (sendMessageData) => {
    if (socket) {
      socket.emit('send', sendMessageData);
      chatBoxScrollRef.current?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    }
  };

  const handleSendTextMessage = () => {
    const sendMessageData = {
      userId: user._id,
      roomId: currentRoom._id,
      content: inputMessage,
      messageType: MessageType.TEXT,
    };

    sendMessageToServer(sendMessageData);
    setInputMessage('');
    setShowEmojis(false);
  };

  const handleUploadImage = async (fileData) => {
    const formData = new FormData();
    formData.append('file', fileData.file);
    try {
      message.loading({ content: 'Xin đợi giây lát...', key: 'uploadImageKey', duration: 3 });
      const imageData = await userApi.uploadFile(formData);
      const sendMessageData = {
        userId: user._id,
        roomId: currentRoom._id,
        content: imageData.url,
        messageType: MessageType.IMAGE,
      };
      sendMessageToServer(sendMessageData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadVideo = async (fileData) => {
    const formData = new FormData();
    formData.append('file', fileData.file);
    try {
      message.loading({ content: 'Xin đợi giây lát...', key: 'uploadVideoKey', duration: 3 });
      const videoData = await userApi.uploadFile(formData);
      const sendMessageData = {
        userId: user._id,
        roomId: currentRoom._id,
        content: videoData.url,
        messageType: MessageType.VIDEO,
      };
      sendMessageToServer(sendMessageData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadFile = async (fileData) => {
    const fileTransform = new File([fileData.file], removeAccents(fileData.file.name), {
      type: fileData.file.type,
    });
    const formData = new FormData();
    formData.append('file', fileTransform);

    try {
      message.loading({ content: 'Xin đợi giây lát...', key: 'uploadVideoKey', duration: 3 });
      const file = await userApi.uploadFile(formData);
      const sendMessageData = {
        userId: user._id,
        roomId: currentRoom._id,
        content: file.url,
        messageType: MessageType.FILE,
        fileName: fileData.file.name,
      };
      sendMessageToServer(sendMessageData);
      console.log(file);
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
      if (!file['type'].includes('video') && !file['type'].includes('audio')) {
        message.error(`${file.name} không phải là tệp video/audio`);
        return false;
      }
      return true;
    },
  };

  const showAddFriendToRoomModal = () => {
    setIsAddFriendToRoomModalVisible(true);
    getFriendList();
  };

  const getFriendList = async () => {
    try {
      const res = await userApi.getFriendList(user);
      setFriendList(res.friends);
      console.log(res.friends);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFriendToRoomConfirm = () => {
    formAddFriendToRoom.validateFields().then(async (formValues) => {
      const { selectedFriends } = formValues;
      for (let friend of selectedFriends) {
        if (currentRoom.members.some((member) => member._id === friend)) {
          message.error({
            content:
              'Một/nhiều người bạn mà bạn chọn đã ở trong phòng, hãy xoá người đó và thử lại',
            duration: 5,
          });
          return;
        }
        const res = await roomApi.addMemberToRoom(currentRoom._id, friend);
        console.log(res);
      }

      message.loading({
        content: 'Xin chờ giây lát...',
        duration: 0,
      });
      setTimeout(() => {
        setIsAddFriendToRoomModalVisible(false);
        message.destroy();
        message.success({
          content: 'Thêm thành viên thành công',
          duration: 5,
        });
      }, 3000);
    });
  };

  const handleScroll = (e) => {
    let element = e.target;
    if (element?.scrollTop === 0) {
      const pageIndex = messagePageIndex + 1;
      setMessagePageIndex(pageIndex);
      socket.emit('loadOldMessage', {
        roomId: currentRoom._id,
        userId: user._id,
        pageIndex: pageIndex,
      });
      socket.once('receiveOlderMessage', (oldMessages) => {
        setRoomMessages([...oldMessages, ...roomMessages]);
        console.log('receiveOlderMessage', oldMessages);
        firstMessageRef.current?.scrollIntoView({ behavior: 'auto' });
      });
    }
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
                    {!currentRoom.avatarUrl ? (
                      currentRoom.members.length > 1 ? (
                        <Avatar.Group size={45} style={{ paddingLeft: '10px' }}>
                          <Avatar
                            style={{ marginTop: '12px' }}
                            src={currentRoom.members[0].avatar}
                          />
                          <Avatar
                            style={{ marginLeft: '-15px' }}
                            src={currentRoom.members[1].avatar}
                          />
                        </Avatar.Group>
                      ) : (
                        <Avatar
                          style={{ margin: '0px 0px 0px 8px' }}
                          size={50}
                          src={currentRoom.members[0].avatar}
                        />
                      )
                    ) : (
                      <Avatar
                        src={currentRoom.avatarUrl}
                        style={{ margin: '0px 0px 0px 8px' }}
                        size={50}
                      />
                    )}
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
                    {currentRoom?.isGroup && (
                      <AiOutlineUserAdd
                        onClick={() => {
                          formAddFriendToRoom.resetFields();
                          showAddFriendToRoomModal();
                        }}
                        className="btn add-member"
                        size={35}
                        color="#394E60"
                      />
                    )}
                    <Modal
                      className="modal-add-friend"
                      title="Thêm bạn bè vào cuộc trò chuyện"
                      visible={isAddFriendToRoomModalVisible}
                      onCancel={() => {
                        formAddFriendToRoom.resetFields();
                        setIsAddFriendToRoomModalVisible(false);
                      }}
                      footer={[
                        <Button
                          key="cancel"
                          onClick={() => {
                            formAddFriendToRoom.resetFields();
                            setIsAddFriendToRoomModalVisible(false);
                          }}
                        >
                          Huỷ
                        </Button>,
                        <Button
                          key="submit"
                          type="primary"
                          onClick={handleAddFriendToRoomConfirm}
                          htmlType="submit"
                        >
                          Xác Nhận
                        </Button>,
                      ]}
                    >
                      <Form form={formAddFriendToRoom} layout="vertical">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: 'Hãy chọn ít nhất một người bạn',
                              type: 'array',
                              min: 1,
                            },
                          ]}
                          name="selectedFriends"
                          label="Thêm bạn bè vào cuộc trò chuyện"
                        >
                          <Select
                            size="large"
                            showSearch
                            optionFilterProp="children"
                            placeholder="Chọn bạn bè..."
                            mode="multiple"
                            style={{ height: '50px' }}
                          >
                            {friendList.map((friend) => (
                              <Select.Option key={friend.contact} value={friend._id}>
                                <Avatar
                                  size={28}
                                  src={friend.avatar}
                                  style={{ marginRight: '5px' }}
                                />
                                {`${friend.fullName}`}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Form>
                    </Modal>
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
                <div
                  ref={scrollBar}
                  onScroll={handleScroll}
                  style={{ height: '100%', overflow: 'auto' }}
                >
                  {roomMessages.map((roomMessage, index, arr) =>
                    arr.length - 20 * messagePageIndex === index ? (
                      <Message ref={firstMessageRef} key={index} message={roomMessage} />
                    ) : (
                      <Message key={index} message={roomMessage} />
                    ),
                  )}
                  <div ref={chatBoxScrollRef} />
                </div>
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
                    multiple
                    customRequest={handleUploadVideo}
                    progress={false}
                    previewFile={false}
                  >
                    <Button id="btn-send-image" icon={<FaRegFileVideo size={23} />} />
                  </Upload>
                </Tooltip>
                <Tooltip title="Gửi Tệp Tin">
                  <Upload
                    previewFile={false}
                    multiple
                    customRequest={handleUploadFile}
                    progress={false}
                  >
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
                    onClick={handleSendTextMessage}
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
