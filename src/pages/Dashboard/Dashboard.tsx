import React from 'react'
import { Card, CardBody, CardHeader, InputGroup, ChatRooms, ChatRoom, Join } from '../../global/globalStyles'
import { Label, Input, Button, Div } from './Dashboard.elements'

const Dashboard = () => {
  return (
    <Card>
      <CardHeader>Chatrooms</CardHeader>
      <CardBody>
        <InputGroup>
          <Label htmlFor="chatroomName">Chatroom Name</Label>
          <Input type="text" name="chatroomName" id="chatroomName" placeholder="ChatterBox Portugal" />
        </InputGroup>
      </CardBody>
      <Button>Create Chatroom</Button>
      <ChatRooms>
        <ChatRoom>
          <Div>Happy Newbie</Div>
          <Join>Join</Join>
        </ChatRoom>
        <ChatRoom>
          <Div>Happy Newbie</Div>
          <Join>Join</Join>
        </ChatRoom>
        <ChatRoom>
          <Div>Happy Newbie</Div>
          <Join>Join</Join>
        </ChatRoom>
      </ChatRooms>
    </Card>
  )
}

export default Dashboard
