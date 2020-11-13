import { HTMLAttributes } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

interface ButtonProps extends React.DetailsHTMLAttributes<HTMLAttributes<HTMLButtonElement>>{
  other?: boolean;
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    outline: none;
  }

  body {
    width: 100%;
    height: 100vh;
    font-size: 16px;
    background-color: #fafafa; //36393f
    color: #36393f;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: #36393f;
  }
`;

export const Button = styled.button<ButtonProps>`
  background: ${({ other }) => (!other ? '#17C3B2' : '#F6F6F6')};
  color: ${({ other }) => (!other ? '#F6F6F6' : '#17C3B2')};
  border: ${({ other }) => (other ? '1px solid #17C3B2' : 'none')};

  font-weight: 700;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  width: 100%;
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: 0.2s;

  &:hover {
    background: ${({ other }) => (other ? '#17C3B2' : '')};
    color: ${({ other }) => (other ? '#F6F6F6' : '')};
  }
`;


export const Input = styled.input`
  border: none;
  padding: 1rem 0.5rem;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #36393f;
  transition: all 0.5s;
`;

export const Label = styled.label`
  font-size: 0.9rem;
`;

export const Div = styled.div``;

export const Card = styled.div`
  background-color: #F6F6F6;
  box-shadow: 0 0 0.5em #36393f;
  border-radius: 8px;
  padding: 1rem;
  min-width: 500px;
`;

export const CardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  background: #17C3B2;
  color: #F6F6F6;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  
  font-size: 1.1rem;
  font-weight: bold;
`;

export const CardBody = styled.div`
  margin-top: 2rem;
  border-radius: 4px;
`;

export const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

export const ChatRooms = styled.div`
  margin-top: 1rem;
`;

export const ChatRoom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 4px;
`;

export const Join = styled(Button)`
  background: #17C3B2;
  padding: 0.25rem 1rem;
  border-radius: 4px;
  margin-bottom: 0;
  cursor: pointer;
`;

export default GlobalStyle;