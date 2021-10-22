import { Col, Row } from 'antd';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RoomList from '../../components/RoomList/RoomList';
import TopLeftBar from '../../components/TopLeftBar/TopLeftBar';
import './Chat.scss';
const Chat = () => {
  return (
    <Row className="chat">
      <Col className="sidebar" sm={2} lg={1}>
        <LeftSidebar />
      </Col>
      <Col className="room-container" sm={6} lg={5}>
        <TopLeftBar />
        <RoomList />
      </Col>
      <Col className="chat-container" sm={16} lg={18}>
        <ChatWindow />
      </Col>
    </Row>
  );
};

export default Chat;
