import React, { memo, useState, useImperativeHandle } from 'react';
import { Main } from './styled';
import T from 'prop-types';
import { rules as commonRules } from 'containers/reception/components/Middle/ReceptionForm/utils';

const FormItem = (props, ref) => {
  const [error, setError] = useState('');
  const {
    label,
    require,
    requireAfter,
    value,
    placeholder,
    onChange,
    initialValue,
    fieldKey,
    onBlur,
    onKeyDown,
    inputComponent,
    options,
    className,
    disabled,
    rules,
    selectAddress,
  } = props;

  const validate = (output) => {
    if (!rules) {
      return '';
    }

    const valueCheck = fieldKey === 'birthday' ? output.str : output;
    const message = rules
      .map(item =>
        commonRules[item.rule]
          ? commonRules[item.rule].func(
              valueCheck,
              { length: 60 },
              item.message,
            )
          : '',
      )
      .find(mes => !!mes);

    if (message) {
      setError(message);
    } else {
      setError('');
    }

    return message;
  };
  const onFieldChange = output => {
    validate(output);
    if(onChange){
      onChange(output);
    }
    
  };

  useImperativeHandle(ref, () => ({
    validate,
    setError,
  }));

  return (
    <Main className={className}>
      <span className={`label-input ${require ? 'color-red' : ''}`}>
        {label} {requireAfter && '*'}
      </span>
      <div className="input-content">
        {React.createElement(inputComponent, {
          value,
          placeholder,
          onChange: onFieldChange,
          onBlur,
          onKeyDown,
          selectAddress,
          options,
          disabled,
          initialValue,
          className: 'form-control active-element',
        })}
      </div>
      {error && <span className="error-input">{error}</span>}
    </Main>
  );
};

FormItem.defaultProps = {
  label: '',
  error: '',
  require: false,
  onValidate: false,
  disabled: false,
  placeholder: '',
  onChange: () => {},
  onBlur: () => {},
  onKeyDown: () => {},
  selectAddress: () => {},
  inputComponent: null,
  options: [],
  rules: [],
  className: '',
};

FormItem.propTypes = {
  label: T.oneOfType([T.string, T.node]),
  error: T.string,
  require: T.bool,
  onValidate: T.bool,
  disabled: T.bool,
  value: T.any,
  placeholder: T.string,
  onChange: T.func,
  onBlur: T.func,
  onKeyDown: T.func,
  selectAddress: T.func,
  inputComponent: T.node,
  options: T.array,
  rules: T.arrayOf(T.shape({})),
  className: T.string,
};

export default memo(React.forwardRef(FormItem));
