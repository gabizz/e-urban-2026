import { forwardRef } from 'react';
import type { TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormContext, Controller } from 'react-hook-form';
import { inputStyles } from './styles';

export const CustomDatePicker = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  const formContext = useFormContext();

  const sxArray = Array.isArray(props.sx) ? props.sx : props.sx ? [props.sx] : [];
  // Min width added to avoid the DatePicker text getting clipped
  const combinedSx = [inputStyles, { minWidth: '160px' }, ...sxArray];

  if (props.name && formContext) {
    return (
      <Controller
        name={props.name}
        control={formContext.control}
        render={({ field }) => (
          <DatePicker
            sx={combinedSx}
            value={field.value ? new Date(field.value) : null}
            onChange={(date) => {
              field.onChange(date ? date.toISOString() : null);
            }}
            inputRef={field.ref}
            slotProps={{
              textField: {
                size: props.size || 'small',
                variant: props.variant || 'outlined',
                fullWidth: props.fullWidth !== undefined ? props.fullWidth : true,
                hiddenLabel: props.hiddenLabel,
                margin: props.margin,
                style: props.style,
                sx: combinedSx,
              }
            }}
          />
        )}
      />
    );
  }

  return (
    <DatePicker
      sx={combinedSx}
      value={props.value ? new Date(props.value as string) : null}
      onChange={(newValue) => {
        if (props.onChange) {
          props.onChange({
            target: { name: props.name, value: newValue ? (newValue as Date).toISOString() : '' }
          } as any);
        }
      }}
      inputRef={ref as any}
      slotProps={{
        textField: {
          size: props.size || 'small',
          variant: props.variant || 'outlined',
          fullWidth: props.fullWidth !== undefined ? props.fullWidth : true,
          hiddenLabel: props.hiddenLabel,
          margin: props.margin,
          style: props.style,
          sx: combinedSx,
        }
      }}
    />
  );
});

CustomDatePicker.displayName = 'CustomDatePicker';
