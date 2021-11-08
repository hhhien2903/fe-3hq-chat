import { Avatar, Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { useContext, useState } from 'react';
import { AiOutlineSearch, AiOutlineUsergroupAdd } from 'react-icons/ai';
import roomApi from '../../api/roomApi';
import userApi from '../../api/userApi';
import { AppContext } from '../../contexts/AppProvider';
import { AuthContext } from '../../contexts/AuthProvider';
import './TopLeftBar.scss';
const TopLeftBar = () => {
  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] = useState(false);
  const [formCreateRoom] = Form.useForm();
  const [friendList, setFriendList] = useState([]);
  const { user } = useContext(AuthContext);
  const { setRooms } = useContext(AppContext);

  const handleCreateRoom = () => {
    formCreateRoom
      .validateFields()
      .then(async (formValues) => {
        try {
          message.loading({ content: 'Xin đợi giây lát...', duration: 0 });
          const { selectedFriends, roomTitle } = formValues;
          const data = {
            title: roomTitle,
            creatorId: user._id,
            members: [user._id, ...selectedFriends],
          };
          const createdRoom = await roomApi.createRoom(data);
          const roomData = await roomApi.getRoomById(createdRoom._id);
          console.log(roomData);

          setRooms((prev) => [...prev, roomData]);
          setIsCreateRoomModalVisible(false);
          formCreateRoom.resetFields();
          message.destroy();
          message.success({ content: 'Tạo phòng thành công!', duration: 3 });
        } catch (error) {
          message.destroy();
          message.error({
            content: 'Tạo phòng không thành công, bạn vui lòng thử lại sau!',
            duration: 5,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

  return (
    <>
      <Row wrap={false} align="middle" className="top-left-container">
        <Col flex={1}>
          <Row className="search-bar" justify="center">
            <Input
              className="input-search"
              allowClear
              placeholder="Tìm kiếm"
              prefix={<AiOutlineSearch size={20} />}
            />
          </Row>
        </Col>
        <Col flex="initial">
          <Row>
            {/* <AiOutlineUserAdd className="btn add-friend" size={33} color="#394E60" /> */}
            <AiOutlineUsergroupAdd
              onClick={() => {
                setIsCreateRoomModalVisible(true);
                getFriendList();
              }}
              className="btn create-group"
              size={35}
              color="#394E60"
            />
            <Modal
              className="modal-create-room"
              title="Tạo Cuộc Trò Chuyện"
              visible={isCreateRoomModalVisible}
              onCancel={() => {
                formCreateRoom.resetFields();
                setIsCreateRoomModalVisible(false);
              }}
              footer={[
                <Button
                  key="cancel"
                  onClick={() => {
                    formCreateRoom.resetFields();
                    setIsCreateRoomModalVisible(false);
                  }}
                >
                  Huỷ
                </Button>,
                <Button key="submit" type="primary" onClick={handleCreateRoom} htmlType="submit">
                  Xác Nhận
                </Button>,
              ]}
            >
              <Form form={formCreateRoom} layout="vertical">
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
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Hãy chọn ít nhất hai người bạn',
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
                    notFoundContent="Không tìm thấy"
                    mode="multiple"
                    style={{ height: '50px' }}
                  >
                    {friendList.map((friend) => (
                      <Select.Option key={friend.contact} value={friend._id}>
                        <Avatar size={28} src={friend.avatar} style={{ marginRight: '5px' }} />
                        {`${friend.fullName}`}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
            </Modal>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default TopLeftBar;
