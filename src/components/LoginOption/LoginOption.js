import { Button, notification, Row, Space } from 'antd';
import { FcGoogle, FcPhone } from 'react-icons/fc';
import { firebaseAuth, providers } from '../../config/firebase';
import './LoginOption.scss';

const LoginOption = (props) => {
  const { setActiveComponent } = props;
  const handleGoogleLogin = () => {
    firebaseAuth.signInWithPopup(providers.googleProvider).catch((err) => {
      if (err.code === 'auth/user-disabled') {
        notification.open({
          key: 'errorLogin',
          message: 'Tài khoản của bạn đã bị khoá!',
          description:
            'Tài khoản của bạn đã bị khoá, hãy liên hệ với Dịch Vụ Chăm Sóc Khách Hàng để biết thêm chi tiết!',
          duration: 10,
        });
      }
    });
  };

  return (
    <Row justify="center" align="middle" className="login-option">
      <Space direction="vertical">
        <Button
          type="default"
          shape="round"
          className="btn-phone"
          icon={<FcPhone style={{ verticalAlign: 'sub', marginRight: '2.1875em' }} size={20} />}
          id="login-phone"
          onClick={() => setActiveComponent('phone')}
        >
          <p style={{ marginRight: ' 1.875em' }} className="login-phone">
            Đăng Nhập Với Số Điện Thoại
          </p>
        </Button>
        <Button
          type="default"
          className="btn-google"
          shape="round"
          icon={<FcGoogle style={{ verticalAlign: 'sub', marginRight: '2.1875em' }} size={20} />}
          id="login-google"
          onClick={() => handleGoogleLogin()}
        >
          <p style={{ marginRight: '5em' }} className="login-google">
            Đăng Nhập Với Google
          </p>
        </Button>
      </Space>
    </Row>
  );
};

export default LoginOption;
