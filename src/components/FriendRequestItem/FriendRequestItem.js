import { Avatar, Button, Col, notification, Row, Space, Typography } from 'antd';
import React, { useContext } from 'react';
import userApi from '../../api/userApi';
import { AuthContext } from '../../contexts/AuthProvider';
import './FriendRequestItem.scss';
const FriendRequestItem = (props) => {
  const { userRequest } = props;
  const { user } = useContext(AuthContext);
  const handleAcceptFriend = async () => {
    const acceptFriend = {
      senderId: userRequest._id,
      receiverId: user._id,
    };
    const acceptFriendRequest = await userApi.postAcceptFriend(acceptFriend);
    notification.open({
      message: 'Thông báo',
      description: 'Bạn và ' + userRequest.fullName + ' đã là bạn bè. Hãy bắt đầu cuộc trò chuyện',
      duration: 3,
    });
  };
  const handleRejectFriend = async () => {
    const rejectFriend = {
      senderId: userRequest._id,
      receiverId: user._id,
    };
    const rejectfriendRequest = await userApi.postRejectFriend(rejectFriend);
    notification.open({
      message: 'Thông báo',
      description: 'Bạn đã từ chối ' + userRequest.fullName,
      duration: 3,
    });
  };
  return (
    <>
      <Col
        style={{
          margin: '0px 20px',
          height: '250px',
          borderRadius: '4px',
          border: '1px solid #e1e4ea',
          background: 'white',
        }}
        // span={5}
        xs={{ span: 4, offset: 1 }}
        lg={{ span: 5, offset: 2 }}
      >
        <Row justify="center" style={{ padding: '10px' }}>
          <Avatar size={100} src={userRequest.avatar} />
        </Row>
        <Row justify="center">
          <Typography.Text style={{ fontSize: '25px', padding: '15px' }}>
            {userRequest.fullName}
          </Typography.Text>
        </Row>
        <Row justify="center">
          <Space size="small">
            <Button type="primary" onClick={handleAcceptFriend}>
              Đồng ý
            </Button>
            <Button danger type="primary" onClick={handleRejectFriend}>
              Từ Chối
            </Button>
          </Space>
        </Row>
      </Col>
    </>
  );
};
export default FriendRequestItem;
