import styled from 'styled-components';

const Main = styled('div')`
	position: relative;
	padding: 6px;
	background-color: ${props => props.theme.blue3};
	border-top-right-radius: 6px;
	border-top-left-radius: 6px;
	color: ${props => props.theme.whitePrimary};
	margin-bottom: 24px;
	
	& .info-expend-btn {
		position: absolute;
		z-index: 1;
		right: 0;
		bottom: 0;
		padding: 3px;
		background-color: rgba(99,177,216,.9);
		border-top-left-radius: 4px;
		
		& svg {
			width: 18px;
			height: 18px;
		}
	}
	
	& .info-name {
		font-size: 16px;
		font-weight: bold;
	}
	
	& .green-line {
		color: ${props => props.theme.green};
	}
	
	& .info-box-top {
		padding-bottom: 24px;
	}
	
	& .info-box-bottom {
		padding-top: 12px;
	}
	
	& .left-box {
		border-right: solid 1px ${props => props.theme.white5};
	}
	
	& .box-border {
		border-top: solid 1px ${props => props.theme.white5};
	}
	
	& .info-row:last-child {
		padding-bottom: unset;
		padding-top: 12px;
	}
	
	& .info-action-btn {
		width: 100%;
		background-color: ${props => props.theme.background3};
		padding: 6px;
		margin-bottom: 6px;
		font-size: 12px;
	}
	
	& .info-group-check-box {
		margin-top: 12px;
		
		& .check-box-item {
			margin-bottom: 6px;
			margin-right: 6px;
		}
	}
	
	& .info-left-group {
		display: flex;
	}
`;

export { Main };
