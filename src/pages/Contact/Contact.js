import { Col, Row } from 'antd';
import ContactList from '../../components/ContactList/ContactList';
import ContactWindow from '../../components/ContactWindow/ContactWindow';
import ModalAddFriend from '../../components/ContactWindow/ModalAddFriend';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import SuggetionFriendWindow from '../../components/SuggetionFriendWindow/SuggetionFriendWindow';
import TopLeftBar from '../../components/TopLeftBar/TopLeftBar';
const Contact = () => {
  return (
    <Row style={{ height: '100vh' }} className="contact">
      <Col className="sidebar" sm={2} lg={1}>
        <LeftSidebar />
      </Col>
      <Col className="contact-list-container" sm={6} lg={5}>
        <TopLeftBar />
        <ContactList />
        <ModalAddFriend />
      </Col>
      <Col className="chat-message-container" sm={16} lg={18}>
        <ContactWindow />
      </Col>
    </Row>
  );
};

export default Contact;
