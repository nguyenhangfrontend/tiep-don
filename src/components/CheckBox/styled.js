import styled from 'styled-components';

const Main = styled('label')`
	display: flex;
	align-items: center;
  position: relative;
  cursor: pointer;
  padding-left: ${props => props.size + 6}px;
  user-select: none;
  margin-bottom: unset;
  
  & input {
  	position: absolute;
	  opacity: 0;
	  cursor: pointer;
	  height: 0;
	  width: 0;
  }
  
  & .check-mark {
  	position: absolute;
	  top: 0;
	  left: 0;
	  height: ${props => props.size}px;
	  width: ${props => props.size}px;
	  display: block;
	  border-radius: 4px;
	  
	  & .checked-mark {
			display: none;
			align-items: center;
			height: 100%;
			justify-content: center;
		}
  }
  
  & input:checked ~ .check-mark {
  	& .checked-mark {
			display: flex;
		}
  }
  
  & .transparent-check-mark {
  	background: transparent;
  	border: solid 1px ${props => props.theme.white3};
  }
	
	& .pink-check-mark {
		background-color: ${props => props.theme.whitePrimary};
		border: solid 1px ${props => props.theme.dark};
	}
	
	& .gray-check-mark {
		background-color: ${props => props.theme.white4};
	}
	
	& .dark-check-mark {
		background-color: ${props => props.theme.whitePrimary};
		border: solid 1px ${props => props.theme.dark};
	}
	
	& input:checked ~ .transparent-check-mark {
		border: solid 1px ${props => props.theme.blue4};
	}
	
	& input:checked ~ .pink-check-mark {
		background-color: ${props => props.theme.pink};
		border: ${props => props.theme.pink};
	}
	
	& input:checked ~ .dark-check-mark {
		background-color: ${props => props.theme.dark};
		border: ${props => props.theme.pink};
	}
	
	& input:checked ~ .gray-check-mark {
		background-color: ${props => props.theme.dark};
		border: ${props => props.theme.dark};
	}
	
	&:hover .transparent-check-mark {
	  border: solid 1px ${props => props.theme.blue4};
	}
	
	&:hover .pink-check-mark {
	  border: solid 1px ${props => props.theme.dark};
	}
	
	&:hover .gray-check-mark {
	}
	
	&:hover .dark-check-mark {
	
	  border: solid 1px ${props => props.theme.dark};
	}
`;

export { Main };
