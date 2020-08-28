import styled from 'styled-components';

const Main = styled('div')`
	display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1100;
  
	& .c-modal-mark {
		position: fixed;
		z-index: 1000;
		background-color: ${props => props.theme.backgroundModal};
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
	}
	
	& .c-modal-content {
		position: fixed;
		z-index: 1100;
		width: ${props => props.width};
		& .c-modal-header {
			padding: 24px;
		}
	}
	& .c-modal-display {
		position: relative;
		background-color: ${props => props.isDark ? props.theme.darkBlue1: props.theme.whitePrimary};
		border-radius: 4px;
		border: 1px solid ${props => props.isDark ? props.theme.whitePrimary: 'transparent'};
	
		
		.c-modal-header {
			border-bottom: solid 1px ${props => props.theme.borderColor};
			padding: 24px;
		}
		
		& .c-modal-body {
			padding: 24px;
		}
		
		& .c-modal-footer {
			padding: 24px;
			border-top: solid 1px ${props => props.theme.borderColor};
		}
		
		& .close-btn {
			position: absolute;
			z-index: 1;
			top: 6px;
			right: 12px;
			
			& svg {
				width: 13px;
				height: 13px;
			}
		}
	}
`;

const ModalConfirm = styled.div`
  & .confirm-header {
  	font-weight: bold;
		font-size: 16px;
		text-align: center;
		color: ${({ theme }) => theme.black};
  }
  
  & .confirm-body {
  	text-align: center;
  	color: ${({ theme }) => theme.black};
  }
  
  & .confirm-action {
  	display: flex;
  	width: 100%;
  	color: ${({ theme }) => theme.black};
  	justify-content: center;
  	
  	& .confirm-btn	{
  		min-width: 84px;
  		margin: 0 12px;
  		text-transform: uppercase;
  	}
  }
`;

export { Main, ModalConfirm };
