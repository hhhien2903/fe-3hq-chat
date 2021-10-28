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
  const { currentRoom, setCurrentRoom, rooms, setRooms } = useContext(AppContext);
  useEffect(() => {
    const getRooms = async () => {
      try {
        const roomsData = await roomApi.getRoomsByUser();
        setRooms(roomsData);

        console.log(roomsData);
      } catch (error) {
        console.log(error);
      }
    };

    getRooms();
  }, [setRooms, user]);

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

  // const roomListTest = [
  //   {
  //     createdAt: '2021-10-26T13:47:13.342Z',
  //     isGroup: true,
  //     members: [
  //       {
  //         avatar: 'https://ui-avatars.com/api/?name=Hiển',
  //         fullName: 'Hiển',
  //         isActive: true,
  //         _id: 'gdxADMsRd2RhhdgCtPwhrbd9DfA3',
  //       },
  //       {
  //         avatar: 'https://ui-avatars.com/api/?name=Hậu',
  //         fullName: 'Hậu',
  //         isActive: true,
  //         _id: '37L37Zt9a3VO9TegCmXmBLIOC4G3',
  //       },
  //     ],
  //     creatorId: 'gdxADMsRd2RhhdgCtPwhrbd9DfA3',
  //     title: 'Group ne hihi',
  //     updatedAt: '2021-10-26T13:47:13.342Z',
  //     _id: '617806e11ae09e0023ce66c6',
  //   },
  // ];
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
