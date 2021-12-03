import {
  Avatar,
  Button,
  Col,
  Collapse,
  Image,
  Row,
  Typography,
  Form,
  Modal,
  Input,
  message,
  Upload,
  List,
} from 'antd';
import { useContext, useEffect, useState } from 'react';
import { BiExit, BiImageAlt, BiPencil } from 'react-icons/bi';
import roomApi from '../../api/roomApi';
import { AppContext } from '../../contexts/AppProvider';
import GroupMemberItem from '../GroupMemberItem/GroupMemberItem';
import { BsFileEarmarkFill } from 'react-icons/bs';
import './RoomToolbar.scss';
import ImgCrop from 'antd-img-crop';
import videoThumbnail from '../../assets/images/video_thumbnail.jpg';
import MessageType from '../../enums/messageType';
import { AuthContext } from '../../contexts/AuthProvider';
import ReactPlayer from 'react-player/lazy';

const { Panel } = Collapse;
function RoomToolbar() {
  const { currentRoom, socket } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [formUpdateRoomTitle] = Form.useForm();
  const [isUpdateRoomTitleModalVisible, setIsUpdateRoomModalVisible] = useState(false);
  const [imageVideoMessage, setImageVideoMessage] = useState([]);
  const [fileMessage, setFileMessage] = useState([]);
  const handleUpdateRoomTitle = () => {
    formUpdateRoomTitle
      .validateFields()
      .then(async (value) => {
        try {
          message.loading({
            content: 'Xin chờ giây lát...',
            duration: 0,
          });
          const { roomTitle } = value;
          const data = {
            title: roomTitle,
          };
          await roomApi.updateRoom(currentRoom._id, data);
          setIsUpdateRoomModalVisible(false);
          setTimeout(() => {
            message.destroy();
            message.success({ content: 'Cập nhật thành công!', duration: 5 });
          }, 3000);
        } catch (error) {
          message.destroy();
          message.error({
            content: 'Cập nhật không thành công, bạn vui lòng thử lại sau!',
            duration: 5,
          });
        }
      })
      .catch((err) => {
        message.destroy();
        message.error({
          content: 'Cập nhật không thành công!, vui lòng thử lại sau',
          duration: 5,
        });
        console.log(err);
      });
  };

  const checkFileIsImage = {
    beforeCrop: (file) => {
      if (!file['type'].includes('image')) {
        message.error(`${file.name} không phải là tệp hình ảnh`);
        return false;
      }
      if (file.size > process.env.REACT_APP_IMAGE_SIZE_LIMIT) {
        message.error(
          `Tệp tin vượt quá dung lượng cho phép. (${
            process.env.REACT_APP_IMAGE_SIZE_LIMIT / Math.pow(1024, 2)
          } MB)`,
        );
        return false;
      }
      return true;
    },
  };

  const handleUploadRoomAvatar = async (fileData) => {
    try {
      message.loading({
        content: 'Xin chờ giây lát...',
        duration: 0,
      });
      const formData = new FormData();
      formData.append('avatar', fileData.file);
      const res = await roomApi.updateRoomAvatar(currentRoom._id, formData);
      if (res) {
        setTimeout(() => {
          message.destroy();
          message.success({ content: 'Cập nhật thành công!', duration: 5 });
        }, 3000);
      }
    } catch (error) {
      message.destroy();
      message.error({ content: 'Cập nhật không thành công!, vui lòng thử lại sau', duration: 5 });
      console.log(error);
    }
  };

  const handleExitRoom = async () => {
    const confirmExitRoomModal = Modal.confirm({
      title: 'Xác Nhận',
      content: 'Bạn có muốn rời khỏi cuộc trò chuyện này?',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      onOk: async () => {
        try {
          const res = roomApi.leaveRoom(currentRoom._id);
          message.loading({
            content: 'Xin chờ giây lát...',
            duration: 0,
          });
          setTimeout(() => {
            message.destroy();
            message.success({
              content: 'Rời khỏi cuộc trò chuyện thành công',
              duration: 5,
            });
          }, 3000);
        } catch (error) {
          message.destroy();
          message.error({
            content: 'Rời khỏi cuộc trò chuyện thành công không thành công, xin thử lại sau!',
            duration: 5,
          });
        }
      },
      onCancel() {
        confirmExitRoomModal.destroy();
      },
    });
  };

  const handleChangeActivePanel = (keyPanel) => {
    if (keyPanel.includes('3')) {
      socket.emit('loadAllMessage', { roomId: currentRoom._id });
      socket.once('receiveAllMessages', (messages) => {
        const messageImageVideo = messages.filter(
          (message) =>
            message.messageType === MessageType.IMAGE || message.messageType === MessageType.VIDEO,
        );

        setImageVideoMessage(messageImageVideo);
      });
    }
    if (keyPanel.includes('4')) {
      socket.emit('loadAllMessage', { roomId: currentRoom._id });
      socket.once('receiveAllMessages', (messages) => {
        const messageFile = messages.filter((message) => {
          return message.messageType === MessageType.FILE;
        });

        setFileMessage(messageFile);
      });
    }
  };

  return (
    <>
      <Row className="toolbar">
        <Col span={24}>
          <div className="toolbar-room-info">
            {!currentRoom.avatarUrl ? (
              currentRoom.members.length > 1 ? (
                <Avatar.Group className="toolbar-icon" size={48}>
                  <Avatar style={{ marginTop: '15px' }} src={currentRoom.members[0].avatar} />
                  <Avatar style={{ marginLeft: '-18px' }} src={currentRoom.members[1].avatar} />
                </Avatar.Group>
              ) : (
                <Avatar
                  className="toolbar-icon"
                  size={63}
                  icon={<Image preview={false} src={currentRoom.members[0].avatar} />}
                />
              )
            ) : (
              <Avatar className="toolbar-icon" size={63} src={currentRoom.avatarUrl} />
            )}
            <Typography.Title level={4}>{currentRoom.title}</Typography.Title>
          </div>
        </Col>
        <Col span={24}>
          <Collapse onChange={handleChangeActivePanel} className="toolbar-menu" ghost>
            {currentRoom?.isGroup && (
              <>
                <Panel
                  className="toolbar-room-customize"
                  header="Tuỳ Chỉnh Cuộc Trò Chuyện"
                  key="1"
                >
                  {currentRoom.creatorId === user._id && (
                    <>
                      <Button
                        onClick={() => {
                          formUpdateRoomTitle.setFieldsValue({ roomTitle: currentRoom.title });
                          setIsUpdateRoomModalVisible(true);
                        }}
                        type="text"
                        size={'large'}
                        icon={<BiPencil size={18} style={{ verticalAlign: 'sub' }} />}
                      >
                        <p>Đổi tên cuộc trò chuyện</p>
                      </Button>
                      <Modal
                        className="model-update-room-title"
                        title="Đổi Tên Cuộc Trò Chuyện"
                        visible={isUpdateRoomTitleModalVisible}
                        onCancel={() => {
                          setIsUpdateRoomModalVisible(false);
                        }}
                        footer={[
                          <Button
                            key="cancel"
                            onClick={() => {
                              setIsUpdateRoomModalVisible(false);
                            }}
                          >
                            Huỷ
                          </Button>,
                          <Button
                            key="submit"
                            type="primary"
                            onClick={handleUpdateRoomTitle}
                            htmlType="submit"
                          >
                            Xác Nhận
                          </Button>,
                        ]}
                      >
                        <Form
                          initialValues={{ roomTitle: currentRoom.title }}
                          form={formUpdateRoomTitle}
                          layout="vertical"
                        >
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Tên cuộc trò chuyện không được để trống!',
                              },
                            ]}
                            name="roomTitle"
                            label="Tên cuộc trò chuyện"
                          >
                            <Input size="large" placeholder="Tên cuộc trò chuyện" />
                          </Form.Item>
                        </Form>
                      </Modal>

                      <ImgCrop
                        {...checkFileIsImage}
                        rotate
                        modalTitle="Chỉnh sửa ảnh"
                        modalOk="Xác Nhận"
                        modalCancel="Huỷ"
                      >
                        <Upload
                          customRequest={handleUploadRoomAvatar}
                          progress={false}
                          accept="image/*"
                          previewFile={false}
                        >
                          <Button
                            type="text"
                            size={'large'}
                            icon={<BiImageAlt size={18} style={{ verticalAlign: 'sub' }} />}
                          >
                            <p>Đổi hình đại diện cuộc trò chuyện</p>
                          </Button>
                        </Upload>
                      </ImgCrop>
                    </>
                  )}
                  <Button
                    type="text"
                    size={'large'}
                    onClick={handleExitRoom}
                    icon={<BiExit size={18} color="red" style={{ verticalAlign: 'sub' }} />}
                  >
                    <p style={{ color: 'red' }}>Rời khỏi cuộc trò chuyện</p>
                  </Button>
                </Panel>

                <Panel
                  className="toolbar-room-member"
                  header={`Thành Viên Nhóm (${currentRoom.members.length})`}
                  key="2"
                >
                  {currentRoom.members.map((member) => (
                    <GroupMemberItem key={member._id} member={member} />
                  ))}
                </Panel>
              </>
            )}
            <Panel header="Ảnh/Video" key="3">
              <List
                locale={{ emptyText: 'Không có dữ liệu' }}
                grid={{ gutter: 5, column: 3 }}
                dataSource={imageVideoMessage}
                renderItem={(item) => (
                  <List.Item
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}
                  >
                    {item.messageType === MessageType.IMAGE ? (
                      <Image
                        style={{ objectFit: 'cover', borderRadius: '10px' }}
                        width={95}
                        height={95}
                        src={item.content}
                      />
                    ) : (
                      <ReactPlayer
                        width={95}
                        height={95}
                        playing={false}
                        controls={true}
                        url={item.content}
                        light={videoThumbnail}
                      />
                    )}
                  </List.Item>
                )}
              />
            </Panel>
            <Panel header="Tệp Tin" key="4">
              <List
                locale={{ emptyText: 'Không có dữ liệu' }}
                grid={{ gutter: 5, column: 1 }}
                dataSource={fileMessage}
                renderItem={(item) => (
                  <List.Item style={{ marginBottom: '8px' }}>
                    <a href={item.content}>
                      <div className="messageFile" s>
                        <Avatar
                          className="file-icon"
                          style={{
                            backgroundColor: '#FFFFFF',
                          }}
                          size={35}
                          icon={<BsFileEarmarkFill color={'#000000'} />}
                        />
                        <p className="file-name">{item.fileName}</p>
                      </div>
                    </a>
                  </List.Item>
                )}
              />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  );
}

export default RoomToolbar;
