import { Collapse } from 'antd';
import { useContext, useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import roomApi from '../../api/roomApi';
import userApi from '../../api/userApi';
import { AppContext } from '../../contexts/AppProvider';
import { AuthContext } from '../../contexts/AuthProvider';
import RoomListItem from '../RoomListItem/RoomListItem';
import './RoomList.scss';
const RoomList = () => {
  const { user } = useContext(AuthContext);
  const { currentRoom, setCurrentRoom, rooms, setRooms } = useContext(AppContext);
  useEffect(() => {
    const getRooms = async () => {
      try {
        let roomsData = await roomApi.getRoomsByUserId(user._id);
        let rooms = await Promise.all(
          roomsData.map(async (room) => {
            if (room?.title) {
              return { ...room, avatarUrl: room.avatarUrl };
            } else {
              let friendId = room.members.find((member) => member !== user._id);
              try {
                let friendData = await userApi.getUserById(friendId);
                return { ...room, title: friendData.fullName, avatarUrl: friendData.avatar };
              } catch (error) {
                console.log(error);
              }
            }
          }),
        );
        let isCloudRoom = rooms.find((room) => room.isCloud);
        rooms = rooms.filter((room) => !room.isCloud);
        rooms.unshift(isCloudRoom);
        setRooms(rooms);
        console.log(rooms);
      } catch (error) {
        console.log(error);
      }
    };

    getRooms();
  }, []);

  const handleSelectedRoom = async (room) => {
    try {
      let roomDetail = await roomApi.getRoomById(room._id);
      room = { ...room, members: roomDetail.members };
      setCurrentRoom(room);
    } catch (error) {
      console.log(error);
    }
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
