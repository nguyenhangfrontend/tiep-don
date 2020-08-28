import styled from 'styled-components';

const Main = styled('div')`
	display: flex;
	justify-content: space-between;
	align-items: center;
	
	& .c-select-door {
		width: 120px;
		border: none;
	}
`;

const Placeholder = styled('div')`
	color: #00A9FF;
	font-weight: bold;
	font-size: 16px;
`;

export { Main, Placeholder };
