import { useContext, useState } from 'react';
import { Avatar, Button, Col, Row, Typography, Modal, Form, notification } from 'antd';
import { AuthContext } from '../../contexts/AuthProvider';
import userApi from '../../api/userApi';
const SuggetionFriendItem = (props) => {
  const { friendSuggestion } = props;
  const { user } = useContext(AuthContext);
  const [isModaVisible, setIsModalVisible] = useState(false);

  const handSendFriendRequest = async () => {
    const friendRequest = {
      senderId: user._id,
      receiverId: friendSuggestion._id,
    };
    const sendRequest = await userApi.postSendFriendRequest(friendRequest);
    if (sendRequest) {
      notification.open({
        message: 'Thông báo',
        description: 'Đã gửi lời mời kết bạn cho ' + friendSuggestion.fullName,
        duration: 2,
      });
    }
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleShowModal = () => {
    setIsModalVisible(true);
  };
  return (
    <>
      <>
        <Modal
          className="modal-contact"
          centered
          width={400}
          title="Gợi ý kết bạn"
          visible={isModaVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="cancel" onClick={handleCloseModal}>
              Huỷ
            </Button>,
            <Button type="primary" key="submit" onClick={handSendFriendRequest}>
              Kết bạn
            </Button>,
          ]}
        >
          <div className="modal-contact form-header">
            <div className="avatar-container-profile">
              <div className="upload-avatar">
                <Avatar size={93} src={friendSuggestion.avatar} />
              </div>
            </div>
            <div className="name-container-profile">
              <div className="input-edit-name">
                <Typography.Text style={{ fontSize: '30px' }}>
                  {friendSuggestion.fullName}
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
              <div className="info-friend"> {friendSuggestion.contact}</div>
            </Form.Item>
            <Form.Item
              style={{ marginRight: '20px', fontFamily: 'Helvetica' }}
              name="dateOFBirth"
              label={<p style={{ fontSize: '18px' }}>Ngày sinh:</p>}
            >
              <div className="info-friend">{friendSuggestion.dayOfBirth}</div>
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
                {friendSuggestion.gender === true ? 'Nam' : 'Nữ'}
              </p>
            </Form.Item>
          </Form>
        </Modal>
      </>
      <Col
        onClick={handleShowModal}
        style={{
          margin: '0px 20px',
          height: '250px',
          borderRadius: '4px',
          border: '1px solid #808080',
          background: 'white',
        }}
        span={5}
      >
        <Row justify="center" style={{ paddingTop: '5px' }}>
          <Avatar size={93} src={friendSuggestion.avatar} />
        </Row>
        <Row justify="center" style={{ padding: '5px', fontSize: '20px' }}>
          <Typography.Text>{friendSuggestion.fullName}</Typography.Text>
        </Row>
        <Row justify="center" style={{ padding: '5px' }}>
          <Typography.Text>1 bạn chung</Typography.Text>
        </Row>
        <Row justify="center">
          <Typography.Text>Gợi ý kết bạn</Typography.Text>
        </Row>
        <Row justify="center" style={{ padding: '5px' }}>
          <Button
            style={{ color: '#fff', borderColor: '#1890ff', background: '#1890ff' }}
            onClick={handSendFriendRequest}
          >
            Kết bạn
          </Button>
        </Row>
      </Col>
    </>
  );
};
export default SuggetionFriendItem;
