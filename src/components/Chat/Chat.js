import { Col, Row } from 'antd';
import './Chat.scss';
import Sidebar from '../Sidebar/Sidebar';

const Chat = () => {
  return (
    <Row className="chat">
      <Col className="sidebar" span={1}>
        <Sidebar />
      </Col>
      <Col className="chat-conversation" span={8}>
        <h1>Conversation List</h1>
      </Col>
      <Col className="chat-message" span={15}>
        <h1>Message list</h1>
      </Col>
    </Row>
  );
};

export default Chat;
