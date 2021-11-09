import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import roomApi from '../api/roomApi';
import userApi from '../api/userApi';
import isEqual from 'lodash.isequal';
export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [isAddFriendModalVisible, setIsAddFriendModalVisible] = useState(false);
  const [friends, setFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [friendsSuggestion, setFriendsSuggestion] = useState([]);
  const [friendsRequest, setFriendsRequest] = useState([]);

  const setupSocket = async () => {
    const newSocket = await io(process.env.REACT_APP_SOCKET_BASE_URL, {
      transports: ['websocket'],
    });
    setSocket(newSocket);
  };
  useEffect(() => {
    setupSocket();
  }, []);
  const getListFriendRequest = async () => {
    try {
      const listFriendRequest = await userApi.getListFriendRequest();
      setFriendsRequest(listFriendRequest);
    } catch (error) {
      console.log(error);
    }
  };
  const getListSuggestion = async () => {
    try {
      const listSuggestionsData = await userApi.getListFriendSuggetion();
      setFriendsSuggestion(listSuggestionsData);
    } catch (error) {
      console.log(error);
    }
  };
  const getFriendList = async () => {
    try {
      const friendsData = await userApi.getFriendList();
      setFriends(friendsData.friends);
    } catch (error) {
      console.log(error);
    }
  };
  const getRoomsList = async () => {
    try {
      const res = await roomApi.getRoomsByUser();
      // const roomsData = res.map((room) => ({
      //   _id: room._id,
      //   title: room.title,
      //   members: room.members,
      //   latestMessage: room.latestMessage,
      //   isGroup: room.isGroup,
      //   isCloud: room.isCloud,
      //   creatorId: room.creatorId,
      //   createdAt: room.createdAt,
      //   avatarUrl: room.avatarUrl,
      // }));

      // if (isEqual(roomsData, rooms) === false) {
      //   console.log('running');
      setRooms(res);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const updateRoomsListAfterUpdateCurrentRoom = (newRoomInfo) => {
    const index = rooms.findIndex((room) => room._id === newRoomInfo._id);
    console.log('currrent', rooms);
    let cc = [...rooms];
    cc.splice(index, 1, newRoomInfo);
    console.log('cc', cc);
    setRooms(cc);
  };

  return (
    <AppContext.Provider
      value={{
        currentRoom,
        setCurrentRoom,
        socket,
        rooms,
        setRooms,
        setSocket,
        setupSocket,
        getRoomsList,
        isAddFriendModalVisible,
        setIsAddFriendModalVisible,
        getFriendList,
        friends,
        setFriends,
        currentFriend,
        setCurrentFriend,
        getListSuggestion,
        friendsSuggestion,
        setFriendsSuggestion,
        getListFriendRequest,
        friendsRequest,
        setFriendsRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
