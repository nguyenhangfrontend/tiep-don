import { isEmpty } from "redux-actions/lib/utils/isEmpty";
import styled from 'styled-components';
import Empty from 'resources/images/empty.png';

const Main = styled('div')`
	height: 436px;
	background-image: url(${({ isEmpty }) => isEmpty ? Empty : ''});
	background-repeat: no-repeat;
	background-size: 30%;
	background-position: center;
	position: relative;
	border: solid 1px;
	background-color: ${({ theme, isEmpty }) => isEmpty ? theme.background : theme.whitePrimary};
	
	.empty-message {
		color: ${({ theme }) => theme.white};
		font-style: italic;
		font-size: 14px;
		opacity: 0.6;
		position: absolute;
		z-index: 1;
		left: 50%;
		top: 50%;
		transform: translate(-90px, 90px);
	}

	& .service-action-col {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	& .sequence-group-no {
		border-right: unset;
		font-weight: 600;
		color: ${({ theme }) => theme.black};
		
		& svg {
		  cursor: pointer;
			margin-left: 6px;
		}
	}
	
	& .select-all-col {
		display: flex;
		
		& .group-service-icon {
			cursor: pointer;
			margin-left: 12px;
			width: 22px;
			height: 22px;
		}
	}
`;

export { Main };
