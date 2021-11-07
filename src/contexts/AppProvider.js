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
  const [currentFriendsSuggestion, setCurrentFriendsSuggestion] = useState([]);
  const [friendsRequest, setFriendsRequest] = useState([]);
  const [currentFriendsRequest, setCurrentFriendsRequest] = useState(null);

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
      const roomsData = await roomApi.getRoomsByUser();
      setRooms(roomsData);
      console.log(roomsData);
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
        currentFriendsSuggestion,
        setCurrentFriendsSuggestion,
        getListFriendRequest,
        friendsRequest,
        setFriendsRequest,
        currentFriendsRequest,
        setCurrentFriendsRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
