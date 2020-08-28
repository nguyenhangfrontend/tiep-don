import React from 'react';
import T from 'prop-types';
import { Main } from './styled';

const ScrollWrapper = ({ scrollX, scrollY, children, className }) => (
	<Main className={className} scrollY={scrollY} scrollX={scrollX}>
		<div>
			{children}
		</div>
	</Main>
);

ScrollWrapper.defaultProps = {
	className: '',
	scrollY: null,
	scrollX: null,
};

ScrollWrapper.propTypes = {
	scrollY: T.number,
	scrollX: T.number,
	className: T.string,
};

export default ScrollWrapper;
