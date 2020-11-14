import React, { useEffect, useState, useRef } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import api from '../../global/api';

import { CardHeader, Div, Input } from '../../global/globalStyles';
import makeToast from '../../global/toaster';
import { useAuth } from '../../hooks/auth';
import { useSocket } from '../../hooks/socketProvider';
import { ChatroomContent, Message, OtherMessage, SendButton, ChatroomPage, ChatroomActions, ChatroomSection, OwnMessage, PersonMessage } from './Chatroom.elements';

interface MatchParams {
  id: string;
  name: string;
  otherUserId: string;
}

interface ChatroomProps extends RouteComponentProps<MatchParams> {
 
}

interface MessageParams {
  userId: string;
  message: string;
  name: string;
}

const Chatroom = ({ match }: ChatroomProps) => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const conversationId = match.params.id; 
  const otherUserName = match.params.name;

  const [messages, setMessages] = useState<MessageParams[]>([]);
  const messageRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const sendMessage = async () => { 

    if (socket && messageRef.current) {
      socket.emit("conversationMessage", {
        conversationId: conversationId,
        message: messageRef.current.value,
      });
      
      messageRef.current.value = "";

    }
  }

  const findChatroomMessages = async () => {
    const oldMessages = await api.get(`/message/${conversationId}`);

    setMessages(oldMessages.data);
  }

  useEffect(() => {
    if(socket) {
      socket.on('newMessage', (message: MessageParams)=> {
      
      const newMessages = [...messages, message];
      setMessages(newMessages);
      });
    }

  }, []);

  const deleteConversation = async () => {
    // eslint-disable-next-line no-restricted-globals
    try {
      if(messages.length < 1) {
        const response = await api.delete(`/conversation/${conversationId}`);
        makeToast('success', response.data.message);
      }
    } catch (err) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      )
        makeToast('error', err.response.data.message);
    }
      
  }

  useEffect(() => {
    
    if(socket && conversationId) {
      socket.emit('joinRoom', {
        conversationId
      });
      findChatroomMessages();
    }

    return () => {

      if(socket && conversationId) {
        socket.emit('leaveRoom', {
          conversationId
        });
       // deleteConversation();
      }
    }

  }, []);

  return (
    <ChatroomPage>
      <ChatroomSection>
        <CardHeader>
          {otherUserName}
          <Link to="/dashboard">Back</Link>
        </CardHeader>
        <ChatroomContent>
          {messages.map((message, i) => (
            <Message key={i}>
              <PersonMessage>{message.name}</PersonMessage>
              {user._id === message.userId ? 
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
