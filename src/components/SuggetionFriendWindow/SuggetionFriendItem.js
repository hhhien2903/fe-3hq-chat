import React from 'react';
import { Avatar, Button, Col, Row, Typography } from 'antd';
export default function SuggetionFriendItem() {
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
          <Avatar size={93} />
        </Row>
        <Row justify="center" style={{ padding: '5px', fontSize: '20px' }}>
          <Typography.Text>Nhat Hoang</Typography.Text>
        </Row>
        <Row justify="center" style={{ padding: '5px' }}>
          <Typography.Text>1 bạn chung</Typography.Text>
        </Row>
        <Row justify="center">
          <Typography.Text>Gợi ý kết bạn</Typography.Text>
        </Row>
        <Row justify="center" style={{ padding: '5px' }}>
          <Button style={{ color: '#fff', borderColor: '#1890ff', background: '#1890ff' }}>
            Kết bạn
          </Button>
        </Row>
      </Col>
    </>
  );
}
