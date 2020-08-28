import React from 'react';
import T from 'prop-types';
import { Input } from './styled';

class InputCustom extends React.Component {
	constructor(props) {
		super(props);
		this.node = null;
		this.state = {
			localValue: props.value,
			defaultValue: props.defaultValue
		};
	}

	componentDidMount() {
		this.node.value = this.state.defaultValue;
	}

	onChange = (e) => {
		const output = e.target.value;
		const { onChange } = this.props;
		onChange ? onChange(output) : this.setState({ localValue: output })
	};

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
				ref={node => this.node = node}
				type="number"
				value={onChange ? value : localValue}
				onChange={this.onChange}
				onFocus={this.onFocus}
			/>
		)
	}
}

InputCustom.defaultProps = {
	value: 0,
	onFocus: () => {}
};

InputCustom.propTypes = {
	value: T.number,
	defaultValue: T.number,
	onChange: T.func,
	onFocus: T.func,
};

export default InputCustom;
