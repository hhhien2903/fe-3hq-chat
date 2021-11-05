import { Button, Modal, Form, Typography, Avatar, Input, notification } from 'antd';
import { useContext, useState } from 'react';
import userApi from '../../api/userApi';
import { AppContext } from '../../contexts/AppProvider';
import { AuthContext } from '../../contexts/AuthProvider';

export default function ModalAddFriend() {
  const { user } = useContext(AuthContext);
  const [valueSearch, setValueSearch] = useState();
  const { isAddFriendModalVisible, setIsAddFriendModalVisible } = useContext(AppContext);
  const [formAddFriend] = Form.useForm();
  const handleSearchFriend = async () => {
    const { value } = formAddFriend.getFieldsValue(true);
    console.log(value);
    try {
      const valueSearch = await userApi.getSearhFriend(value);
      setValueSearch(valueSearch);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddFriend = async () => {
    const friendRequest = {
      senderId: user._id,
      receiverId: valueSearch._id,
    };
    const sendRequest = await userApi.postSendFriendRequest(friendRequest);
    if (sendRequest) {
      notification.open({
        message: 'Thông báo',
        description: 'Đã gửi lời mời kết bạn cho ' + valueSearch.fullName,
        duration: 3,
      });
    }
  };
  const handleCloseModal = () => {
    setIsAddFriendModalVisible(false);
    formAddFriend.resetFields();
    setValueSearch();
  };
  return (
    <Modal
      title="Thêm bạn"
      visible={isAddFriendModalVisible}
      onCancel={handleCloseModal}
      footer={[
        <Button key="cancel" onClick={handleCloseModal}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSearchFriend} htmlType="submit">
          Tìm kiếm
        </Button>,
      ]}
    >
      <Form form={formAddFriend} layout="vertical">
        <Form.Item name="value" label="Nhập SĐT hoặc Gmail muốn tìm">
          <Input placeholder="Nhập SĐT hoặc gmail" />
        </Form.Item>

        <Form.Item name="value">
          {valueSearch ? (
            <>
              <Avatar src={valueSearch.avatar} />
              <Typography.Text style={{ fontSize: '17px', paddingLeft: '20px' }}>
                {valueSearch.fullName}
              </Typography.Text>
              <Button style={{ float: 'right' }} onClick={handleAddFriend}>
                Kết Bạn
              </Button>
            </>
          ) : (
            <Typography.Text></Typography.Text>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}
