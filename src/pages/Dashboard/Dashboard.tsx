import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom';
import api from '../../global/api';
import { Card, CardBody, CardHeader, InputGroup, ChatRooms, ChatRoom, Join, Label, Input, Button, Div } from '../../global/globalStyles'
import makeToast from '../../global/toaster';
import { useAuth } from '../../hooks/auth';
import { Buttons, DeleteButton, MenuBuntton, MenuButtons } from './Dashboard.elements';

interface ConversationProps {
  _id: string;
  users: UserProps[];
}

interface UserProps {
  _id: string;
  name: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);

  const history = useHistory();

  const [list, setList] = useState(true);
  const newChatroomRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const getConversations = async () => {
    try {
      const response = await api.get(`/conversation/${user._id}`);

      setConversations([...response.data]);

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

  const getUsers = async () => {
    try {
      const response = await api.get('/user');

      const gUsers = response.data.filter((otherUser: UserProps) => otherUser._id !== user._id);
      setUsers([...gUsers]);
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

  const createConversation = async (otherUser: UserProps) => {
    try {
      let resp = await api.post('/conversation', {
        users: [
          user._id,
          otherUser._id
        ]
      }, );

      makeToast('success', resp.data.message);
      history.push(`/conversation/${resp.data.conversationId}/${otherUser.name}/${otherUser._id}`);
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

  const deleteConversation = async (id: string) => {

    try {
      // eslint-disable-next-line no-restricted-globals
      if(confirm('Are you sure ?')) {
        const response = await api.delete(`/conversation/${id}`);

        setConversations([...response.data]);
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
    getConversations();  
    getUsers();
  }, [conversations]);

  return (
    <Card>
      <CardHeader>
        Dashboard
        <Link to="/" onClick={signOut}>Sign Out</Link>
      </CardHeader>
      <CardBody>
        <InputGroup>
          <Label htmlFor="chatroomName">Chatroom Name</Label>
          <Input type="text" name="chatroomName" id="chatroomName" placeholder="Chat CITi - UFPE" ref={newChatroomRef} />
        </InputGroup>
      </CardBody>
      <Button onClick={() => {}}>Create Chatroom</Button>
      <MenuButtons>
        <MenuBuntton disabled={!!list} active={!list} onClick={() => setList(true)}>Conversations</MenuBuntton>
        <MenuBuntton disabled={!list} active={list} onClick={() => setList(!list)}>Users</MenuBuntton>
      </MenuButtons>
      <ChatRooms>
        {list 
        ? conversations.map(conversation => {
          let specificUser: any = null;
          return (
            <ChatRoom key={conversation._id}>
              {conversation.users.map(otherUser => {

                  if(otherUser._id !== user._id) {
                    specificUser = otherUser;
                    return <Div key={otherUser._id}>{otherUser.name}</Div>
                  }
                  return null;
              })}
              <Buttons>
                {specificUser !== null
                  ? <Link to={`/conversation/${conversation._id}/${specificUser.name}/${specificUser._id}`}>
                      <Join>Talk</Join>
                    </Link>
                  :
                  null
                }
                <DeleteButton onClick={() => deleteConversation(conversation._id)}>Delete</DeleteButton>
              </Buttons>
            </ChatRoom>
          )
        }) 

        :

        users.map(otherUser => {
          let specificConversationId = null
          return (
          <ChatRoom key={otherUser._id}>
            <Div>{otherUser.name}</Div>
            <Buttons>
              {conversations.forEach((conversation) => {
                if(conversation.users[0]._id === otherUser._id || conversation.users[1]._id === otherUser._id) {
                  specificConversationId = conversation._id;
                } 
              })}
              {specificConversationId !== null 
                ? <Link to={`/conversation/${specificConversationId}/${otherUser.name}/${otherUser._id}`}>
                    <Join>Talk</Join>
                  </Link>
                :
                 <Join onClick={() => createConversation(otherUser)}>Talk</Join>
              }
            </Buttons>
          </ChatRoom>
          )
        })
        
        }
      </ChatRooms>
    </Card>
  )
}

export default withRouter(Dashboard);
