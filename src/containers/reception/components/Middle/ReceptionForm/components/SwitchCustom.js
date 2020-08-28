import React, { memo, useState, useEffect } from 'react';
import { Switch } from 'components/Input';
const SwitchCustom = ({ onChange, offText, onText, value, disabled }) => {
  const [outputValue, setOutputValue] = useState();

  useEffect(() => {
    setOutputValue(value);
    // onChange(value);
  }, [value]);

  const handleChange = output => {
    if (!disabled) {
      let outputValue;
      if (output === true) {
        outputValue = 2;
      } else {
        outputValue = 1;
      }
      setOutputValue(outputValue);
      onChange(outputValue);
    }
  };

  return (
    <Switch
      onText={onText}
      offText={offText}
      className={'switch-insurance'}
      onChange={handleChange}
      active={outputValue === 2}
      disabled={disabled}
    />
  );
};

export default memo(SwitchCustom);
