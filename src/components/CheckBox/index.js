import React from 'react';
import T from 'prop-types';
import CheckedIcon from 'resources/svg/checked.svg';
import CheckedWhiteIcon from 'resources/svg/checked-white.svg';
import { Main } from './styled';

class CheckBox extends React.PureComponent {
	onChange = (e) => {
		
		const { onChange, valueExport } = this.props;
		if (onChange) {
			onChange(valueExport ? e.target.value : e.target.checked);
		}
	};

	getContain = (type) => {
		switch (type) {
			case 'gray':
				return (
					<div className="check-mark gray-check-mark">
						<div className={'checked-mark'}>
							<CheckedWhiteIcon />
						</div>
					</div>
				);
			case 'dark':
				return (
					<div className="check-mark dark-check-mark">
						<div className={'checked-mark'}>
							<CheckedWhiteIcon />
						</div>
					</div>
				);
			case 'pink':
				return (
					<div className="check-mark pink-check-mark">
						<div className={'checked-mark'}>
							<CheckedWhiteIcon />
						</div>
					</div>
				);
			default:
				return (
					<div className="check-mark transparent-check-mark">
						<div className={'checked-mark'}>
							<CheckedIcon />
						</div>
					</div>
				);
		}
	};

	render() {
		const { checked, children, size, type, className, onChange, ...other } = this.props;

		return (
			<Main size={size} className={className}>
				<input onChange={this.onChange} type="checkbox" checked={checked} {...other} />
				{this.getContain(type)}
				<div className={'check-box-label'}>{children}</div>
			</Main>
		);
	}
}

CheckBox.defaultProps = {
	className: '',
	size: 22,
	checked: false,
	valueExport: false,
};

CheckBox.propTypes = {
	size: T.number,
	checked: T.bool,
	valueExport: T.bool,
	value: T.any,
	className: T.string,
	type: T.oneOf(['transparent', 'pink', 'dark', 'gray'])
};

export default CheckBox;
