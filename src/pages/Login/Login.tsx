import React, { createRef } from 'react'
import makeToast from '../../global/toaster';
import api from '../../global/api';

import { Button, Card, CardBody, CardHeader, Input, InputGroup, Label } from '../../global/globalStyles';

import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface LoginProps extends RouteComponentProps {
  setupSocket: () => void
}

const Login = (props: LoginProps) => {
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  const loginUser = () => {
    let email;
    let password;

    if(emailRef.current && passwordRef.current) {
      email = emailRef.current.value;
      password = passwordRef.current.value;
    }

    api
    .post('/user/login', {
      email,
      password,
    })
    .then((response) => {
      makeToast('success', response.data.message);
      localStorage.setItem('CA_Token', response.data.token);
      props.history.push('/dashboard');
      props.setupSocket();
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
