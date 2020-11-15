import React, { createRef } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Input, InputGroup, Label } from '../../global/globalStyles';
import makeToast from '../../global/toaster';
import { useAuth } from '../../hooks/auth';

const Register = () => {
  const { signUp } = useAuth();
  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const history = useHistory();

  const registerUser = async () => {
    try {
      let name = '';
      let email = '';
      let password = '';

      if(nameRef.current && emailRef.current && passwordRef.current) {
        email = emailRef.current.value;
        password = passwordRef.current.value;
        name = nameRef.current.value;
      }

      await signUp({ name, email, password });

      makeToast('success', 'User created successfully!');

      history.push('/');
    } catch (err) {
      makeToast('error', 'Error when trying to register user!');
    }
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
      <Link to="/">
      <Button other>Login</Button>
      </Link>
    </Card>
  )
}

export default Register
