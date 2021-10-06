import { Button, Col, Row } from 'antd';
import './Home.scss';
import Sidebar from '../Sidebar/Sidebar';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { firebaseAuth } from '../../config/firebase';
const Home = () => {
  const { user } = useContext(AuthContext);
  const handleInfo = () => {
    console.log(user);
  };

  const handleNewToken = async () => {
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      console.log('new token', token);
    }
  };

  return (
    <Row className="home">
      <Col className="sidebar" span={1}>
        <Sidebar />
      </Col>
      <Col className="home-body" span={23}>
        <Row style={{ height: '100vh' }} justify="center" align="middle">
          <h1>Chào mừng đến với 3HQ - Chat </h1>
          <Button style={{ width: '50%' }} onClick={handleInfo} type="primary">
            Check user login
          </Button>

          <Button style={{ width: '50%' }} onClick={handleNewToken} type="primary">
            Get new token
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
