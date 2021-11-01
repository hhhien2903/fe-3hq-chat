import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  notification,
  Radio,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import localeVN from 'antd/es/date-picker/locale/vi_VN';
import FormData from 'form-data';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import { GoSignOut } from 'react-icons/go';
import { IoChatbubbleEllipses, IoPeople } from 'react-icons/io5';
import { Link, useHistory } from 'react-router-dom';
import userApi from '../../api/userApi';
import { firebaseAuth } from '../../config/firebase';
import { AppContext } from '../../contexts/AppProvider';
import { AuthContext } from '../../contexts/AuthProvider';
import './LeftSidebar.scss';
import './ModalUserInfo.scss';

const { Title } = Typography;
function LeftSidebar() {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();
  const { setCurrentRoom, setRooms } = useContext(AppContext);
  const [editName, setEditName] = useState(user.fullName);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleUploadAvatar = async (fileData) => {
    const formData = new FormData();
    formData.append('avatar', fileData.file);
    try {
      console.log(user);
      const imageData = await userApi.uploadAvatar(formData);
      setUser(imageData);
    } catch (error) {
      console.log(error);
    }
  };
  const checkFileIsImage = {
    beforeUpload: (file) => {
      if (!file['type'].includes('image')) {
        message.error(`${file.name} Không phải là tệp hình ảnh`);
        return false;
      } else {
        notification.open({ message: 'Cập nhật ảnh đại diện thành công' });
      }
      return true;
    },
  };

  const [formUpdateUser] = Form.useForm();
  const handleUpdate = () => {
    formUpdateUser
      .validateFields()
      .then(async (formValue) => {
        const { gender, dateOfBirth } = formValue;
        const data = {
          fullName: editName,
          dayOfBirth: dateOfBirth.format('DD/MM/YYYY'),
          gender: gender,
        };
        try {
          const res = await userApi.updateUser(data);
          notification.open({
            message: 'Thông báo!',
            description: 'Cập nhật thông tin thành công',
            duration: 5,
          });
          setUser(res);
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

  const showConfirmLogoutModal = () => {
    const confirmLogoutModal = Modal.confirm({
      title: 'Xác Nhận',
      content: 'Bạn có muốn đăng xuất khỏi 3HQ - Chat?',
      okText: 'Đăng xuất',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        firebaseAuth.signOut();
        setCurrentRoom(null);
        setRooms([]);
        history.push('/login');
      },
      onCancel() {
        confirmLogoutModal.destroy();
      },
    });
  };
  return (
    <>
      <ul className="sidebar-container">
        <li className="sidebar-item avatar">
          <span href="#" className="sidebar-link">
            <Avatar size={48} src={`${user.avatar}`} onClick={showModal} />
          </span>
        </li>
        <li className="sidebar-item">
          <Link to="/chat">
            <span className="sidebar-link">
              <IoChatbubbleEllipses size={30} color="#FFFFFF" />
            </span>
          </Link>
        </li>

        <li className="sidebar-item">
          <Link to="/contact">
            <span className="sidebar-link">
              <IoPeople size={30} width="30px" color="#FFFFFF" />
            </span>
          </Link>
        </li>
        <li onClick={showConfirmLogoutModal} className="sidebar-item setting">
          <span className="sidebar-link">
            <GoSignOut size={30} color="#FFFFFF" />
          </span>
        </li>
      </ul>
      {/* <ModalUserInfo isVisible={isModalVisible}/> */}
      <div className="modal-user">
        <Modal
          className="modal"
          title="Cập nhật thông tin"
          centered
          visible={isModalVisible}
          width={400}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button
              key="cancel"
              style={{ fontWeight: 'bold', fontFamily: 'Helvetica' }}
              onClick={() => setIsModalVisible(false)}
            >
              Huỷ
            </Button>,
            <Button
              key="submit"
              type="primary"
              style={{ fontWeight: 'bold', fontFamily: 'Helvetica' }}
              //  onClick={() => setIsModalVisible(false)}
              onClick={handleUpdate}
            >
              Cập nhật
            </Button>,
          ]}
        >
          <div className="form-header">
            <div className="avatar-container-profile">
              <div className="upload-avatar">
                <Avatar
                  size={93}
                  src={user.avatar}
                  // icon={<Image src={user.avatar} /*preview = {true }*//>}
                />
              </div>
              <div className="btn-upload-vatar">
                <Tooltip title="Tải ảnh lên">
                  <Upload
                    {...checkFileIsImage}
                    previewFile={false}
                    customRequest={handleUploadAvatar}
                    progress={false}
                  >
                    {<BsFillCameraFill />}
                  </Upload>
                </Tooltip>
              </div>
            </div>
            <div className="name-container-profile">
              <div className="input-edit-name">
                <Title
                  style={{ marginLeft: '10px' }}
                  level={5}
                  editable={{
                    onChange: setEditName,
                    tooltip: 'Cập nhật tên',
                  }}
                >
                  {editName}
                </Title>
              </div>
            </div>
          </div>
          <Form
            form={formUpdateUser}
            layout="vertical"
            style={{ gap: '10px' }}
            initialValues={{
              contact: user.contact,
              dateOfBirth: moment(user.dayOfBirth, 'DD/MM/YYYY'),
              gender: user.gender,
            }}
          >
            <Form.Item
              name="contact"
              label="Thông tin đăng ký"
              style={{ marginRight: '20px', fontFamily: 'Helvetica' }}
            >
              <Input
                disabled
                style={{
                  backgroundColor: '#DCDCDC',
                  borderRadius: '5px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                }}
              />
            </Form.Item>
            <Form.Item
              style={{ width: 330 }}
              name="dateOfBirth"
              label="Ngày Sinh"
              rules={[
                {
                  required: true,
                  message: 'Ngày sinh không được để trống!',
                },
              ]}
              // initialValue={ moment(user.dayOfBirth, 'DD/MM/YYYY')}
            >
              <DatePicker
                disabledDate={(current) => current > moment().subtract(16, 'year').endOf('year')}
                style={{
                  width: '100%',
                  fontFamily: 'Helvetica',
                  padding: '10px',
                  borderRadius: '10px',
                }}
                locale={localeVN}
                format={'DD/MM/YYYY'}
              />
            </Form.Item>
            <Form.Item label="Giới tính" style={{ fontFamily: 'Helvetica' }} name="gender">
              <Radio.Group>
                <Radio value={true}>Nam</Radio>
                <Radio value={false}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default LeftSidebar;
