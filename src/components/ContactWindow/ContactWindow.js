import { Avatar, Col, Row, Typography, Empty, Button, Collapse } from 'antd';
import React, { useEffect, useState, useContext } from 'react';
import userApi from '../../api/userApi';
import FriendRequestItem from '../FriendRequestItem/FriendRequestItem';
import './ContactWindow.scss';
import { AppContext } from '../../contexts/AppProvider';
import SuggestionFriendItem from '../SuggestionFriendItem/SuggestionFriendItem';
export default function ContactWindow() {
  const [sender, setSender] = useState([]);
  const {
    setIsAddFriendModalVisible,
    getListSuggestion,
    friendsSuggestion,
    getListFriendRequest,
    friendsRequest,
  } = useContext(AppContext);
  useEffect(() => {
    getListSuggestion();
  }, []);
  useEffect(() => {
    const getListFrienRequestInterval = setInterval(() => {
      getListFriendRequest();
    }, 10000);
    return () => {
      clearInterval(getListFrienRequestInterval);
    };
  }, []);
  const idUserRequest = friendsRequest.map((fr) => fr.senderId);
  useEffect(() => {
    const getUserSender = async () => {
      try {
        const listRequest = [];
        for (let i = 0; i < idUserRequest.length; i++) {
          listRequest.push(userApi.getUserById(idUserRequest[i]));
        }
        Promise.all(listRequest)
          .then((res) => {
            setSender(res);
          })
          .then(() => {
            // console.log(sender);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getUserSender();
  }, [sender]);
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
      {friendsRequest.length === 0 && friendsSuggestion.length === 0 ? (
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
        <>
          <div className="contact-box">
            <Collapse ghost defaultActiveKey={'1'}>
              <Collapse.Panel header={`Lời mời kết bạn (${sender.length})`} key="1">
                <Row gutter={[8, 16]}>
                  {sender.map((friendRequest) => {
                    return (
                      <FriendRequestItem key={friendRequest._id} userRequest={friendRequest} />
                    );
                  })}
                </Row>
              </Collapse.Panel>
            </Collapse>
          </div>
          <div className="suggestion-box ">
            <Collapse ghost defaultActiveKey={'1'}>
              <Collapse.Panel header={`Gợi ý kết bạn (${friendsSuggestion.length})`} key="1">
                <Row gutter={[8, 16]}>
                  {friendsSuggestion.map((friendSuggestion, index) => {
                    return (
                      <SuggestionFriendItem
                        key={friendSuggestion._id}
                        friendSuggestion={friendSuggestion}
                      />
                    );
                  })}
                </Row>
              </Collapse.Panel>
            </Collapse>
          </div>
        </>
      )}
    </div>
  );
}
