import { useState } from 'react';
import { Col, Row, Image } from 'antd';
import background from '../../assets/images/backgound.jpg';
import './Login.scss';
import LoginOptions from './LoginOptions/LoginOptions';
import LoginPhone from './LoginPhone/LoginPhone';
import { IoArrowBack } from 'react-icons/io5';
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
        <Row justify="center" className="login-content">
          {activeComponent !== 'default' && (
            <IoArrowBack
              size={30}
              className="login-btnBack"
              onClick={() => setActiveComponent('default')}
            />
          )}
          <Col className="login-header" span={24}>
            <Image id="login-logo" preview={false} width={80} height={80} src="/favicon.ico" />
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
