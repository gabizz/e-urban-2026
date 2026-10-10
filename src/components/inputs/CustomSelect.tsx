import React, { forwardRef } from 'react';
import { Select } from '@mui/material';
import type { SelectProps } from '@mui/material';
import { inputStyles } from './styles';

export const CustomSelect = forwardRef((props: SelectProps<any>, ref: any) => {
  return (
    <Select
      ref={ref}
      size="small"
      {...props}
      sx={[
        inputStyles,
        ...(Array.isArray(props.sx) ? props.sx : [props.sx])
      ]}
    />
  );
}) as <Value = unknown>(
  props: SelectProps<Value> & React.RefAttributes<HTMLSelectElement>
) => React.JSX.Element;

(CustomSelect as any).displayName = 'CustomSelect';
