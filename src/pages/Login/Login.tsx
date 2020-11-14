import React, { createRef } from 'react'
import makeToast from '../../global/toaster';

import { Button, Card, CardBody, CardHeader, Input, InputGroup, Label } from '../../global/globalStyles';

import { Link, useHistory, withRouter } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useSocket } from '../../hooks/socketProvider';


const Login = () => {
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const { setupSocket } = useSocket();
  const { signIn } = useAuth();
  const history = useHistory();

  const loginUser = async () => {
    try {
      let email = '';
      let password = '';

      if(emailRef.current && passwordRef.current) {
        email = emailRef.current.value;
        password = passwordRef.current.value;
      }

      await signIn({ email, password });

      makeToast('success', 'User loged successfully!');

      setupSocket();

      history.push('/dashboard');
    } catch (err) {
      makeToast('error', 'Error trying to login try again!');
    }
  }

  return (
    <Card>
      <CardHeader>Login</CardHeader>
      <CardBody>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" id="email" placeholder="your@mail.com" ref={emailRef} />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="Your Password" ref={passwordRef} />
        </InputGroup>
        <Button onClick={loginUser}>Login</Button>
        <Link to="/register">
          <Button other>Register</Button>
        </Link>
      </CardBody>
    </Card>
  )
}

export default withRouter(Login);
