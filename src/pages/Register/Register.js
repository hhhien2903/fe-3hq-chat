import {
  Button,
  Col,
  DatePicker,
  Form,
  Image as AntImage,
  Input,
  notification,
  Row,
  Select,
} from 'antd';
import localeVN from 'antd/es/date-picker/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import userApi from '../../api/userApi';
import background from '../../assets/images/backgound.jpg';
import { firebaseAuth } from '../../config/firebase';
import { AuthContext } from '../../contexts/AuthProvider';
import './Register.scss';

const Register = () => {
  const history = useHistory();
  const { Option } = Select;
  const [formCreateUser] = Form.useForm();
  const { setUser } = useContext(AuthContext);
  const handleSubmit = () => {
    formCreateUser
      .validateFields()
      .then(async (value) => {
        const { fullName, gender, dateOfBirth } = value;
        const data = {
          fullName: fullName,
          dayOfBirth: dateOfBirth.format('DD/MM/YYYY'),
          gender: gender,
        };

        try {
          const res = await userApi.createUser(data);
          setUser(res);
          history.push('/');
        } catch (error) {
          notification.open({
            key: 'errorFetchApi',
            message: 'Hệ thống đang gặp một chút sự cố!',
            description:
              'Thành thật xin lỗi! Hệ thống hiện đang gặp một chút sự cố, bạn hãy quay lại sau nhé!',
            duration: 10,
          });
          console.log(error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Row
      className="register"
      justify="center"
      align="middle"
      style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat' }}
    >
      <Col className="register-container" span={9}>
        <Row justify="center" className="register-content">
          <Col className="register-header" span={24}>
            <AntImage id="logo" preview={false} width={80} height={80} src="/favicon.ico" />
            <p className="register-title">Đăng Ký Thông Tin Tài Khoản</p>
          </Col>
          <Col className="register-body" span={24}>
            <Form
              form={formCreateUser}
              style={{ padding: '0px 80px' }}
              className="login-form-phone"
              size={'large'}
              layout="vertical"
            >
              <Form.Item
                label="Họ Và Tên:"
                rules={[
                  { required: true, message: 'Họ và Tên không được để trống' },
                  {
                    required: true,
                    pattern: new RegExp(/^([^0-9]*)$\b/),
                    message: 'Họ và Tên không được chứa ký tự số',
                  },
                ]}
                name="fullName"
              >
                <Input style={{ width: '100%' }} placeholder="Họ Và Tên" />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Giới Tính:"
                rules={[
                  {
                    required: true,
                    message: 'Giới tính không được để trống!',
                  },
                ]}
              >
                <Select placeholder="Vui lòng chọn giới tính">
                  <Option value={true}>Nam</Option>
                  <Option value={false}>Nữ</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="dateOfBirth"
                label="Ngày Sinh:"
                rules={[
                  {
                    required: true,
                    message: 'Ngày sinh không được để trống!',
                  },
                ]}
              >
                <DatePicker
                  disabledDate={(current) => current > moment().subtract(16, 'year').endOf('year')}
                  defaultPickerValue={moment().subtract(16, 'year')}
                  placeholder="Vui lòng chọn ngày sinh"
                  style={{ width: '100%' }}
                  locale={localeVN}
                  format={'DD/MM/YYYY'}
                />
              </Form.Item>

              <Form.Item style={{ marginTop: '30px' }}>
                <Button onClick={handleSubmit} shape="round" block type="primary" htmlType="submit">
                  Xác Nhận
                </Button>
              </Form.Item>
              <Form.Item style={{ marginTop: '30px' }}>
                <Button
                  onClick={() => {
                    firebaseAuth.signOut();
                    history.push('/login');
                  }}
                  style={{ padding: '0px 80px' }}
                  shape="round"
                  block
                  type="default"
                >
                  Thoát
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Register;
