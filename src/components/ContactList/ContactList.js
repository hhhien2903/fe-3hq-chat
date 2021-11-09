import SimpleBar from 'simplebar-react';
import { UserAddOutlined } from '@ant-design/icons';
import { Typography, Avatar, Collapse, Modal, Button, Form, notification } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/AppProvider';
import ContactListItem from '../ContactListItem/ContactListItem';
import userApi from '../../api/userApi';
import './ContactList.scss';

export default function ContactList() {
  const { setIsAddFriendModalVisible, currentFriend, setCurrentFriend, getFriendList, friends } =
    useContext(AppContext);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  useEffect(() => {
    getFriendList();
  }, []);
  const showConfirmUnfriend = () => {
    const confirmUnfriend = Modal.confirm({
      title: 'Xác Nhận',
      content: 'Bạn có muốn hủy kết bạn với ' + currentFriend.fullName,
      okText: 'Hủy kết bạn',
      okType: 'danger',
      cancelText: 'Hủy',

      onCancel() {
        confirmUnfriend.destroy();
        console.log('1');
      },
      onOk() {
        console.log(currentFriend._id);
        patchUnfriend();
      },
    });
  };
  const patchUnfriend = async () => {
    try {
      const unfriend = await userApi.patchUnfriend(currentFriend._id);
      notification.open({
        message: 'Thông báo',
        description: 'Bạn đã hủy kết bạn với ' + currentFriend.fullName,
        duration: 3,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelected = (friend) => {
    setCurrentFriend(friend);
    setIsContactModalVisible(true);
  };
  const setFriendClassName = (index) => {
    if (friends[index]._id === currentFriend?._id) {
      return 'contact content active';
    } else {
      return 'contact content';
    }
  };
  const handleCloseModal = () => {
    setIsContactModalVisible(false);
  };
  const handleUnFriend = () => {
    showConfirmUnfriend();
  };
  const handleShowModalAddFriend = () => {
    setIsAddFriendModalVisible(true);
  };
  return (
    <SimpleBar style={{ height: '100vh', borderRight: '1px solid #dbdbdf' }}>
      <div className="add-friend" onClick={handleShowModalAddFriend}>
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
      {currentFriend ? (
        <>
          <>
            <Modal
              className="modal-contact"
              centered
              width={400}
              title="Bạn bè"
              visible={isContactModalVisible}
              onCancel={handleCloseModal}
              footer={[
                <Button key="cancel" onClick={handleCloseModal}>
                  Hủy
                </Button>,
                <Button
                  style={{ backgroundColor: 'red', color: 'white' }}
                  danger
                  key="submit"
                  onClick={handleUnFriend}
                >
                  Hủy kết bạn
                </Button>,
              ]}
            >
              <div className="modal-contact form-header">
                <div className="avatar-container-profile">
                  <div className="upload-avatar">
                    <Avatar size={93} src={currentFriend.avatar} />
                  </div>
                </div>
                <div className="name-container-profile">
                  <div className="input-edit-name">
                    <Typography.Text style={{ fontSize: '30px' }}>
                      {currentFriend.fullName}
                    </Typography.Text>
                  </div>
                </div>
              </div>
              <Form layout="vertical" style={{ gap: '10px' }}>
                <Form.Item
                  style={{ marginRight: '20px', fontFamily: 'Helvetica' }}
                  name="contact"
                  label={<p style={{ fontSize: '18px' }}>Thông tin đăng ký:</p>}
                >
                  <div className="info-friend"> {currentFriend.contact}</div>
                </Form.Item>
                <Form.Item
                  style={{ marginRight: '20px', fontFamily: 'Helvetica' }}
                  name="dateOFBirth"
                  label={<p style={{ fontSize: '18px' }}>Ngày sinh:</p>}
                >
                  <div className="info-friend">{currentFriend.dayOfBirth}</div>
                </Form.Item>
              </Form>
              <Form layout="horizontal">
                <Form.Item
                  style={{ marginRight: '20px', fontFamily: 'Helvetica' }}
                  name="dateOFBirth"
                  label={<p style={{ fontSize: '18px', margin: '0px auto' }}>Giới tính:</p>}
                >
                  <p
                    style={{
                      paddingLeft: '20px',
                      fontSize: '18px',
                      fontFamily: 'Helvetica',
                      margin: '0px auto',
                    }}
                  >
                    {currentFriend.gender === true ? 'Nam' : 'Nữ'}
                  </p>
                </Form.Item>
              </Form>
            </Modal>
          </>
          <div className="list-friend">
            <Collapse className="contact-list-collapse" ghost defaultActiveKey={'1'}>
              <Collapse.Panel header={`Bạn bè (${friends.length})`} key="1">
                <div className="contact-list scrollable">
                  {friends.map((friend, index) => {
                    return (
                      <ContactListItem
                        key={friend._id}
                        cName={setFriendClassName(index)}
                        handleSelected={handleSelected}
                        friend={friend}
                      />
                    );
                  })}
                </div>
              </Collapse.Panel>
            </Collapse>
          </div>
        </>
      ) : (
        <>
          <Collapse className="contact-list-collapse" ghost defaultActiveKey={'1'}>
            <Collapse.Panel header={`Bạn bè (${friends.length})`} key="1">
              <div className="contact-list scrollable">
                {friends.map((friend, index) => {
                  return (
                    <ContactListItem
                      key={friend._id}
                      cName={setFriendClassName(index)}
                      handleSelected={handleSelected}
                      friend={friend}
                    />
                  );
                })}
              </div>
            </Collapse.Panel>
          </Collapse>
        </>
      )}
    </SimpleBar>
  );
}
