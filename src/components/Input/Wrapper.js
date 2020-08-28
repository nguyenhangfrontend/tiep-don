import React from 'react';
import { Main } from './styled';

const Wrapper = (props) => (Component) => (
	<Main>
		<Component {...props} />
	</Main>
);

export default Wrapper;
