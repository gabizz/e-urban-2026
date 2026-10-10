import { forwardRef } from 'react';
import type { TextFieldProps } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useFormContext, Controller } from 'react-hook-form';
import { inputStyles } from './styles';

export const CustomDateTimePicker = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  const formContext = useFormContext();

  const sxArray = Array.isArray(props.sx) ? props.sx : props.sx ? [props.sx] : [];
  const combinedSx = [inputStyles, { minWidth: '180px' }, ...sxArray];

  if (props.name && formContext) {
    return (
      <Controller
        name={props.name}
        control={formContext.control}
        render={({ field }) => (
          <DateTimePicker
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
    <DateTimePicker
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

CustomDateTimePicker.displayName = 'CustomDateTimePicker';
