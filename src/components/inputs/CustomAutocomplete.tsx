import React, { forwardRef } from 'react';
import { Autocomplete } from '@mui/material';
import type { AutocompleteProps } from '@mui/material';
import { inputStyles } from './styles';

export const CustomAutocomplete = forwardRef((props: AutocompleteProps<any, any, any, any>, ref: any) => {
  return (
    <Autocomplete
      ref={ref}
      size="small"
      {...props}
      sx={[
        inputStyles,
        ...(Array.isArray(props.sx) ? props.sx : [props.sx])
      ]}
    />
  );
}) as <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>(
  props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> & React.RefAttributes<HTMLDivElement>
) => React.JSX.Element;

(CustomAutocomplete as any).displayName = 'CustomAutocomplete';
