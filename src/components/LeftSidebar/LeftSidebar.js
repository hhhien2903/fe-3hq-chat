import { Avatar, Image, message, notification ,DatePicker} from 'antd';
import './LeftSidebar.scss';
import { IoChatbubbleEllipses, IoPeople } from 'react-icons/io5';
import { GoSignOut } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

import moment from 'moment';
import localeVN from 'antd/es/date-picker/locale/vi_VN';

import { useState } from 'react';
import React from 'react';
import { Modal, Form, Input, Radio, Select, Button, Upload, Tooltip, Typography } from 'antd';
import {
  EditOutlined,
  PlusCircleOutlined,
  CameraOutlined,
  HighlightOutlined,
} from '@ant-design/icons';
import './ModalUserInfo.scss';
import { BsFillCameraFill, FcApproval } from 'react-icons/bs';
import FormData from 'form-data';
import { AppContext } from '../../contexts/AppProvider';
import userApi from '../../api/userApi';
const { Option } = Select;
const { Title } = Typography;
function LeftSidebar() {
  const { currentRoom } = useContext(AppContext);
  const { user, setUser } = useContext(AuthContext);

  const [editName, setEditName] = useState(user.fullName);

  const [editableStr, setEditableStr] = useState('This is an editable text.');

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
  console.log(user);
 
  const [formUpdateUser] = Form.useForm();
  const handleUpdate= () => {
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
          const  res = await userApi.updateUser(data);
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
    console.log(editName);
  };

  console.log(moment(user.dayOfBirth, 'DD/MM/YYYY'))
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

        <li className="sidebar-item setting">
          <Link to="/logout">
            <span className="sidebar-link">
              <GoSignOut size={30} color="#FFFFFF" />
            </span>
          </Link>
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
                    >{editName}
                </Title>
              </div>
            </div>
          </div>
          <Form 
          form={formUpdateUser}
          layout="vertical" 
          style={{ gap: '10px' }}
          initialValues={{contact: user.contact, dateOfBirth: moment(user.dayOfBirth, 'DD/MM/YYYY'), gender:user.gender}}
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
                style={{ width: 330}}
                name="dateOfBirth"
                label="Ngày Sinh"
                rules={[
                  {
                    
                    message: 'Ngày sinh không được để trống!',
                  },
                ]}
                // initialValue={ moment(user.dayOfBirth, 'DD/MM/YYYY')}
              >
                <DatePicker
                  disabledDate={(current) => current > moment().subtract(16, 'year').endOf('year')}
                  style={{ width: '100%' , fontFamily: 'Helvetica',padding:'10px',borderRadius:'10px'}}
                  locale={localeVN}
                  format={'DD/MM/YYYY'}
                />
              </Form.Item>
            <Form.Item  label="Giới tính" style={{ fontFamily: 'Helvetica' }} name="gender" >
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
