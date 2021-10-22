import { Avatar, Image, Typography } from 'antd';
import './RoomListItem.scss';

const RoomListItem = (props) => {
  const { room, cName, handleSelectedRoom } = props;

  return (
    <>
      <div className={cName} onClick={() => handleSelectedRoom(room)}>
        <div className="room icon">
          <Avatar size={55} icon={<Image preview={false} src={room.avatarUrl} />} />
        </div>
        <div className="room title">
          <Typography.Text>{room.title}</Typography.Text>
        </div>
      </div>
    </>
  );
};

export default RoomListItem;
