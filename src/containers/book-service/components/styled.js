import styled from 'styled-components';

const Main = styled('div')`
	& .error-title {
		font-size: 16px;
		color: ${props => props.theme.red};
		font-weight: 600;
		margin-bottom: 12px;
		text-transform: uppercase;
		text-align: left;
	}
	
	& .errors-list {
		color: ${props => props.theme.black};
		font-size: 14px;
		
		& .error-line {	
			margin-bottom: 6px;
			text-align: left;
			display: flex;
			
			& .error-icon {
				margin-right: 12px;
			}
			
			& .service-code {
				font-weight: 600;
				color: ${props => props.theme.black};
				min-width: 120px;
			}
			
			& .error-message {
				color: ${props => props.theme.red};
				text-align: left;
			}
		}
	}
`;

const Header = styled('div')`
	font-size: 16px;
	color: ${props => props.theme.blue};
	font-weight: 600;
	text-transform: uppercase;
	text-align: left;
`;

const Footer = styled('div')`
	display: flex;
	justify-content: center;
	
	& .repeat-btn {
		border-radius: 16px;
		padding: 12px 24px;
		background-color: ${props => props.theme.blue};
		color: ${props => props.theme.whitePrimary};
		font-size: 14px;
		text-transform: uppercase;
	}
`;

export { Main, Header, Footer };
