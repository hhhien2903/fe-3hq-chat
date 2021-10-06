import React, { useState } from 'react';
import { firebaseAuth } from '../config/firebase';
import { useHistory } from 'react-router-dom';
import { Spin, Row, notification } from 'antd';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  React.useState(() => {
    const unsubscribed = firebaseAuth.onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        history.push('/login');
        return;
      }
      const { displayName, uid } = firebaseUser;
      const token = await firebaseUser.getIdToken();
      await setUser({ displayName, uid, token });
      setIsLoading(false);
      notification.close('sendedOtpNotify');
      notification.close('incorrectOtp');
      history.push('/');
    });
    return () => unsubscribed();
  }, [history]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
