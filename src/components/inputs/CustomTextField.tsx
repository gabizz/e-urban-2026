import { forwardRef } from 'react';
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { inputStyles } from './styles';

export const CustomTextField = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  return (
    <TextField
      ref={ref}
      size="small"
      {...props}
      sx={[
        inputStyles,
        ...(Array.isArray(props.sx) ? props.sx : props.sx ? [props.sx] : [])
      ]}
    />
  );
});

CustomTextField.displayName = 'CustomTextField';
