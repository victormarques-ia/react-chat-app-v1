import React, { createRef } from 'react'
import { Link, useHistory } from 'react-router-dom';
import api from '../../global/api';
import { Button, Card, CardBody, CardHeader, Input, InputGroup, Label } from '../../global/globalStyles';
import makeToast from '../../global/toaster';

const Register = () => {

  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const history = useHistory();

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
      history.push('/login');
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
          <Input type="password" name="password" id="password" placeholder="Your Password" ref={passwordRef} />
        </InputGroup>
      </CardBody>
      <Button onClick={registerUser}>Register</Button>
      <Link to="/login">
      <Button other>Login</Button>
      </Link>
    </Card>
  )
}

export default Register
