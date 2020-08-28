import React from 'react';
import T from 'prop-types';
import { Checkbox } from './styled';

class CheckBox extends React.Component {
	onChange = (e) => {
		const {value, onChange} = this.props;
		if (onChange) {
			onChange(value ? value : e.target.checked);
		}
	};

	render() {
		const { onChange, ...other } = this.props;

		return (
			<Checkbox type={'checkbox'} onChange={this.onChange} {...other} />
		);
	}
}

CheckBox.defaultProps = {
	value: '',
};

CheckBox.propTypes = {
	onChange: T.func,
};

export default CheckBox;
