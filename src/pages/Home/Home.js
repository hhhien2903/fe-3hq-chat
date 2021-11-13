import { Carousel, Col, Row } from 'antd';
import { useContext, useEffect, useState } from 'react';
import OneSignal from 'react-onesignal';
import pushApi from '../../api/pushApi';
import imgWelcome2 from '../../assets/images/home2.jpg';
import imgWelcome3 from '../../assets/images/home3.jpg';
import imgWelcome4 from '../../assets/images/home4.jpg';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { firebase } from '../../config/firebase';
import { AppContext } from '../../contexts/AppProvider';
import { AuthContext } from '../../contexts/AuthProvider';
import './Home.scss';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(AppContext);
  const [initialized, setInitialized] = useState(false);
  const token = firebase.auth().currentUser?.getIdToken();
  console.log(token);
  console.log(user);
  const contentStyle = {
    height: '80vh',
    width: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  OneSignal.init({ appId: process.env.REACT_APP_ONESIGNAL_APP_ID }).then(() => {
    setInitialized(true);
    OneSignal.on('subscriptionChange', async (register) => {
      const clientId = await OneSignal.getUserId();
      const userInfo = { userId: user._id, clientId };
      try {
        await pushApi.userSubscribe(userInfo);
      } catch (error) {
        console.log(error);
      }
    });
  });

  useEffect(() => {
    console.log('hello');
    if (socket) {
      socket.emit('userLogin', { userId: user._id });
    }
  }, []);

  return (
    <Row style={{ height: '100vh' }} className="home">
      <Col className="sidebar" sm={2} lg={1}>
        <LeftSidebar />
      </Col>
      <Col className="home-container" sm={22} lg={23}>
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
