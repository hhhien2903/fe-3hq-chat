import { Col, Row } from 'antd';
import './Chat.scss';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
const Chat = () => {
  return (
    <Row style={{ height: '100vh' }} className="chat">
      <Col className="sidebar" span={1}>
        <LeftSidebar />
      </Col>
      <Col className="chat-list-container" span={8}>
        <h1>Conversation List</h1>
      </Col>
      <Col className="chat-message-container" span={15}>
        <h1>Message list</h1>
      </Col>
    </Row>
  );
};

export default Chat;
