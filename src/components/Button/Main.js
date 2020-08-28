import React from 'react';
import T from 'prop-types';
import { Main } from './styled';

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.buttonRef = null;
	}

	onFocus = () => {
		this.buttonRef.focus();
	};

	render() {
		const { icon, shortKey, children, htmlType, onClick, className, type, events, ...other } = this.props;

		return (
			<Main
				type={htmlType}
				ref={ref => (this.buttonRef = ref)}
				btnType={type}
				className={`${className}`}
				onClick={onClick}
				{...other}
			>
				<div className={'btn-content'}>
					{icon && <span className={'btn-icon'}>{icon}</span>}
					<span>{children}</span>
					{shortKey && <span className={'btn-short-key'}>{shortKey}</span>}
				</div>
			</Main>
		);
	}
}

Button.defaultProps = {
	disabled: false,
	className: '',
	controlKey: '',
	size: 'normal',
	type: 'primary',
	keyCode: 0,
};

Button.propTypes = {
	disabled: T.bool,
	icon: T.oneOfType([T.string, T.node]),
	shortKey: T.string,
	keyCode: T.number,
	controlKey: T.oneOf(['ctrlKey', 'shiftKey', 'altKey', '']),
	className: T.string,
	onClick: T.func,
	size: T.oneOf(['normal', 'large']),
	type: T.oneOf([
		'primary',
		'light-blue',
		'light-pink',
		'light-dark',
		'light-orange',
		'light-green',
		'blue-light',
		'dark-blue',
		'dark-green',
		'transparent',
	]),
};

export default Button;
