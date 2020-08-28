import styled from 'styled-components';

const Main = styled('div')`
	display: block;
  overflow-x: ${props => props.scrollX ? 'auto' : 'hidden'};
  overflow-y: ${props => props.scrollY ? 'auto' : 'hidden'};
  max-height: ${props => props.scrollY ? `${props.scrollY}px` : 'unset'};
  max-width: ${props => props.scrollX ? `${props.scrollX}px` : '100%'};
  
  &::-webkit-scrollbar {
	  width: 10px;
	  height: 10px;
	  background: rgba(255, 255, 255, 0.11);
	  border-radius: 4px;
	}
	
	&::-webkit-scrollbar-thumb {
	  background: rgba(255, 255, 255, 0.2);
	  position: absolute;
	  left: 0;
	  border-radius: 4px;
  }
`;

export { Main };
