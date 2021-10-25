import { Avatar, Button, Image, Row, Typography } from 'antd';
import { AuthContext } from '../../contexts/AuthProvider';
import { AppContext } from '../../contexts/AppProvider';
import { useContext } from 'react';
const GroupMemberItem = (props) => {
  const { member } = props;
  const { user } = useContext(AuthContext);
  const { currentRoom } = useContext(AppContext);
  return (
    <Row wrap={false} style={{ height: '50px', marginBottom: '10px' }} align="middle">
      <Avatar
        style={{ flex: '40px 0 0' }}
        size={40}
        icon={<Image preview={false} src={member.avatar} />}
      />
      <Typography.Title
        level={5}
        style={{
          flex: 'auto',
          alignSelf: 'center',
          paddingLeft: '10px',
          margin: '0 auto',
        }}
      >
        {member.fullName}
      </Typography.Title>
      {user._id === currentRoom.creatorId && (
        <Button danger style={{ flex: 'initial' }}>
          Xoá
        </Button>
      )}
    </Row>
  );
};

export default GroupMemberItem;
