import styled from 'styled-components';

const Main = styled('div')`
	width: 100%;
	
	& .row-item {
		display: flex;
		cursor: pointer;
		position: relative;
		align-items: center;
		padding-left: 12px;
		color: ${props => props.theme.whitePrimary};
	
		& .selected-icon {
			position: absolute;
			left: 0;
			display: none;
		}
		
		& .col-sequence-no {
			width: 15%;
		}
		
		& .col-name {
			width: 45%;
			overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
		}
		
		& .col-age {
			width: 20%;
		}
		
		& .col-counter-name {
			width: 20%;
		}
		
		& .col-item {
			padding: 6px;
		}
	}
	
	& .row-active {
		background-color: ${props => props.theme.blue};
		padding-top: 6px;
		padding-bottom: 6px;
		
		& .selected-icon {
			display: block;
		}
	}
	
	& .row-item:hover {
		background-color: rgba(70,172,224,.22);
		
		& .col-name {
			color: ${props => props.theme.blue};
		}
	}
	
	& .row-active:hover {
		background-color: ${props => props.theme.blue};
		
		& .col-name {
			color: ${props => props.theme.white};
		}
	}
`;

const Empty = styled('div')`
	padding: 24px;
`;

export { Main, Empty };
