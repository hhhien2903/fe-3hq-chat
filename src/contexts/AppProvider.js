import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const setupSocket = async () => {
      const newSocket = await io(process.env.REACT_APP_SOCKET_BASE_URL, {
        transports: ['websocket'],
      });
      setSocket(newSocket);
    };

    setupSocket();
  }, []);

  return (
    <AppContext.Provider value={{ currentRoom, setCurrentRoom, socket }}>
      {children}
    </AppContext.Provider>
  );
}
