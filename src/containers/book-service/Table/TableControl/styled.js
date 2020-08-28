import styled from 'styled-components';

const Main = styled('div')`
	& .focus {}
	
	& .table-footer {
		padding: 10px 24px;
		color: ${({ theme }) => theme.blue};
		font-style: italic;
		background-color: ${({ theme }) => theme.background};
		text-align: left;
	}
`;

export { Main };
