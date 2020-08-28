import React from 'react';
import T from 'prop-types';
import { Main } from './styled';

class Avatar extends React.PureComponent {
	render() {
		const { url, size, type, ...other } = this.props;

		return (
			<Main url={url} size={size} radius={type} {...other}>
			</Main>
		);
	}
}

Avatar.defaultProps = {
	url: '',
	size: 'normal',
	type: 'square',
};

Avatar.propTypes = {
	url: T.string,
	height: T.number,
	width: T.number,
	size: T.oneOfType([T.number, T.oneOf(['small', 'normal', 'large'])]),
	type: T.oneOf(['circle', 'square'])
};

export default Avatar;
