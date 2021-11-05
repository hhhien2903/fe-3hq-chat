import { Avatar, Col, Row, Typography, Empty, Button, Collapse } from 'antd';
import React, { useEffect, useState, useContext } from 'react';
import userApi from '../../api/userApi';
import FriendRequestItem from '../FriendRequestItem/FriendRequestItem';
import './ContactWindow.scss';
import { AppContext } from '../../contexts/AppProvider';
export default function ContactWindow() {
  const [idSender, setIdSender] = useState({});
  const [senders, setSender] = useState([]);
  const [listRequest, setListRequest] = useState([]);
  const { setIsAddFriendModalVisible } = useContext(AppContext);
  useEffect(() => {
    const getListFriendRequest = async () => {
      try {
        const listFriendRequest = await userApi.getListFriendRequest();
        listFriendRequest.map((result) => {
          const idSender = result.senderId;
          setIdSender(idSender);
        });
        console.log(listFriendRequest);
        setListRequest(listFriendRequest);
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
        setSender(sender);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(senders);
    getUserSender();
  }, [idSender]);

  const showAddFriendModal = () => {
    setIsAddFriendModalVisible(true);
  };
  return (
    <div className="contact-window">
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
      {listRequest.length === 0 ? (
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
        <div className="suggetion-box">
          <Collapse ghost defaultActiveKey={'1'}>
            <Collapse.Panel header={`Lời mời kết bạn (${listRequest.length})`} key="1">
              <Row gutter={[8, 16]}>
                <FriendRequestItem userRequest={senders} />
              </Row>
            </Collapse.Panel>
          </Collapse>
        </div>
      )}
    </div>
  );
}
