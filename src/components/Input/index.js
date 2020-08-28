import SelectCustom from './Select';
import InputCustom from './Input';
import InputNumberCustom from './InputNumber';
import Wrapper from './Wrapper';

export { default as Switch } from './Switch';
export { default as Checkbox } from './CheckBox';
export { default as CheckboxC } from './AppCheckBox';

const Input = (props) => Wrapper(props)(InputCustom);
const Select = (props) => Wrapper(props)(SelectCustom);
const InputNumber = (props) => Wrapper(props)(InputNumberCustom);


export { Select, Input, InputNumber };
