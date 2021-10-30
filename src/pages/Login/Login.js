import { useState } from 'react';
import { Col, Row, Image } from 'antd';
import background from '../../assets/images/backgound.jpg';
import './Login.scss';
import LoginOptions from '../../components/LoginOption/LoginOption';
import LoginPhone from '../../components/LoginPhone/LoginPhone';
import { IoArrowBack } from 'react-icons/io5';
import { Helmet } from 'react-helmet';

const Login = () => {
  const [activeComponent, setActiveComponent] = useState('default');

  return (
    <Row
      className="login"
      justify="center"
      align="middle"
      style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat' }}
    >
      <Col className="login-container" span={9}>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content="3HQ Chat Login" />
          <meta name="keywords" id="keywords" content="3HQ, 3HQ Web Chat, 3HQ Chat Online, 3HQ Chat Login" />
          <meta name="author" content="3HQ" />
          <title>Login</title>
          <link rel="canonical" href="https://goosedev.me/login" />
        </Helmet>
        <Row justify="center" className="login-content">
          {activeComponent !== 'default' && (
            <IoArrowBack
              size={30}
              className="login-btnBack"
              onClick={() => setActiveComponent('default')}
            />
          )}
          <Col className="login-header" span={24}>
            <Image id="logo" preview={false} width={80} height={80} src="/favicon.ico" />
            <p className="login-title">Đăng Nhập vào 3HQ - Chat</p>
          </Col>
          <Col className="login-body" span={24}>
            {activeComponent === 'default' && (
              <LoginOptions setActiveComponent={setActiveComponent} />
            )}
            {activeComponent === 'phone' && <LoginPhone />}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
