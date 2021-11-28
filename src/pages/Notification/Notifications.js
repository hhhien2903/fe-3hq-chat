import { Row, Col } from 'antd';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import NotificationList from '../../components/NotificationList/NotificationList';
const Notifications = () => {
  return (
    <Row style={{ height: '100vh' }} className="contact">
      <Col className="sidebar" sm={2} lg={1}>
        <LeftSidebar />
      </Col>
      <Col className="contact-list-container" sm={11} lg={12}>
        <NotificationList />
      </Col>
    </Row>
  );
};
export default Notifications;
