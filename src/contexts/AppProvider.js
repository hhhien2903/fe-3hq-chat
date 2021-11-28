import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import roomApi from '../api/roomApi';
import userApi from '../api/userApi';
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
  const [searchRoomTerm, setSearchRoomTerm] = useState('');
  const [searchContactTerm, setSearchContactTerm] = useState('');
  const [listNotification, setListNotification] = useState([]);
  const setupSocket = async () => {
    const newSocket = await io(process.env.REACT_APP_SOCKET_BASE_URL, {
      transports: ['websocket'],
    });
    setSocket(newSocket);
  };
  useEffect(() => {
    setupSocket();
  }, []);

  const getListNotification = async () => {
    try {
      const listNotifications = await userApi.getListNotification();
      setListNotification(listNotifications);
    } catch (error) {
      console.log(error);
    }
  };
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
      setRooms(res);
    } catch (error) {
      console.log(error);
    }
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
        searchRoomTerm,
        setSearchRoomTerm,
        searchContactTerm,
        setSearchContactTerm,
        listNotification,
        setListNotification,
        getListNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
