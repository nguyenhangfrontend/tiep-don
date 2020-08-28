import React from 'react';
import T from 'prop-types';
import { Input } from './styled';

class InputCustom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			localValue: props.value,
		};
	}

	onChange = (e) => {
		const output = e.target.value;
		const { onChange } = this.props;
		onChange ? onChange(output) : this.setState({ localValue: output })
	};
	onKeyDown = (e) => {
		const { onKeyDown } = this.props
		if((e.key === 'Tab' || e.key === 'Enter') && onKeyDown){
			
			onKeyDown(e)
		}
		
	}
	onFocus = () => {
		const { onFocus } = this.props;
		onFocus();
	};

	render() {
		const { localValue } = this.state;
		const { value, onChange, ...other } = this.props;

		return (
			<Input
				{...other}
				type="text"
				value={onChange ? value : localValue}
				onChange={this.onChange}
				onFocus={this.onFocus}
				onKeyDown={this.onKeyDown}
			/>
		)
	}
}

InputCustom.defaultProps = {
	value: '',
	onFocus: () => {}
};

InputCustom.propTypes = {
	value: T.string,
	onChange: T.func,
	onFocus: T.func,
};

export default InputCustom;
