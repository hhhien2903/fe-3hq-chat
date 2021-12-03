import { Button, Modal, Form, Typography, Avatar, Input, notification, Row } from 'antd';
import { useContext, useState } from 'react';
import userApi from '../../api/userApi';
import { AppContext } from '../../contexts/AppProvider';
import { AuthContext } from '../../contexts/AuthProvider';
import { StopOutlined } from '@ant-design/icons';

export default function ModalAddFriend() {
  const { user } = useContext(AuthContext);
  const [valueSearch, setValueSearch] = useState();
  const { isAddFriendModalVisible, setIsAddFriendModalVisible, friends } = useContext(AppContext);
  const [check, setCheck] = useState();
  const [formAddFriend] = Form.useForm();
  const regex = new RegExp(/(^(84|0)[3|5|7|8|9])+([0-9]{8})\b/);

  const handleSearchFriend = async () => {
    const { value } = formAddFriend.getFieldsValue(true);
    try {
      if (regex.test(value)) {
        if (value.substring(0, 2) === '84') {
          const phoneNumber = value.replace('84', '+84');
          const valueSearch = await userApi.getSearhFriend(phoneNumber);
          setValueSearch(valueSearch);
          const checkFriend = friends.map((fr) => fr._id);
          console.log(checkFriend);
          const receiverId = valueSearch._id;
          if (checkFriend.includes(receiverId)) {
            setCheck(true);
          } else {
            setCheck(false);
          }
        } else {
          const phoneNumber = value.replace(value.substring(0, 1), '+84');
          const valueSearch = await userApi.getSearhFriend(phoneNumber);
          setValueSearch(valueSearch);
          const checkFriend = friends.map((fr) => fr._id);
          console.log(checkFriend);
          const receiverId = valueSearch._id;
          if (checkFriend.includes(receiverId)) {
            setCheck(true);
          } else {
            setCheck(false);
          }
        }
      } else {
        const valueSearch = await userApi.getSearhFriend(value);
        setValueSearch(valueSearch);
        const checkFriend = friends.map((fr) => fr._id);
        console.log(checkFriend);
        const receiverId = valueSearch._id;
        if (checkFriend.includes(receiverId)) {
          setCheck(true);
        } else {
          setCheck(false);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.status === 404 || error) {
        notification.open({
          message: 'Thông báo',
          description: 'Không tìm thấy',
          duration: 2,
        });
      }
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
        duration: 2,
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
          <Input placeholder="Nhập SĐT hoặc Gmail" allowClear />
        </Form.Item>
        {!valueSearch ? (
          <Row justify="center">
            <StopOutlined style={{ fontSize: '70px', color: 'red' }} />
          </Row>
        ) : (
          <>
            <Form.Item name="value" label="Kết quả tìm kiếm">
              <>
                <Avatar src={valueSearch.avatar} />
                <Typography.Text style={{ fontSize: '17px', paddingLeft: '20px' }}>
                  {valueSearch.fullName}
                </Typography.Text>
                {check === false ? (
                  <Button
                    type="primary"
                    style={{ float: 'right', margin: 'auto 0px' }}
                    onClick={handleAddFriend}
                  >
                    Kết Bạn
                  </Button>
                ) : (
                  <Typography.Text
                    style={{
                      float: 'right',
                      border: '1px solid #efefef',
                      padding: '5px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      margin: 'auto 0px',
                    }}
                  >
                    Bạn bè
                  </Typography.Text>
                )}
              </>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
}
