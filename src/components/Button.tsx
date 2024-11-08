import React from 'react';
import { styled } from '@emotion/styled';
import Button from '@mui/material/Button';

interface ButtonProps {
  text: string;
  variant: 'primary' | 'secondary';
  onClick: () => void;
}

const StyledButton = styled(Button)`
  &.MuiButton-root {
    ${({ variant }) => {
      if (variant === 'primary') {
        return `
          background-color: #007bff;
          color: #fff;
        `;
      } else if (variant === 'secondary') {
        return `
          background-color: #6c757d;
          color: #fff;
        `;
      }
    }}
  }
`;

const Button: React.FC<ButtonProps> = ({ text, variant, onClick }) => {
  return (
    <StyledButton variant={variant} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;