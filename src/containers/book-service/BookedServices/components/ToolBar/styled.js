import styled from 'styled-components';

const Main = styled('div')`
	display: flex;
	align-items: center;
	padding: 6px;
	justify-content: space-between;
	
	& .tool-group-left {
		display: flex;
	}
	
	.book-bar-btn {
		margin: 6px;
		font-weight: bold;
	}
`;

export { Main };
