import React, { useEffect, useRef, useState } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import api from '../../global/api';
import { Card, CardBody, CardHeader, InputGroup, ChatRooms, ChatRoom, Join, Label, Input, Button, Div } from '../../global/globalStyles'
import makeToast from '../../global/toaster';
import { Buttons, DeleteButton } from './Dashboard.elements';

interface Chatroom {
  _id: string;
  name: string;
}

interface DashboardProps extends RouteComponentProps {
  socket: SocketIOClient.Socket | null
}

const Dashboard = (props: DashboardProps) => {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const newChatroomRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const getChatrooms = () => {
    api.get('/chatroom', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CA_Token'),
      }
    })
    .then((response) => {
      setChatrooms(response.data);
    })
    .catch((err) => {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      )
        makeToast('error', err.response.data.message);
    });
  }

  const createChatroom = () => {
    api
    .post('/chatroom', {
      name: newChatroomRef.current.value
    }, 
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CA_Token'),
    },
    })
    .then((response) => {
      setChatrooms([...chatrooms, response.data]);
      makeToast('success', response.data.message);
    })
    .catch((err) => {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      )
        makeToast('error', err.response.data.message);
    });
    newChatroomRef.current.value = "";
  }

  const deleteChatroom = (id: string) => {
    api
    .delete(`/chatroom/${id}`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CA_Token'),
    },
    })
    .then((response) => {
      //userData.tags.filter((data: Tag) => data.id !== id);
      const newChatrooms = chatrooms.filter((chatroom) => chatroom._id !== id);
      setChatrooms([...newChatrooms]);
      makeToast('success', response.data.message);
    })
    .catch((err) => {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      )
        makeToast('error', err.response.data.message);
    });
  }

  useEffect(() => {
    getChatrooms();
  }, [chatrooms]);

  return (
    <Card>
      <CardHeader>
        Chatrooms
        <Link to="/" onClick={() => {
          localStorage.clear();
        }}>Sair</Link>
      </CardHeader>
      <CardBody>
        <InputGroup>
          <Label htmlFor="chatroomName">Chatroom Name</Label>
          <Input type="text" name="chatroomName" id="chatroomName" placeholder="Chat CITi - UFPE" ref={newChatroomRef} />
        </InputGroup>
      </CardBody>
      <Button onClick={createChatroom}>Create Chatroom</Button>
      <ChatRooms>
        {chatrooms.map(chatroom => (
          <ChatRoom key={chatroom._id}>
            <Div>{chatroom.name}</Div>
            <Buttons>
              <Link to={`/chatroom/${chatroom._id}/${chatroom.name}`}>
                <Join>Join</Join>
              </Link>
              <DeleteButton onClick={() => deleteChatroom(chatroom._id)}>Delete</DeleteButton>
            </Buttons>
          </ChatRoom>
        ))}
      </ChatRooms>
    </Card>
  )
}

export default withRouter(Dashboard);
