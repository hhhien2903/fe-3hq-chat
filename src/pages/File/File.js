import { Row, Col } from 'antd';
import FileWindow from '../../components/FileWindow/FileWindow';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
const File = () => {
  return (
    <Row style={{ height: '100vh' }} className="contact">
      <Col className="sidebar" sm={2} lg={1}>
        <LeftSidebar />
      </Col>
      <Col className="contact-list-container" sm={22} lg={23}>
        <FileWindow />
      </Col>
    </Row>
  );
};
export default File;
