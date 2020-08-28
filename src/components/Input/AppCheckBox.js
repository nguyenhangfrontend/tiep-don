import React from 'react';
import CheckedIcon from 'resources/svg/checked.svg';
import { CheckBoxC } from './styled';

class CheckBox extends React.PureComponent {
	ocClick = () => {
		const { onChange, checked } = this.props;
		onChange(!checked);
	};

	render() {
		const { checked, children } = this.props;
		return (
			<CheckBoxC checked={checked} onClick={this.ocClick}>
				<div className={'c-check-box'}>
					{checked ? <CheckedIcon /> : ''}
				</div>
				{children}
			</CheckBoxC>
		);
	}
}

export default CheckBox;
