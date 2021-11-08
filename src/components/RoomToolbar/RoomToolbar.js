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
} from 'antd';
import { useContext, useState } from 'react';
import { BiExit, BiImageAlt, BiPencil } from 'react-icons/bi';
import roomApi from '../../api/roomApi';
import { AppContext } from '../../contexts/AppProvider';
import GroupMemberItem from '../GroupMemberItem/GroupMemberItem';
import './RoomToolbar.scss';
import ImgCrop from 'antd-img-crop';
import userApi from '../../api/userApi';
import { AuthContext } from '../../contexts/AuthProvider';

const { Panel } = Collapse;
function RoomToolbar() {
  const { currentRoom, setCurrentRoom, getRoomsList } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [formUpdateRoomTitle] = Form.useForm();
  const [isUpdateRoomTitleModalVisible, setIsUpdateRoomModalVisible] = useState(false);
  const handleUpdateRoomTitle = () => {
    formUpdateRoomTitle
      .validateFields()
      .then(async (value) => {
        try {
          message.loading({ content: 'Xin đợi giây lát...', duration: 0 });
          const { roomTitle } = value;
          const data = {
            title: roomTitle,
          };
          const updatedRoom = await roomApi.updateRoom(currentRoom._id, data);
          const roomData = await roomApi.getRoomById(updatedRoom._id);
          setCurrentRoom(roomData);
          formUpdateRoomTitle.resetFields();
          setIsUpdateRoomModalVisible(false);
          message.destroy();
          message.success({ content: 'Cập nhật thành công!', duration: 5 });
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
      return true;
    },
  };

  const handleUploadRoomAvatar = async (fileData) => {
    try {
      message.loading({ content: 'Xin đợi giây lát...', duration: 0 });
      const formData = new FormData();
      formData.append('file', fileData.file);
      const imageData = await userApi.uploadFile(formData);
      const data = {
        ...currentRoom,
        avatarUrl: imageData.url,
      };
      const updatedRoom = await roomApi.updateRoom(currentRoom._id, data);
      const roomData = await roomApi.getRoomById(updatedRoom._id);

      setCurrentRoom(roomData);
      message.destroy();
      message.success({ content: 'Cập nhật thành công!', duration: 5 });
    } catch (error) {
      message.destroy();
      message.error({ content: 'Cập nhật không thành công!, vui lòng thử lại sau', duration: 5 });
      console.log(error);
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
          <Collapse className="toolbar-menu" ghost>
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
            <Panel header="Tệp Tin" key="3">
              <p>haha</p>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  );
}

export default RoomToolbar;
