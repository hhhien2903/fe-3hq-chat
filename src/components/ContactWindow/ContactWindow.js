import {
  Avatar,
  Col,
  Row,
  Typography,
  Form,
  Empty,
  Button,
  Modal,
  Input,
  notification,
} from 'antd';
import React, { useEffect, useState, useContext } from 'react';
import userApi from '../../api/userApi';
import FriendRequestItem from '../FriendRequestItem/FriendRequestItem';
import './ContactWindow.scss';
import { AuthContext } from '../../contexts/AuthProvider';
export default function ContactWindow() {
  const [idSender, setIdSender] = useState({});
  const [senders, setSender] = useState([]);
  const [listRequest, setListRequest] = useState([]);
  const [isAddFriendModalVisible, setIsAddFriendModalVisible] = useState(false);
  const [searchTemp, setSearchTemp] = useState();
  const { user } = useContext(AuthContext);
  const [formAddFriend] = Form.useForm();
  useEffect(() => {
    const getListFriendRequest = async () => {
      try {
        const listFriendRequest = await userApi.getListFriendRequest();
        listFriendRequest.map((result) => {
          const idSender = result.senderId;
          console.log(idSender);
          setIdSender(idSender);
        });
        setListRequest(listFriendRequest);
        console.log(listFriendRequest);
      } catch (error) {
        console.log(error);
      }
    };
    getListFriendRequest();
  }, []);

  useEffect(() => {
    const getUserSender = async () => {
      try {
        const sender = await userApi.getUserById(idSender);
        console.log(sender);
        setSender(sender);
      } catch (error) {
        console.log(error);
      }
    };
    getUserSender();
  }, [idSender]);
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
    const sendFriendRequest = await userApi.postSendFriendRequest(friendRequest);
    notification.open({
      message: 'Thông báo',
      description: 'Đã gửi lời mời kết bạn cho ' + searchTemp.fullName,
      duration: 5,
    });
  };
  return (
    <div className="contact-window">
      <>
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
      </>
      <Row className="header" align="middle">
        <Col flex="70px">
          <Row justify="center">
            <Avatar
              style={{ margin: '0 auto' }}
              size={50}
              src={'https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png'}
            />
          </Row>
        </Col>
        <Col className="title" flex="1 1 0%">
          <Typography.Text className="title" style={{ margin: '0px 5px', fontSize: '20px' }}>
            Danh sách yêu cầu kết bạn
          </Typography.Text>
        </Col>
      </Row>
      {listRequest.length == 0 ? (
        <div
          style={{
            height: '90%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Empty
            image="https://chat.zalo.me/assets/empty-LAN.a275c34eff9314b9c2eb206d1d000431.png"
            imageStyle={{
              height: 150,
            }}
            description={<span style={{ fontSize: '20px' }}>Bạn chưa có lời mời kết bạn nào</span>}
          >
            <Button
              onClick={showAddFriendModal}
              style={{
                color: '#fff',
                borderColor: '#1890ff',
                background: '#1890ff',
              }}
            >
              Thêm bạn
            </Button>
          </Empty>
        </div>
      ) : (
        <FriendRequestItem userRequest={senders} />
      )}

      {/* <Row gutter={[16, 16]}>
        <Col
          style={{
            height: '100px',
            width: '100px',
            background: '#efefef',
            border: '1px solid black',
          }}
          span={6}
        />
        <Col
          style={{
            height: '100px',
            width: '100px',
            background: '#efefef',
            border: '1px solid black',
          }}
          span={6}
        />
        <Col
          style={{
            height: '100px',
            width: '100px',
            background: '#efefef',
            border: '1px solid black',
          }}
          span={6}
        />
        <Col
          style={{
            height: '100px',
            width: '100px',
            background: '#efefef',
            border: '1px solid black',
          }}
          span={6}
        />
        <Col
          style={{
            height: '100px',
            width: '100px',
            background: '#efefef',
            border: '1px solid black',
          }}
          span={6}
        />
        <Col
          style={{
            height: '100px',
            width: '100px',
            background: '#efefef',
            border: '1px solid black',
          }}
          span={6}
        />
        <Col
          style={{
            height: '100px',
            width: '100px',
            background: '#efefef',
            border: '1px solid black',
          }}
          span={6}
        />
        <Col
          style={{
            height: '100px',
            width: '100px',
            background: '#efefef',
            border: '1px solid black',
          }}
          span={6}
        />
      </Row> */}
    </div>
  );
}
