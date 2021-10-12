import { Col, Row } from 'antd';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
const Contact = () => {
  return (
    <Row style={{ height: '100vh' }} className="contact">
      <Col className="sidebar" span={1}>
        <LeftSidebar />
      </Col>
      <Col className="contact-list-container" span={8}>
        <h1>Contact List</h1>
      </Col>
      <Col className="chat-message-container" span={15}>
        <h1>Message list</h1>
      </Col>
    </Row>
  );
};

export default Contact;
