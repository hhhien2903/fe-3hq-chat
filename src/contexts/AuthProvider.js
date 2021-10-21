import React, { useEffect, useState } from 'react';
import { firebaseAuth } from '../config/firebase';
import { useHistory } from 'react-router-dom';
import { Spin, Row, notification } from 'antd';
import userApi from '../api/userApi';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribed = firebaseAuth.onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser({});
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);

        history.push('/login');
        return;
      }
      const { uid } = firebaseUser;
      try {
        const user = await userApi.getUserById(uid);
        if (user) {
          setUser(user);
          setIsLoading(false);
          notification.destroy();
          history.push('/');
        }
      } catch (error) {
        setIsLoading(false);
        notification.destroy();
        history.push('/register');
      }
    });
    return () => {
      unsubscribed();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={{ user, setUser, setIsLoading }}>
      {isLoading ? (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
          <Spin size="large" />
        </Row>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
