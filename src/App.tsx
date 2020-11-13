import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch   } from 'react-router-dom';
import Route from './Route';
import io from "socket.io-client";
import GlobalStyle from './global/globalStyles';
import makeToast from './global/toaster';
import { Login, Dashboard, Index, Register, Chatroom} from './pages';

function App() {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  
  const setupSocket = () => {
    const token = localStorage.getItem('CA_Token');
    if(token && !socket) {
      const newSocket = io('http://localhost:8000', {
      query: {
          token: localStorage.getItem('CA_Token'),
        },
      });
      newSocket.on('disconnect', () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast('error', 'Socket Disconnected!');
      });
      newSocket.on('connect', () => {
        makeToast('success', 'Socket Connected!');
      });
      setSocket(newSocket);
    } 
  }

  useEffect(() => {
    setupSocket();
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
       <Route path="/" component={Index} exact />
        <Route path="/login" component={() => <Login setupSocket={setupSocket} />} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/dashboard" component={() => <Dashboard socket={socket} />} exact isPrivate/>
        <Route path="/chatroom/:id/:name" component={() => <Chatroom socket={socket} />} exact isPrivate/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
