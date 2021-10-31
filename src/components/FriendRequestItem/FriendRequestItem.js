import { Avatar, Button, Typography } from 'antd';
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
  };
  const handleRejectFriend = async () => {
    const rejectFriend = {
      senderId: userRequest._id,
      receiverId: user._id,
    };
    const rejectfriendRequest = await userApi.postRejectFriend(rejectFriend);
  };
  return (
    <>
      <div className="friend-requests">
        <div style={{ textAlign: 'center' }}>
          <Avatar size={70} src={userRequest.avatar} />
          <Typography.Text>{userRequest.fullName}</Typography.Text>
          <Button onClick={handleAcceptFriend}>Đồng ý</Button>
          <Button onClick={handleRejectFriend}>Từ Chối</Button>
        </div>
      </div>
    </>
  );
};
export default FriendRequestItem;
