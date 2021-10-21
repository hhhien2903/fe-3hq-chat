import { Avatar, Button, Image, Row, Typography } from 'antd';

const GroupMemberItem = (props) => {
  const { user } = props;
  return (
    <Row wrap={false} style={{ height: '50px', marginBottom: '10px' }} align="middle">
      <Avatar style={{ flex: '40px 0 0' }} size={40} icon={<Image preview={false} />} />
      <Typography.Title
        level={5}
        style={{
          flex: 'auto',
          alignSelf: 'center',
          paddingLeft: '10px',
          margin: '0 auto',
        }}
      >
        {user.fullName}
      </Typography.Title>
      <Button danger style={{ flex: 'initial' }}>
        Xoá
      </Button>
    </Row>
  );
};

export default GroupMemberItem;
