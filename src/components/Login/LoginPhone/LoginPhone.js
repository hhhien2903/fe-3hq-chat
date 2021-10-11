import { Form, Input, Button, notification } from 'antd';
import './LoginPhone.scss';
import { firebaseAuth, firebase } from '../../../config/firebase';

const LoginPhone = () => {
  const [formLoginPhone] = Form.useForm();

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: function (response) {
        console.log('Captcha Resolved');
        this.handleReceiveOTP();
      },
    });
  };

  const handleReceiveOTP = () => {
    formLoginPhone
      .validateFields(['phoneNumber'])
      .then((value) => {
        let { phoneNumber } = value;
        if (phoneNumber.substring(0, 2) === '84') {
          phoneNumber = '+' + phoneNumber;
        } else {
          phoneNumber = '+84' + phoneNumber.substring(1, phoneNumber.length);
        }
        setUpRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        firebaseAuth
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            notification.open({
              key: 'sendedOtpNotify',
              message: 'Mã OTP đã được gửi!',
              description:
                'Một mã OTP đã được gửi đến số điện thoại của bạn, hãy nhập mã vào ô Mã Xác Nhận và tiến hành đăng nhập.',
              duration: 0,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitOTP = () => {
    formLoginPhone
      .validateFields(['otp'])
      .then((value) => {
        let { otp } = value;
        let optConfirm = window.confirmationResult;
        optConfirm.confirm(otp).catch((err) => {
          if (err.code === 'auth/user-disabled') {
            notification.open({
              key: 'errorLogin',
              message: 'Tài khoản của bạn đã bị khoá!',
              description:
                'Tài khoản của bạn đã bị khoá, hãy liên hệ với Dịch Vụ Chăm Sóc Khách Hàng để biết thêm chi tiết!',
              duration: 10,
            });
            return;
          }
          notification.open({
            key: 'incorrectOtp',
            message: 'Nhập sai mã OTP!',
            description: 'Bạn đã nhập sai mã OTP, hãy kiểm tra, và tiến hành đăng nhập lại.',
            duration: 10,
          });
        });
      })
      .catch((err) => {
        console.log(err);
        notification.open({
          key: 'notClickReceiveOTP',
          message: 'Vui lòng chọn nút Nhận Mã OTP!',
          description:
            'Bạn hãy chọn nút Nhận Mã OTP để hệ thống thực hiện gửi mã về số điện thoại của bạn!',
          duration: 10,
        });
      });
  };

  return (
    <Form
      form={formLoginPhone}
      style={{ padding: '0px 80px' }}
      layout="vertical"
      className="login-form-phone"
      size={'large'}
    >
      <Form.Item
        rules={[
          { required: true, message: 'Số điện thoại không được để trống' },
          {
            required: true,
            pattern: new RegExp(/(^(84|0)[3|5|7|8|9])+([0-9]{8})\b/),
            message: 'Số điện thoại không đúng định dạng',
          },
        ]}
        name="phoneNumber"
      >
        <Input
          style={{ width: '100%', borderRadius: '40px', border: '1px solid #0068ff' }}
          placeholder="Số Điện Thoại"
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: '10px' }}>
        <Form.Item
          name="otp"
          rules={[
            { required: true, message: 'Mã OTP không được để trống' },
            {
              required: true,
              pattern: new RegExp(/^[0-9]{1,6}$\b/),
              message: 'Mã OTP không đúng định dạng',
            },
          ]}
          style={{ display: 'inline-block', width: 'calc(65% - 8px)' }}
        >
          <Input
            style={{ borderRadius: '40px', border: '1px solid #0068ff' }}
            bordered
            placeholder="Mã Xác Nhận"
          />
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', width: 'calc(35%)', marginLeft: '8px' }}>
          <Button shape="round" onClick={handleReceiveOTP} block type="primary">
            Nhận mã OTP
          </Button>
        </Form.Item>
      </Form.Item>
      <div id="recaptcha-container"></div>
      <Form.Item>
        <Button shape="round" onClick={handleSubmitOTP} block type="primary" htmlType="submit">
          Đăng Nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPhone;
