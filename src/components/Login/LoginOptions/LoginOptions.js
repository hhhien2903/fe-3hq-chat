import React from 'react';
import { Row, Button, Space } from 'antd';
import './LoginOptions.scss';
import { IoCall, IoLogoGoogle } from 'react-icons/io5';
import { firebaseAuth, providers } from '../../../config/firebase';
const LoginOptions = (props) => {
  const { setActiveComponent } = props;

  const handleGoogleLogin = () => {
    firebaseAuth.signInWithRedirect(providers.googleProvider);
  };

  return (
    <Row justify="center" align="middle" className="login-option">
      <Space direction="vertical">
        <Button
          type="primary"
          shape="round"
          icon={<IoCall style={{ verticalAlign: 'sub' }} size={20} color="#FFFFFF" />}
          id="login-phone"
          onClick={() => setActiveComponent('phone')}
        >
          <p>Đăng Nhập Với Số Điện Thoại</p>
        </Button>
        <Button
          type="primary"
          shape="round"
          icon={<IoLogoGoogle style={{ verticalAlign: 'sub' }} size={20} color="#FFFFFF" />}
          id="login-google"
          onClick={() => handleGoogleLogin()}
        >
          <p>Đăng Nhập Với Google</p>
        </Button>
      </Space>
    </Row>
  );
};

export default LoginOptions;
