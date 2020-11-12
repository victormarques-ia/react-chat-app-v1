import React, { createRef } from 'react'
import makeToast from '../../global/toaster';
import api from '../../global/api';

import { Card, CardBody, CardHeader, InputGroup } from '../../global/globalStyles';

import { Input, Label, LoginButton } from './Login.elements';

const Login = (props: { history: string[]; }) => {
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
        <LoginButton onClick={loginUser}>Login</LoginButton>
      </CardBody>
    </Card>
  )
}

export default Login
