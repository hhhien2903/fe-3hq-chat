import { Avatar, Dropdown, Typography, Menu } from 'antd';
import './ContactListItem.scss';
import { MoreOutlined } from '@ant-design/icons';
const ContactListItem = (props) => {
  const { friend, cName, handleSelected } = props;
  const menu = (
    <Menu>
      <Menu.Item>Hủy kết bạn</Menu.Item>
      <Menu.SubMenu key="classify" title="Phân loại">
        <Menu.Item key="1">Công việc</Menu.Item>
        <Menu.Item key="2">Gia đình</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <div className={cName} onClick={() => handleSelected(friend)}>
        <div className="contact icon">
          <Avatar size={55} src={friend.avatar} />
        </div>
        <div className="contact name">
          <Typography.Text>{friend.fullName}</Typography.Text>
        </div>
        <div className="contact more">
          <MoreOutlined />
        </div>
      </div>
    </Dropdown>
  );
};
export default ContactListItem;
