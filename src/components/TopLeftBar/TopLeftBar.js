import { Row, Input, Col, Modal, Form, Button } from 'antd';
import React, { useState } from 'react';
import './TopLeftBar.scss';
import { AiOutlineSearch, AiOutlineUsergroupAdd, AiOutlineUserAdd } from 'react-icons/ai';
const TopLeftBar = () => {
  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] = useState(false);
  const [formCreateRoom] = Form.useForm();
  const showCreateRoomModal = () => {
    setIsCreateRoomModalVisible(true);
  };

  const handleCreateRoomConfirm = () => {
    const { roomTitle, roomcac } = formCreateRoom.getFieldsValue(true);
    console.log(roomTitle, roomcac);
    formCreateRoom.resetFields();
    setIsCreateRoomModalVisible(false);
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
        </Form>
      </Modal>
      <Row justify="end" align="middle" className="top-left-container">
        <Col sm={14} lg={18}>
          <Row className="search-bar" justify="center">
            <Input
              className="input-search"
              allowClear
              placeholder="Tìm kiếm"
              prefix={<AiOutlineSearch size={20} />}
            />
          </Row>
        </Col>
        <Col sm={10} lg={6}>
          <Row justify="end">
            <AiOutlineUserAdd className="btn add-friend" size={33} color="#394E60" />
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
