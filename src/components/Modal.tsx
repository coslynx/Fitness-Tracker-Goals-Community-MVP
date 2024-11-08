import React from 'react';
import { styled } from '@emotion/styled';
import Modal from '@mui/material/Modal';
import { ModalProps } from '../types';

const StyledModal = styled(Modal)`
  .MuiModal-root {
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .MuiPaper-root {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
  }
`;

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <StyledModal open={open} onClose={onClose}>
      <div>{children}</div>
    </StyledModal>
  );
};

export default Modal;