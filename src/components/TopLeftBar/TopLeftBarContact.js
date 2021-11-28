import { Avatar, Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { useContext, useState } from 'react';
import { AiOutlineSearch, AiOutlineUsergroupAdd } from 'react-icons/ai';
import roomApi from '../../api/roomApi';
import userApi from '../../api/userApi';
import { AppContext } from '../../contexts/AppProvider';
import { AuthContext } from '../../contexts/AuthProvider';
import './TopLeftBar.scss';
const TopLeftBar = () => {
  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] = useState(false);
  const [formCreateRoom] = Form.useForm();
  const [friendList, setFriendList] = useState([]);
  const { user } = useContext(AuthContext);
  const { setSearchContactTerm } = useContext(AppContext);

  const handleCreateRoom = () => {
    formCreateRoom
      .validateFields()
      .then(async (formValues) => {
        try {
          message.loading({ content: 'Xin đợi giây lát...', duration: 0 });
          const { selectedFriends, roomTitle } = formValues;
          const data = {
            title: roomTitle,
            creatorId: user._id,
            members: [user._id, ...selectedFriends],
          };
          await roomApi.createRoom(data);

          setIsCreateRoomModalVisible(false);
          formCreateRoom.resetFields();

          message.destroy();
          message.success({ content: 'Tạo phòng thành công!', duration: 3 });
        } catch (error) {
          message.destroy();
          message.error({
            content: 'Tạo phòng không thành công, bạn vui lòng thử lại sau!',
            duration: 5,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFriendList = async () => {
    try {
      const res = await userApi.getFriendList(user);
      setFriendList(res.friends);
      console.log(res.friends);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row wrap={false} align="middle" className="top-left-container">
        <Col flex={1}>
          <Row className="search-bar" justify="center">
            <Input
              className="input-search"
              allowClear
              onChange={(e) => {
                setSearchContactTerm(e.target.value);
              }}
              placeholder="Tìm kiếm..."
              prefix={<AiOutlineSearch size={20} />}
            />
          </Row>
        </Col>
        <Col flex="initial"></Col>
      </Row>
    </>
  );
};

export default TopLeftBar;
