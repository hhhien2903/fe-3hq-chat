import SimpleBar from 'simplebar-react';
import { UserAddOutlined } from '@ant-design/icons';
import { notification, Modal, Typography, Form, Button, Input, Avatar } from 'antd';
import { AuthContext } from '../../contexts/AuthProvider';
import './ContactList.scss';
import React, { useState, useContext } from 'react';
import userApi from '../../api/userApi';
export default function ContactList() {
  const [isAddFriendModalVisible, setIsAddFriendModalVisible] = useState(false);
  const [searchTemp, setSearchTemp] = useState();
  const [formAddFriend] = Form.useForm();
  const { user } = useContext(AuthContext);
  const showAddFriendModal = () => {
    setIsAddFriendModalVisible(true);
    formAddFriend.resetFields();
  };
  const handleAddFriendConfirm = async () => {
    const { valueSearch } = formAddFriend.getFieldsValue(true);
    try {
      const searchTemp = await userApi.getSearhFriend(valueSearch.toLowerCase());
      setSearchTemp(searchTemp);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendFriendRequest = async () => {
    const friendRequest = {
      senderId: user._id,
      receiverId: searchTemp._id,
    };
    // console.log(friendRequest);
    const sendFriendRequest = await userApi.postSendFriendRequest(friendRequest);
    // console.log(sendFriendRequest);
    if (sendFriendRequest) {
      notification.open({
        message: 'Thông báo',
        description: 'Đã gửi lời mời kết bạn cho ' + searchTemp.fullName,
        duration: 5,
      });
    }
  };
  return (
    <SimpleBar style={{ height: '100vh', borderRight: '1px solid #dbdbdf' }}>
      <Modal
        title="Thêm bạn"
        visible={isAddFriendModalVisible}
        onCancel={() => setIsAddFriendModalVisible(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              formAddFriend.resetFields();
              setIsAddFriendModalVisible(false);
              setSearchTemp();
            }}
          >
            Huỷ
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddFriendConfirm} htmlType="submit">
            Tìm kiếm
          </Button>,
        ]}
      >
        <Form form={formAddFriend} layout="vertical">
          <Form.Item name="valueSearch" label="Nhập SĐT hoặc gmail muốn tìm">
            <Input placeholder="Nhập SĐT hoặc gmail" />
          </Form.Item>

          <Form.Item name="resultSearch">
            {searchTemp ? (
              <>
                <Avatar src={searchTemp.avatar} />
                <Typography.Text style={{ fontSize: '17px', paddingLeft: '20px' }}>
                  {searchTemp.fullName}
                </Typography.Text>
                <Button style={{ float: 'right' }} onClick={handleSendFriendRequest}>
                  Kết Bạn
                </Button>
              </>
            ) : (
              <Typography.Text></Typography.Text>
            )}
          </Form.Item>
        </Form>
      </Modal>
      <div className="add-friend" onClick={showAddFriendModal}>
        <UserAddOutlined style={{ fontSize: '25px', color: '#0068ff' }} />
        <Typography.Text style={{ fontSize: '17px', cursor: 'pointer', paddingLeft: '15px' }}>
          Thêm bạn bè bằng SĐT hoặc Gmail
        </Typography.Text>
      </div>
      <div className="friend-request">
        <Avatar
          size={54}
          src={'https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png'}
        />
        <Typography.Text style={{ fontSize: '17px', paddingLeft: '15px' }}>
          Danh sách yêu cầu kết bạn
        </Typography.Text>
      </div>
    </SimpleBar>
  );
}
