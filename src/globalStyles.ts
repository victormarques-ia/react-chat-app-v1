import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
  }

  body {
    font-size: 16px;
  }

  label {
    font-size: 0.9rem;
  }

  input {
    border: none;
    padding: 0.5rem 0.1rem;
    width: 100%;
    border-radius: 2px;
    border-bottom: 1px solid #eee;
    transition: all 0.5s;

    &:focus {
      border-bottom: 1px solid #ccc;
    }

    button {
      background: #f7c52a;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 2px;
      width: 100%;
      text-transform: uppercase;
    }
  }
`;

export const Card = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  padding: 1rem;
  position: relative;
  position: fixed;
  left: 50%;
  top: 50%;
  width: 25vw;
  transform: translate(-50%, -50%);
`;

export const CardHeader = styled.header`
  background: #f7c52a;
  padding: 0.75rem 1.5rem;
  border-radius: 2px;
  text-transform: uppercase;
  transform: skewY(-4deg);
  font-size: 1.1rem;
  font-weight: bold;
  display: inline-block;
  position: absolute;
  top: -1rem;
  left: -0.75rem;
`;

export const CardBody = styled.div`
  margin-top: 2rem;
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
`;

export const Join = styled.div`
  background: #f7c52a;
  padding: 0.25rem 1rem;
  border-radius: 2px;
`;

export default GlobalStyle;