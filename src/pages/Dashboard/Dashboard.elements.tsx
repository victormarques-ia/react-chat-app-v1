import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Join } from '../../global/globalStyles';

interface MenuButtonProps extends React.DetailsHTMLAttributes<HTMLAttributes<HTMLButtonElement>>{
  active?: boolean;
}


export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MenuButtons = styled(Buttons)`
  border-top: 1px solid #dadada;
  justify-content: space-evenly;
  padding: 1rem 0;
`;

export const MenuBuntton = styled.button<MenuButtonProps>`
  color: ${({ active }) => (active ? '#cacaca' : '#9d4edd')};
  background-color: #f6f6f6;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    border-bottom: ${({ active }) => (active ? '1px solid #9d4edd' : 'none')};
  }
`;

export const DeleteButton = styled(Join)`
  background-color: #dc3545;
  margin-left: 1rem;
`;