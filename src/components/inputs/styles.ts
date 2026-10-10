import type { Theme, SxProps } from '@mui/material/styles';

export const inputStyles: SxProps<Theme> = {
  // Base overrides for the input container
  '& .MuiInputBase-root, & .MuiPickersInputBase-root': {
    fontSize: '0.75rem', // Make it noticeably smaller (12px)
    borderRadius: '6px',
    minHeight: '28px', // Force a smaller minimum height
    backgroundColor: '#f0f7ff',
  },
  // Ensure the actual input element has smaller padding
  '& .MuiInputBase-input, & .MuiPickersInputBase-input': {
    padding: '4px 8px !important', 
    height: 'auto',
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.75rem',
  },
  // Specific overrides for filled variant (which the forms are using)
  '& .MuiFilledInput-root, & .MuiPickersFilledInput-root': {
    borderRadius: '6px',
    border: '1px solid #bfdbfe',
    backgroundColor: '#f0f7ff !important',
    overflow: 'hidden', // to respect border radius
    // Remove the default MUI underline
    '&:before, &:after': {
      display: 'none',
    },
    '&:hover': {
      backgroundColor: '#e0effe !important',
      borderColor: '#93c5fd',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff !important',
      borderColor: '#2563eb',
      boxShadow: '0 0 0 1px #2563eb',
    }
  },
  // Specific overrides for outlined variant
  '& .MuiOutlinedInput-root, & .MuiPickersOutlinedInput-root': {
    borderRadius: '6px',
    backgroundColor: '#f0f7ff',
    '& fieldset': {
      borderColor: '#bfdbfe',
    },
    '&:hover fieldset': {
      borderColor: '#93c5fd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2563eb',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
    }
  },
  // Force the padding inside the filled input to be small (it's normally huge)
  '& .MuiFilledInput-input, & .MuiPickersFilledInput-input, & .MuiPickersInputBase-sectionsContainer': {
    padding: '4px 8px !important',
  },
  // Autocomplete specifics - don't override root padding entirely to keep adornments
  '& .MuiAutocomplete-inputRoot': {
    paddingTop: '2px !important',
    paddingBottom: '2px !important',
    paddingLeft: '4px !important',
    backgroundColor: '#f0f7ff',
  },
  '& .MuiAutocomplete-input': {
    padding: '0 4px !important',
  },
  // Multiline specific
  '& .MuiInputBase-multiline': {
    padding: '4px !important',
  },

  // --- Print Styles: No input boxes, high weight bold text ---
  '@media print': {
    '&.MuiFormControl-root, & .MuiFormControl-root': {
      margin: '0 !important',
      padding: '0 !important',
      width: '100% !important',
    },
    '& .MuiInputBase-root, &.MuiInputBase-root, & .MuiFilledInput-root, &.MuiFilledInput-root, & .MuiOutlinedInput-root, &.MuiOutlinedInput-root, & .MuiPickersInputBase-root, &.MuiPickersInputBase-root, & .MuiPickersFilledInput-root, &.MuiPickersFilledInput-root': {
      backgroundColor: 'transparent !important',
      background: 'transparent !important',
      border: 'none !important',
      boxShadow: 'none !important',
      borderRadius: '0 !important',
      padding: '0 !important',
      minHeight: 'unset !important',
      height: 'auto !important',
      '&:before, &:after': {
        display: 'none !important',
      },
    },
    '& fieldset, & .MuiOutlinedInput-notchedOutline': {
      display: 'none !important',
      border: 'none !important',
    },
    '& .MuiInputBase-input, & .MuiFilledInput-input, & .MuiOutlinedInput-input, & .MuiPickersInputBase-input, & .MuiPickersFilledInput-input, & .MuiPickersInputBase-sectionsContainer, & textarea': {
      fontWeight: '900 !important', // Very high weight text
      color: '#000000 !important',
      WebkitTextFillColor: '#000000 !important',
      backgroundColor: 'transparent !important',
      background: 'transparent !important',
      padding: '2px 0 !important',
      margin: '0 !important',
      border: 'none !important',
      boxShadow: 'none !important',
      lineHeight: '1.3 !important',
      fontSize: '13px !important',
    },
    '& .MuiInputLabel-root': {
      display: 'none !important',
    },
    '& .MuiAutocomplete-endAdornment, & .MuiSelect-icon, & .MuiInputAdornment-root': {
      display: 'none !important',
    },
  },
};
