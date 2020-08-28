import React, {memo} from 'react';


const Select = ( props ) => {
  const {onChange, options, ...other} = props
  const onFieldChange = (e) => {
    onChange(e.target.value)
  };
  return (
  <select className="form-control active-element" {...other} onChange={onFieldChange}>
    {options.map(item => (
      <option value={item.value} key={item.key}>
        {item.name}
      </option>
    ))}
  </select>
)}
export default memo(Select)