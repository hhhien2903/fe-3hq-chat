import { Collapse } from 'antd';
import { useContext, useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import { AppContext } from '../../contexts/AppProvider';
import { AuthContext } from '../../contexts/AuthProvider';
import RoomListItem from '../RoomListItem/RoomListItem';
import './RoomList.scss';
import roomApi from '../../api/roomApi';
import isEqual from 'lodash.isequal';
const RoomList = () => {
  const { user } = useContext(AuthContext);
  const { currentRoom, setCurrentRoom, rooms, getRoomsList } = useContext(AppContext);

  useEffect(() => {
    getRoomsList();
  }, []);

  useEffect(() => {
    const getRoomsListInterval = setInterval(() => {
      console.log('call api after 10s');
      getRoomsList();
    }, 5000);

    return () => {
      clearInterval(getRoomsListInterval);
    };
  }, []);

  useEffect(() => {
    const updateCurrentRoomInfo = setInterval(async () => {
      if (currentRoom?.isGroup) {
        const { _id, title, members, avatarUrl } = await roomApi.getRoomById(currentRoom._id);
        let newRoomInfo = { _id, title, members, avatarUrl };

        if (
          currentRoom.title !== newRoomInfo.title ||
          currentRoom.avatarUrl != newRoomInfo.avatarUrl ||
          isEqual(currentRoom.members, newRoomInfo.members) === false
        ) {
          const checkIsMemberInRoom = newRoomInfo.members.some((member) => {
            return member._id === user._id;
          });
          if (checkIsMemberInRoom === true) {
            console.log('in room');
            setCurrentRoom({
              ...currentRoom,
              title: newRoomInfo.title,
              members: newRoomInfo.members,
              avatarUrl: newRoomInfo.avatarUrl,
            });
          } else {
            console.log('be kicked');
            setCurrentRoom(null);
          }
        }
      }
    }, 5000);

    return () => {
      clearInterval(updateCurrentRoomInfo);
    };
  }, [currentRoom]);

  const handleSelectedRoom = (room) => {
    setCurrentRoom(room);
  };

  const setRoomClassName = (index) => {
    if (rooms[index]._id === currentRoom?._id) {
      return 'room content active';
    } else {
      return 'room content';
    }
  };

  return (
    <SimpleBar style={{ maxHeight: '100vh' }}>
      <Collapse className="room-list-collapse" ghost defaultActiveKey={'1'}>
        <Collapse.Panel header="Tất cả cuộc trò chuyện" key="1">
          <div className="room-list scrollable">
            {rooms.map((room, index) => {
              return (
                <RoomListItem
                  key={room._id}
                  cName={setRoomClassName(index)}
                  handleSelectedRoom={handleSelectedRoom}
                  room={room}
                />
              );
            })}
          </div>
        </Collapse.Panel>
      </Collapse>
    </SimpleBar>
  );
};

export default RoomList;
