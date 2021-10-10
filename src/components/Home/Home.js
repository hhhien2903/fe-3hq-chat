import { Button, Col, Row } from 'antd';
import './Home.scss';
import Sidebar from '../Sidebar/Sidebar';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
const Home = () => {
  const { user } = useContext(AuthContext);
  const handleInfo = async () => {
    console.log('loz', user);
  };

  return (
    <Row className="home">
      <Col className="sidebar" span={1}>
        <Sidebar />
      </Col>
      <Col className="home-body" span={23}>
        <Row style={{ height: '100vh' }} justify="center" align="middle">
          <h1>Chào mừng đến với 3HQ - Chat </h1>
          <Button onClick={handleInfo} style={{ width: '50%' }} type="primary">
            Check user login
          </Button>

          <Button style={{ width: '50%' }} type="primary">
            Get new token
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
