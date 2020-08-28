import styled from 'styled-components';

const Main = styled('div')`
	border-radius: 4px;
	padding: 3px 6px;
	font-size: 13px;
	border: solid 1px rgba(0, 0, 0, 0.1);
	color: rgba(0, 0, 0, 0.8);
	background-color: ${props => props.theme.whitePrimary};
	position: relative;
	
`;

const Input = styled('input')`
	width: 100%;
	height: 24px;
	background-color: transparent;
	border: none;
	color: rgba(0, 0, 0, 0.8);
	padding: 0;
`;

const Checkbox = styled('input')`
	width: 18px;
	height: 18px;
`;

const SelectStyled = styled('div')`
	height: 24px;
	width: 100%;
	
	.c-select-content {
		width: 100%;
		height: 24px;
		position: relative;
		display: flex;
		align-items: center;
		padding-right: 12px;
		
		& .c-select-icon {
			position: absolute;
			right: 3px;
		}
		
		& .c-select-display {
			position: absolute;
			z-index: 1;
			width: calc(100% - 12px);
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			height: 24px;
			text-align: left;
		}
	}
	
	& .c-select-filter {
		position: relative;
		display: flex;
		align-items: center;
		
		& .c-select-filter-input {
			position: relative;
			z-index: 2;
		}
		
		& .hidden-input {
			opacity: 0;
		}
		
		& .hidden-value {
			opacity: 0.3;
		} 
	}
	
	& .c-select-options {
		position: absolute;
		top: calc(100% + 3px);
		left: 0;
		z-index: 1500;
		max-height: 200px;
		border: solid 1px ${props => props.theme.borderColor};
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		overflow-x: hidden;
		overflow-y: auto;
		background-color: ${props => props.theme.whitePrimary};
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
		
		& .c-select-item {
			border: none;
			white-space: nowrap;
			padding: 3px 6px;
			width: 100%;
			text-align: left;
			border-bottom: solid 1px ${props => props.theme.borderColor};
			transition: color 0.225s;
			background-color: ${props => props.theme.whitePrimary};
		}
		
		& .c-select-item:hover {
			background-color: rgba(0, 0, 0, 0.06);
		}
	}
`;

const Switch = styled('div')`
	height: 36px;
	position: relative;
	border-radius: 16px;
	padding: 3px 12px;
	min-width: 80px;
	background-color: ${props => props.active ? '#21404f' : 'rgba(255, 255, 255, 0.1)'};
	cursor: pointer;
	display: flex;
	align-items: center;
	
	& .c-switch-content {
		width: 100%;
	}
	
	& .c-on-content {
		text-align: left;
	}
	
	& .c-off-content {
		text-align: right;
	}
	
	& .c-switch-control {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		position: absolute;
		transition: all 0.115s ease;
	}
	
	& .c-on-control {
		background-color: #46ace08a;
		right: 0;
		left: auto
	}
	
	& .c-off-control {
		background-color: #fff;
		right: auto;
		left: 0;
	}
`;

const CheckBoxC = styled('div')`
	display: flex;
	align-items: center;
	cursor: pointer;
	
	& .c-check-box {
		width: 22px;
		height: 22px;
		border-radius: 4px;
		border: solid 1px ${props => props.checked ? '#00A9FF' : '#95989A'};
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 6px;
	}
`;

export { Input, SelectStyled, Main, Checkbox, Switch, CheckBoxC };
