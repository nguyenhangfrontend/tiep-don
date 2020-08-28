import React, { memo } from 'react';
import Selects from 'react-select';
import { colourStyles, themeSelect } from './styled';
const SelectCustom = ({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  isClearable,
  showClearIcon,
  displayEmpty,
  type,
  ...other
}) => {
  const handleChange = output => {
    onChange(output ? output.value : '');
  };

  const input = (options && options.find(item => item.value === value)) || null;

  return (
    <Selects
      options={options}
      className="active-dropdown service-dropdown"
      styles={colourStyles}
      inputProps={{
        name: 'selectRole',
        id: 'selectRole',
      }}
      displayEmpty
      placeholder={placeholder}
      value={input}
      onChange={handleChange}
      theme={themeSelect}
      isDisabled={disabled}
      type={type}
      menuShouldBlockScroll
      isClearable={isClearable}
    />
  );
};

export default memo(SelectCustom);
