import { Avatar, Image, message, notification } from 'antd';
import './LeftSidebar.scss';
import { IoChatbubbleEllipses, IoPeople } from 'react-icons/io5';
import { GoSignOut } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

import { useState } from 'react';
import React from 'react';
import { Modal, Form, Input, Radio, Select, Button, Upload, Tooltip } from 'antd';
import { EditOutlined, PlusCircleOutlined ,CameraOutlined } from '@ant-design/icons';
import './ModalUserInfo.scss';
import { BsFillCameraFill ,FcApproval} from 'react-icons/bs';

import FormData from 'form-data';
import { AppContext } from '../../contexts/AppProvider';
import userApi from '../../api/userApi';
const { Option } = Select;

function LeftSidebar() {
  const { currentRoom } = useContext(AppContext);
  const { user,setUser } = useContext(AuthContext);
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const [editName, setEditName] = useState(false);
  const handleEditName = () => {
    setEditName(!editName);
  };

  const handleUploadAvatar = async (fileData) => {
    const formData = new FormData();
    formData.append('avatar', fileData.file);
    try {
      const imageData = await userApi.uploadAvatar(formData);
      console.log(imageData);
      setUser(imageData)
    } catch (error) {
      console.log(error);
    }
  };
  const checkFileIsImage = {
    beforeUpload: (file) => {
      if (!file['type'].includes('image')) {
        message.error(`${file.name} Không phải là tệp hình ảnh`);
        return false;
      }
      else{
        notification.open({message:'Cập nhật ảnh đại diện thành công'})
      }
      return true;
    },
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
              onClick={() => setIsModalVisible(false)}
            >
              Cập nhật
            </Button>,
          ]}
        >
          <div className="form-header">
            <div className="avatar-container-profile">
            <div className="upload-avatar">
                <Avatar size={93} 
                icon={<Image src={user.avatar} preview = {true }/>}
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
                <h3 style={{ marginRight: '50px' }}>Quyền Võ</h3>
                <Tooltip title="Cập nhật tên hiển thị">
                  {
                    <EditOutlined
                      style={{ marginTop: '5px' }}
                      size={30}
                      onClick={() => handleEditName()}
                    />
                  }
                </Tooltip>
              </div>
            </div>
          </div>
          <Form layout="vertical" style={{ gap: '10px' }}>
            <Form.Item
              label="Thông tin đăng ký"
              style={{ marginRight: '20px', fontFamily: 'Helvetica' }}
            >
              <Input
                placeholder="+0387650617"
                readOnly
                style={{
                  backgroundColor: '#DCDCDC',
                  borderRadius: '5px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                }}
              />
            </Form.Item>
            <Form.Item label="Ngày sinh" style={{ fontFamily: 'Helvetica' }}>
              <Select style={{ width: 90, marginRight: '10px' }}>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
                <Option value="9">9</Option>
                <Option value="10">10</Option>
                <Option value="11">11</Option>
                <Option value="12">12</Option>
                <Option value="13">13</Option>
                <Option value="14">14</Option>
                <Option value="15">15</Option>
                <Option value="16">17</Option>
                <Option value="18">18</Option>
                <Option value="19">19</Option>
                <Option value="20">20</Option>
                <Option value="21">21</Option>
                <Option value="22">22</Option>
                <Option value="23">23</Option>
                <Option value="24">24</Option>
                <Option value="25">25</Option>
                <Option value="26">26</Option>
                <Option value="27">27</Option>
                <Option value="28">28</Option>
                <Option value="29">29</Option>
                <Option value="30">30</Option>
                <Option value="31">31</Option>
              </Select>
              <Select style={{ width: 90, marginRight: '10px' }}>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
                <Option value="9">9</Option>
                <Option value="10">10</Option>
                <Option value="11">11</Option>
                <Option value="12">12</Option>
              </Select>
              <Select style={{ width: 130, marginRight: '10px' }}>
                <Option value="1">2000</Option>
                <Option value="2">2001</Option>
                <Option value="3">2003</Option>
                <Option value="4">2004</Option>
                <Option value="5">2005</Option>
                <Option value="6">2006</Option>
                <Option value="7">2007</Option>
                <Option value="8">2008</Option>
                <Option value="9">2009</Option>
                <Option value="10">2010</Option>
                <Option value="11">2011</Option>
                <Option value="12">2012</Option>
              </Select>
            </Form.Item>
            <Form.Item name="radio-group" label="Giới tính" style={{ fontFamily: 'Helvetica' }}>
              <Radio.Group>
                <Radio value="Nam">Nam</Radio>
                <Radio value="Nữ">Nữ</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default LeftSidebar;
