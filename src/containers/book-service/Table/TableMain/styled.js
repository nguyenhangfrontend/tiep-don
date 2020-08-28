import styled from 'styled-components';

const Main = styled('div')`
	& .limit-size {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	& td {
		height: 37px;
		background-color: white;
	}
`;

export { Main };
