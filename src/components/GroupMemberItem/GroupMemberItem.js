import { Avatar, Button, Row, Typography, Modal, message } from 'antd';
import { useContext } from 'react';
import roomApi from '../../api/roomApi';
import { AppContext } from '../../contexts/AppProvider';
import { AuthContext } from '../../contexts/AuthProvider';
const GroupMemberItem = (props) => {
  const { member } = props;
  const { user } = useContext(AuthContext);
  const { currentRoom } = useContext(AppContext);

  const handleDeleteMember = () => {
    const confirmRemoveMemberFromRoom = Modal.confirm({
      title: 'Xác Nhận',
      content: `Bạn có muốn mời ${member.fullName} ra khỏi phòng?`,
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      onOk: async () => {
        try {
          const res = await roomApi.removeMemberFromRoom(currentRoom._id, member._id);
          message.loading({
            content: 'Xin chờ giây lát...',
            duration: 0,
          });
          setTimeout(() => {
            message.destroy();
            message.success({
              content: 'Xoá thành viên thành công',
              duration: 5,
            });
          }, 3000);
        } catch {
          message.error({
            content: 'Xoá thành viên khỏi cuộc trò chuyện không thành công, xin thử lại sau!',
            duration: 5,
          });
        }
      },
      onCancel() {
        confirmRemoveMemberFromRoom.destroy();
      },
    });
  };
  return (
    <Row wrap={false} style={{ height: '50px', marginBottom: '10px' }} align="middle">
      <Avatar style={{ flex: '40px 0 0' }} size={40} src={member.avatar} />
      <Typography.Title
        level={5}
        style={{
          flex: 'auto',
          alignSelf: 'center',
          paddingLeft: '10px',
          margin: '0 auto',
        }}
      >
        {member._id === currentRoom.creatorId
          ? `${member.fullName} (Trưởng nhóm)`
          : member.fullName}
      </Typography.Title>
      {user._id === currentRoom.creatorId &&
        (member._id !== user._id ? (
          <Button onClick={handleDeleteMember} danger style={{ flex: 'initial' }}>
            Xoá
          </Button>
        ) : (
          ''
        ))}
    </Row>
  );
};

export default GroupMemberItem;
