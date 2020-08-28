import styled from 'styled-components';

const Header = styled('div')`

	& .app-logo {
		display: flex;
		align-items: center;
		
		& svg {
			width: 100%;
		}
	}
	
	& .app-menu {
		display: flex;
		align-items: center;
		height: 100%;
		
		& .app-menu-item {
			color: ${props => props.theme.whitePrimary};
			display: block;
			padding: 6px 12px;
			text-transform: uppercase;
			
		}
		
		& .active {
			border-bottom: solid 2px ${props => props.theme.blue};
		}
	}
	
	& .app-menu-right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-top: 6px;
		padding-bottom: 6px;
		
		& .hospital-name {
			text-transform: uppercase;
			font-size: 16px;
		}
		
		& .info-user {
			display: flex;
			align-items: center;
			
			& .user-info-item {
				margin: 6px 12px;
			}
			
			& .menu-user {
				padding: 6px 12px;
				background-color: ${props => props.theme.whitePrimary};
				color: ${props => props.theme.black};
				cursor: pointer;
				white-space: nowrap;
				border-radius: 4px;	
			}
			
			& .menu-user:hover {
				background-color: ${props => props.theme.whitePrimary};
			}
		}
	}
`;

const Footer = styled('div')`
	padding-top: 12px;
	padding-bottom: 12px;
  text-align: center;
  background-color: #46ace00f;
`;

export { Header, Footer };
