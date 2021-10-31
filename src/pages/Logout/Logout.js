import { firebase } from '../../config/firebase';
import { Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppProvider';
const Logout = () => {
  const { setCurrentRoom, setRooms } = useContext(AppContext);
  useEffect(() => {
    const Logout = async () => {
      await firebase.auth().signOut();
      setCurrentRoom(null);
      setRooms([]);
    };
    Logout();
  }, []);
  return <Redirect to="/login" />;
};

export default Logout;
