import React from 'react';
import T from 'prop-types';
import { Main } from './styled';

const WrapperContent = (props) => {
	const { children, width } = props;

	return (
		<Main style={{ width }}>{children}</Main>
	)
};

WrapperContent.propTypes = {
	width: T.oneOfType([T.number, T.string]),
};

export default WrapperContent;
