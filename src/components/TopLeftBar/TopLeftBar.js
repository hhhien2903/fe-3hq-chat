import { Button, Col, Form, Input, Modal, Row, Select, Spin } from 'antd';
import React, { useContext, useState } from 'react';
import { AiOutlineSearch, AiOutlineUsergroupAdd } from 'react-icons/ai';
import './TopLeftBar.scss';
import debounce from 'lodash/debounce';
import { AuthContext } from '../../contexts/AuthProvider';
import userApi from '../../api/userApi';
const TopLeftBar = () => {
  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] = useState(false);
  const [formCreateRoom] = Form.useForm();
  const [friendList, setFriendList] = React.useState([]);
  const { user } = useContext(AuthContext);
  const showCreateRoomModal = () => {
    setIsCreateRoomModalVisible(true);
    getFriendList();
  };

  const handleCreateRoomConfirm = () => {
    const { roomTitle, roomcac } = formCreateRoom.getFieldsValue(true);
    console.log(roomTitle, roomcac);
    formCreateRoom.resetFields();
    setIsCreateRoomModalVisible(false);
  };

  const getFriendList = async () => {
    try {
      const res = await userApi.getFriendList(user);
      console.log(res.friends);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title="Tạo Cuộc Trò Chuyện"
        visible={isCreateRoomModalVisible}
        onCancel={() => setIsCreateRoomModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsCreateRoomModalVisible(false)}>
            Huỷ
          </Button>,
          <Button key="submit" type="primary" onClick={handleCreateRoomConfirm} htmlType="submit">
            Xác Nhận
          </Button>,
        ]}
      >
        <Form form={formCreateRoom} layout="vertical">
          <Form.Item name="roomTitle" label="Tên cuộc trò chuyện">
            <Input placeholder="Tên cuộc trò chuyện" />
          </Form.Item>
          <Form.Item label="Thêm bạn bè vào cuộc trò chuyện">
            {/* <DebounceSelect
              mode="multiple"
              value={value}
              placeholder="Select users"
              fetchOptions={() => fetchUserList(user)}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              style={{
                width: '100%',
              }}
            /> */}
          </Form.Item>
        </Form>
      </Modal>
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
              onClick={showCreateRoomModal}
              className="btn create-group"
              size={35}
              color="#394E60"
            />
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default TopLeftBar;
