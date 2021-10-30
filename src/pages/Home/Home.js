import { Col, Row, Carousel } from 'antd';
import './Home.scss';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import imgWelcome2 from '../../assets/images/home2.jpg';
import imgWelcome3 from '../../assets/images/home3.jpg';
import imgWelcome4 from '../../assets/images/home4.jpg';
import { AuthContext } from '../../contexts/AuthProvider';
import { AppContext } from '../../contexts/AppProvider';
import { useContext } from 'react';
import { firebase } from '../../config/firebase';
import { useEffect } from 'react';

const Home = () => {
  const { user } = useContext(AuthContext);

  const token = firebase.auth().currentUser.getIdToken();
  console.log(token);
  console.log(user);
  const contentStyle = {
    height: '80vh',
    width: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  return (
    <Row style={{ height: '100vh' }} className="home">
      <Col className="sidebar" sm={2} lg={1}>
        <LeftSidebar />
      </Col>
      <Col className="home-container" span={23}>
        <div className="home-content">
          <h1 className="title">Chào mừng đến với 3HQ - Chat</h1>
          <Carousel className="carousel" autoplay autoplaySpeed={3000}>
            <div>
              <img alt="" style={contentStyle} src={imgWelcome2} />
            </div>
            <div>
              <img alt="" style={contentStyle} src={imgWelcome3} />
            </div>
            <div>
              <img alt="" style={contentStyle} src={imgWelcome4} />
            </div>
          </Carousel>
        </div>
      </Col>
    </Row>
  );
};

export default Home;
