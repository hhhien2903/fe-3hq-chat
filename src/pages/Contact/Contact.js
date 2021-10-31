import { Col, Row } from 'antd';
import ContactList from '../../components/ContactList/ContactList';
import ContactWindow from '../../components/ContactWindow/ContactWindow';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import TopLeftBar from '../../components/TopLeftBar/TopLeftBar';
const Contact = () => {
  return (
    <Row style={{ height: '100vh' }} className="contact">
      <Col className="sidebar" span={1}>
        <LeftSidebar />
      </Col>
      <Col className="contact-list-container" span={8}>
        <TopLeftBar />
        <ContactList />
      </Col>
      <Col className="chat-message-container" span={15}>
        <ContactWindow />
      </Col>
    </Row>
  );
};

export default Contact;
