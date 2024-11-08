import React from 'react';
import { styled } from '@emotion/styled';
import TextField from '@mui/material/TextField';

interface InputProps {
  type: 'text' | 'email' | 'password';
  label: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledTextField = styled(TextField)`
  && .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #007bff;
    }
  }
`;

const Input: React.FC<InputProps> = ({ type, label, placeholder, value, onChange }) => {
  return (
    <StyledTextField
      type={type}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      variant="outlined"
    />
  );
};

export default Input;