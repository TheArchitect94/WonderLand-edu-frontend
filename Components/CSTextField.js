import React from 'react';
import { TextField } from '@mui/material';

export default function CSTextField(props) {
  const {
    label,
    onChange,
    value,
    type,
    required,
    helpertext,
    disabled,
    variant,
    size,
    sx,
    placeholder,
    inputProps
  } = props;

  // Helper function to render the file input field
  const renderFileInput = () => {
    return (
      <>
        <label htmlFor={label} style={{ fontSize: '12px', padding: 0, margin: 0 }}>
          {label}
        </label>
        <input
          id={label}
          type="file"
          accept="image/*,.pdf" // Specify accepted file types
          onChange={(e) => onChange(e)} // Pass the event directly to the onChange prop
        />
      </>
    );
  };

  // Helper function to render the regular text input field
  const renderTextInput = () => {
    return (
      <>
        <label htmlFor={label} style={{ fontSize: '12px', padding: 0, margin: 0 }}>
          {label}
        </label>
        <TextField
          id={label}
          disabled={disabled}
          value={value}
          type={type}
          onChange={onChange}
          required={required}
          fullWidth={true}
          helperText={helpertext}
          variant={variant}
          size={size}
          sx={{
            ...sx,
            '& .MuiInputLabel-root': {
              fontSize: '14px',
              textAlign: 'center',
            },
            '& .MuiInputBase-input': {
              fontSize: '12px',
              padding: '8px',
            },
          }}
          placeholder={placeholder}
          inputProps={inputProps}
        />
      </>
    );
  };

  return (
    <div style={{ marginTop: '3px' }}>
      {type === 'file' ? renderFileInput() : renderTextInput()}
    </div>
  );
}
