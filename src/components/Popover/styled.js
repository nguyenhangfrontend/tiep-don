import styled from 'styled-components';

const getPosition = (positon) => {
	switch (positon) {
		case 'bottom-left':
			return `
				top: calc(100% + 3px);
				left: 0
			`;
		case 'bottom-right':
			return `
				top: calc(100% + 3px);
				right: 0
			`;
		case 'bottom':
			return `
				top: 'calc(100% + 3px);
			`;
		default:
			return `
				top: calc(100% + 3px);
				left: 0;
			`;
	}
};

const Main = styled('div')`
	position: relative;
	
	.popover-main {
		position: relative;
		z-index: 1000;
	}
	
	& .popover-mark {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		background: transparent;
		width: 100%;
		height: 100vh;
	}
	
	& .pop-over-content {
		position: absolute;
		z-index: 1000;
		width: ${({ width }) => width || 'auto'};
		${props => getPosition(props.position)};
	}
`;

export { Main };
