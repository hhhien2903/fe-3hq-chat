import React from 'react';
import { Avatar, Button, Col, Row, Typography } from 'antd';
const SuggetionFriendItem = (props) => {
  const { friendSuggestion } = props;
  const handSendFriendRequest = () => {
    console.log('Đã gửi lời mời kết bạn');
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
