import { Collapse } from 'antd';
import { useContext, useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import roomApi from '../../api/roomApi';
import { AppContext } from '../../contexts/AppProvider';
import { AuthContext } from '../../contexts/AuthProvider';
import RoomListItem from '../RoomListItem/RoomListItem';
import './RoomList.scss';
const RoomList = () => {
  const { user } = useContext(AuthContext);
  const { currentRoom, setCurrentRoom, rooms, getRoomsList } = useContext(AppContext);

  useEffect(() => {
    getRoomsList();
  }, []);

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
