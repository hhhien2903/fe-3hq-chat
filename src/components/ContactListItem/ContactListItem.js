import { Avatar, Typography } from 'antd';
import './ContactListItem.scss';
import { MoreOutlined } from '@ant-design/icons';
const ContactListItem = (props) => {
  const { friend, cName, handleSelected } = props;
  return (
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
  );
};
export default ContactListItem;
