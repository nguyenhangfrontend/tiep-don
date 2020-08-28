import styled from 'styled-components';

const Main = styled('div')`
	position: relative;
	color: #1a2b33;
	border-bottom-right-radius: 6px;
	border-bottom-left-radius: 6px;
	
	& .t-fixed-head {
		position: sticky;
		top: 0;
		z-index: 10;
	}
	
	& .tb-content {
		height: calc(100% - 16px);
	}
	
	& .t-main {
		height: 400px;
		overflow: auto;
	}
	
	&::-webkit-scrollbar {
		width: 16px;
	}
	
	& .t-fix-left {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 11;
		overflow-y: auto;
		overflow-x: hidden;
		height: calc(100% - 16px);
	}
	
	& .t-fix-left::-webkit-scrollbar {
		display: none;
	}
`;

export { Main };
