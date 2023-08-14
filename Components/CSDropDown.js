import React, { useEffect, useState } from 'react';

export default function CSDropDown(props) {
  const {
    label,
    options,
    valueField,
    displayField,
    required,
    disabled,
    onChange,
    value,
  } = props;

  return (
    <div>
      <label htmlFor="dropdown" style={{ fontSize: '12px' }}>
        {label}
      </label>
      <select
        id="dropdown"
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        style={{
            fontSize: '12px',
            padding: '8px',
            width: '100%',
          }}
      >
        {options.map((option) => (
          <option key={option[valueField]} value={option[valueField]}>
            {option[displayField]}
          </option>
        ))}
      </select>
    </div>
  );
}
