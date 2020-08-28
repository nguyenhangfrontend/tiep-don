import styled from 'styled-components';

const Main = styled('table')`
	& thead {
		background-color: #386378;
		color: #fff;
		
		& tr {
			& th {
				position: relative;
				padding: 6px;
				border: solid 1px ${props => props.theme.white3};
			}
		}
	}
`;

const ResizeElm = styled('div')`
	position: absolute;
	height: 100%;
	width: 6px;
	background-color: transparent;
	cursor: col-resize;
	top: 0;
	right: -3px;
	border: none;
	z-index: 1;
	
	&:hover {
		background-color: ${({ theme }) => theme.blue};
	}
`;

const SortContain = styled('div')`
	width: 14px;
	cursor: pointer;
	position: absolute;
	z-index: 1;
	top: 6px;
	right: 12px;
	
	& image {
		width: 100%;
	}
`;

export { Main, ResizeElm, SortContain };
