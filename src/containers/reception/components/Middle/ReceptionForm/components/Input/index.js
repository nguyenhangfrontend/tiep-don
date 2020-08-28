import React, { memo } from 'react';

const Input = props => {
  const { onChange, initialValue, value, onKeyDown, ...other} = props;
  const onFieldChange = (e) => {
    onChange(e.target.value)
  };

  const handleKeyDOwn = (e) => {
    if(e.key === 'Tab' || e.key === 'Enter'){
      if(onKeyDown){
        onKeyDown(e)
      }
      
    }
  }

  return (
    <input onKeyDown={handleKeyDOwn} onChange={onFieldChange} value={value} {...other} />
  )
} ;

export default memo(Input)