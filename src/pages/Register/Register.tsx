import React, { createRef } from 'react'
import api from '../../global/api';
import { Card, CardBody, CardHeader, InputGroup } from '../../global/globalStyles';
import makeToast from '../../global/toaster';
import { Label, Input, LoginButton } from './Register.elements';

const Register = (props: { history: string[]; }) => {

  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  const registerUser = () => {
    let name;
    let email;
    let password;

    if(nameRef.current && emailRef.current && passwordRef.current) {
      name = nameRef.current.value;
      email = emailRef.current.value;
      password = passwordRef.current.value;
    }

    api.post('/user/register', {
      name,
      email,
      password
    })
    .then((response) => {
      makeToast('success', response.data.message);
      props.history.push('/login');
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
      <CardHeader>Registration</CardHeader>
      <CardBody>
        <InputGroup>
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" id="name" placeholder="Your Name" ref={nameRef} />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input type="text" name="email" id="email" placeholder="your@mail.com" ref={emailRef} />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input type="text" name="password" id="password" placeholder="Yout Password" ref={passwordRef} />
        </InputGroup>
      </CardBody>
      <LoginButton onClick={registerUser}>Register</LoginButton>
    </Card>
  )
}

export default Register
