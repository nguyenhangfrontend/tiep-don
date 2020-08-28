import styled from 'styled-components';

const Main = styled('table')`
	& tbody {
		& tr {
			& td {
				padding: 6px;
				border: solid 1px ${props => props.theme.white3};
			}
		}
		
		& .selected-row {
			background-color: ${({theme}) => theme.blue2};
		}
		
		& .focus-row {
			background-color: ${({ theme }) => theme.white4};
		}
	}
`;

export { Main };
