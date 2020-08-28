import styled from 'styled-components';

const Main = styled('div')`
	& .book-service-tab {
		
	}
	& .main-info {
		background-color: ${({ theme }) => theme.whitePrimary};
	}
`;

const EditMain = styled('div')`
	position: relative;
	
	&:after {
		content: '';
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(0, 0, 0, 0.4);
		top: 0;
		left: 0;
		z-index: 5;
	}
	
	& .edit-main-content {
		position: relative;
		z-index: 10;
	}
`;

export { Main, EditMain };
