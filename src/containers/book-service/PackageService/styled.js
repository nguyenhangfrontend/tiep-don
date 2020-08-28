import styled from 'styled-components';

const Main = styled('div')`
	display: flex;
	background-color: ${props => props.theme.backgroundColor};
	
	& .package-list {
		width: 240px;
		overflow-y: auto;
		
		.package-head {
			padding: 12px;
			color: ${props => props.theme.blue};
			text-transform: uppercase;
			font-weight: 600;
			text-align: left;
			font-size: 16px;
		}
		
		& .package-item {
			display: flex;
			padding: 12px;
			color: ${props => props.theme.black};
			cursor: pointer;
			font-size: 14px;
			
			& .package-item-icon {
				width: 18px;
				margin-right: 6px;
			}
			
			& .package-item-name {
				text-align: left;
			}
		}
		
		& .item-active {
			background-color: rgba(12, 137, 203, 0.41);
		}
	}
	
	& .package-service {
		width: 905px;
		overflow-y: hidden;
	}
`;

export { Main };
