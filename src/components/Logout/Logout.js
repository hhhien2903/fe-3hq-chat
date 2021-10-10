import { firebase } from '../../config/firebase';
import { Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
const Logout = () => {
  useEffect(() => {
    const Logout = async () => {
      await firebase.auth().signOut();
    };
    Logout();
  }, []);
  return <Redirect to="/login" />;
};

export default Logout;
