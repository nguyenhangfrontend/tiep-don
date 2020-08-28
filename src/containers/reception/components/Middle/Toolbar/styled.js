import styled from 'styled-components';

const Main = styled('div')`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
	
	& .tool-bar-btn-reception {
		font-size: 14px;
		text-transform: uppercase;
		margin-left: 12px;
		height: 36px;
	}
	
	& .tool-left {
		display: flex;
		align-items: center;
	}
	
	& .icon-plus {
		font-size: 22px;
		font-weight: bold;
	}
`;

export { Main };
