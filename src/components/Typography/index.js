import React from 'react';
import T from 'prop-types';
import { Error, Primary, Success, Warning, Default } from './styled';

const Typography = ({ type, className, children }) => {
	switch (type) {
		case 'error':
			return <Error className={className}>{children}</Error>;
		case 'warning':
			return <Warning className={className}>{children}</Warning>;
		case 'primary':
			return <Primary className={className}>{children}</Primary>;
		case 'success':
			return <Success className={className}>{children}</Success>;
		default:
			return <Default className={className}>{children}</Default>;
	}
};

Typography.defaultProps = {
	className: '',
	type: 'default',
};

Typography.propTypes = {
	className: T.string,
	type: T.oneOf(['error', 'warning', 'primary', 'success', 'default']),
};

export default Typography;
