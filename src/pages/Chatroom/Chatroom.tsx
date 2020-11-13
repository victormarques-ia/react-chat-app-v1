import React, { useEffect, useState, useRef } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import api from '../../global/api';

import { CardHeader, Div, Input } from '../../global/globalStyles';
import { ChatroomContent, Message, OtherMessage, SendButton, ChatroomPage, ChatroomActions, ChatroomSection, OwnMessage, PersonMessage } from './Chatroom.elements';

interface MatchParams {
  id: string;
  name: string;
}

interface ChatroomProps extends RouteComponentProps<MatchParams> {
  socket: SocketIOClient.Socket | any;
}

interface MessageParams {
  userId: string;
  message: string;
  name: string;
}

const Chatroom = ({ match, socket }: ChatroomProps) => {
  const chatroomId = match.params.id;
  const chatroomName = match.params.name;

  const [messages, setMessages] = useState<MessageParams[]>([]);
  const messageRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [userId, setUserId] = useState("");

  const sendMessage = () => { 
    if (socket && messageRef.current) {
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
      });

      messageRef.current.value = "";

    }
  }

  const findChatroomMessages = async () => {
    const oldMessages = await api.get(`/message/${chatroomId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CA_Token'),
      }
    });

    setMessages(oldMessages.data);
  }

  useEffect(() => {
    const token = localStorage.getItem("CA_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if(socket) {
      socket.on('newMessage', (message: MessageParams)=> {
      const newMessages = [...messages, message];
      setMessages(newMessages);
      });
    }

  }, [messages]);

  useEffect(() => {
    
    if(socket) {
      socket.emit('joinRoom', {
        chatroomId
      });
    }

    findChatroomMessages();

    return () => {
      if(socket) {
        socket.emit('leaveRoom', {
          chatroomId
        });
      }
    }

  }, []);

  return (
    <ChatroomPage>
      <ChatroomSection>
        <CardHeader>
          {chatroomName}
          <Link to="/dashboard">Voltar</Link>
        </CardHeader>
        <ChatroomContent>
          {messages.map((message, i) => (
            <Message key={i}>
              <PersonMessage>{message.name}</PersonMessage>
              {userId === message.userId ? 
              <OwnMessage>
                {message.message}
              </OwnMessage>
              :
              <OtherMessage>
                {message.message}
              </OtherMessage>
              }
            </Message>
          ))}
        </ChatroomContent>
        <ChatroomActions>
          <Div>
            <Input type="text" name="message" placeholder="Type something..." ref={messageRef} />
          </Div>
          <Div>
            <SendButton onClick={sendMessage}>
              Send
            </SendButton>
          </Div>
        </ChatroomActions>
      </ChatroomSection>
    </ChatroomPage>
  )
}

export default withRouter(Chatroom);
