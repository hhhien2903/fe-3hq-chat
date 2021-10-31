import { Avatar, Col, Row, Typography, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import userApi from '../../api/userApi';
import FriendRequestItem from '../FriendRequestItem/FriendRequestItem';
import './ContactWindow.scss';
export default function ContactWindow() {
  const [idSender, setIdSender] = useState({});
  const [senders, setSender] = useState([]);
  useEffect(() => {
    const getListFriendRequest = async () => {
      try {
        const listFriendRequest = await userApi.getListFriendRequest();
        listFriendRequest.map((result) => {
          const idSender = result.senderId;
          console.log(idSender);
          setIdSender(idSender);
        });
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
      <FriendRequestItem userRequest={senders} />
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
