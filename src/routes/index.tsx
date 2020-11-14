import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { Chatroom, Dashboard, Login, Register } from '../pages';
import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/dashboard" component={Dashboard} exact isPrivate/>
      <Route path="/conversation/:id/:name/:otherUserId" component={Chatroom} exact isPrivate/>
    </Switch>
  );
}

export default Routes;



