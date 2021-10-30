import { Col, Row } from 'antd';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RoomList from '../../components/RoomList/RoomList';
import TopLeftBar from '../../components/TopLeftBar/TopLeftBar';
import './Chat.scss';
import { Helmet } from 'react-helmet';

const Chat = () => {
  return (
    <Row className="chat">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="3HQ Chat" />
        <meta name="keywords" id="keywords" content="3HQ, 3HQ Web Chat, 3HQ Chat Online" />
        <meta name="author" content="3HQ" />
        <title>Chat</title>
        <link rel="canonical" href="https://goosedev.me/chat" />
      </Helmet>
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
