import styled from 'styled-components';

const combineSize = (size) => {
	switch (size) {
		case 'small':
			return 24;
		case 'normal':
			return 30;
		case 'large':
			return 60;
		default:
			return size;
	}
};

const combineType = (radius) => {
	if (radius === 'square') {
		return '4px';
	}

	return '50%';
};

const Main = styled('div')`
	width: ${props => props.width || combineSize(props.size)}px;
	height: ${props => props.height || combineSize(props.size)}px;
	background-image: url("${props => props.url}");
	background-size: 100%;
	border-radius: ${props => combineType(props.radius)};
`;

export { Main };
