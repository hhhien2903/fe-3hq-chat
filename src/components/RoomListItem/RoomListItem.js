import { Avatar, Image, Typography } from 'antd';
import './RoomListItem.scss';

const RoomListItem = (props) => {
  const { room, cName, handleSelectedRoom } = props;

  return (
    <>
      <div className={cName} onClick={() => handleSelectedRoom(room)}>
        <div className="room icon">
          {!room.avatarUrl ? (
            room.members.length > 1 ? (
              <Avatar.Group size={38}>
                <Avatar style={{ marginTop: '15px' }} src={room.members[0].avatar} />
                <Avatar style={{ marginLeft: '-18px' }} src={room.members[1].avatar} />
              </Avatar.Group>
            ) : (
              <Avatar size={55} icon={<Image preview={false} src={room.members[0].avatar} />} />
            )
          ) : (
            <Avatar size={55} icon={<Image preview={false} src={room.avatarUrl} />} />
          )}
        </div>
        <div className="room title">
          <Typography.Text>{room.title}</Typography.Text>
        </div>
      </div>
    </>
  );
};

export default RoomListItem;
