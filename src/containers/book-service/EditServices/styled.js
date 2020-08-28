import styled from 'styled-components';

const Main = styled('div')`
	background-color: ${props => props.theme.whitePrimary};
	position: relative;
	
	& .value-row {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
		& .service-code {
			font-weight: bold;
		}
	}
	
	& .edit-table-wrap {
		overflow-y: hidden;
	}
`;

const Header = styled('div')`
	display: flex;
	justify-content: space-between;
	
	& .edit-popup-header {
		width: 50%;
	}
	
	.errors-display {
		display: flex;
	}
	
	& .error_service {
		font-weight: bold;
	  color:#000;
	  white-space: nowrap;
	}
	
	& .error_message {
		color:red;
    margin-left: 10px;
    text-align: left;
	}
	
	& .title-popup {
		color: #000;
		margin-bottom: 12px;
		
		& .title-icon {
			margin-right: 12px;
			
			& svg {
			  width: 40px;
				height: 50px;
			}
		}
		
		& .title-message {
			font-size: 24px;
			font-weight: 600;
		}
	}
`;

const Footer = styled('div')`
	display: flex;
	justify-content: space-between;
	color: black;
	
	& .save-btn {
		background: #538200;
		border-radius: 6px;
		padding: 8px 6px;
		color: ${props => props.theme.whitePrimary};
		line-height: 1;
		text-transform: uppercase;
		font-size: 14px;
		
		& img {
			margin-right: 6px;
			width: 20px;
		}
		
		& > .last-text {
			margin-left: 6px;
			color: rgba(255, 255, 255, 0.32);
		}
	}
`;

export { Main, Header, Footer };
