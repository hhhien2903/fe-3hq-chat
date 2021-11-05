import { Avatar, Button, Typography, notification, Row, Col } from 'antd';
import React, { useContext } from 'react';
import userApi from '../../api/userApi';
import { AuthContext } from '../../contexts/AuthProvider';

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
          border: '1px solid #808080',
          background: 'white',
        }}
        span={5}
      >
        <Row justify="center" style={{ paddingTop: '5px', margin: 'auto 0' }}>
          <Avatar size={93} src={userRequest.avatar} />
        </Row>
        <Row justify="center">
          <Typography.Text style={{ padding: '0 0 10px 0', fontSize: '20px' }}>
            {userRequest.fullName}
          </Typography.Text>
        </Row>
        <Row justify="center">
          <Button style={{ marginRight: '20px' }} onClick={handleAcceptFriend}>
            Đồng ý
          </Button>
          <Button onClick={handleRejectFriend}>Từ Chối</Button>
        </Row>
      </Col>
    </>
  );
};
export default FriendRequestItem;
