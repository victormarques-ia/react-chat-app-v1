import styled from 'styled-components';
import { Button, Join } from '../../global/globalStyles';

export const ChatroomPage = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  margin: -8px;
`;

export const ChatroomSection = styled.section`
  background-color: #F6F6F6;
  display: grid;  
  grid-template-rows: 50px 1fr 65px;
  width: 35vw;
  height: 80vh;
  margin: auto;
  border-radius: 4px;
  
  box-shadow: 0 0 0.5em #36393f;
  position: relative;
`;

export const ChatroomContent = styled.div`
  padding: 1rem;
  overflow: auto;
`;

export const Message = styled.div`
  display: flex;
  
  
  width: 100%;
  margin-bottom: 2rem;
`;

const BasedMessage = styled.span`
  margin-top: 10px;
  padding: 1rem 1rem;
  max-width: 200px;
  word-wrap: break-word;
  border-radius: 0px 32px 32px 32px;
  color: #F6F6F6;
  font-weight: bold;
`;

export const OtherMessage = styled(BasedMessage)`
  background-color: #779b97;
`;

export const OwnMessage = styled(BasedMessage)`
  background-color: #17C3B2;
`;

export const PersonMessage = styled.span`
  font-weight: bold;
  top: 0;
  color: #36393f;
  margin-right: 0.5rem;
`;

export const ChatroomActions = styled.div`
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 72px;
  grid-gap: 1rem;
  border-top: 1px solid #dadada;

  button {
    height: 100%;
  }
`;


export const SendButton = styled(Button)`
  padding: 0.25rem 1rem;
  border-radius: 4px;
`;