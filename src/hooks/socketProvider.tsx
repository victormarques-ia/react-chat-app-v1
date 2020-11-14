import React, { createContext, useCallback, useContext, useState } from "react";
import io from 'socket.io-client';
import { useEffect } from "react";
import makeToast from "../global/toaster";

interface SocketContextProps {
  socket: SocketIOClient.Socket | null ;
  setupSocket(): Promise<void>;
}

const SocketContext = createContext<SocketContextProps>({} as SocketContextProps);

export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  
  const setupSocket = useCallback(async () => {
    const token = localStorage.getItem('@ChatApp:token');
    if(token && !socket) {
      const newSocket = io('http://localhost:8000', {
      query: {
          token,
        },
      });
      newSocket.on('disconnect', async () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast('error', 'Socket Disconnected!');
      });
      newSocket.on('connect', () => {
        makeToast('success', 'Socket Connected!');
      });
      setSocket(newSocket);
    } 
  }, [socket])

  useEffect(() => {
    setupSocket();
  }, [setupSocket]);
  return (
    <SocketContext.Provider
      value={{ socket: socket, setupSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};