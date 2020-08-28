import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  &&&& {
    body {
    color: ${({ theme }) => theme.whitePrimary} !important;
    position: relative;
    font-family: ${({ theme }) => theme.fontPrimary} !important;
    font-size: 14px !important;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    color: #fff;
    line-height: 1.75;
    background-color: ${({ theme })=> theme.backgroundMain} !important;
  }
 .input-content {
   position: relative;
 }

  .pointer {
    cursor: pointer;
  }
  
  .icon-btn {
	  background: none;
	  padding: 0;
	  border: none;
	}
	
  .flex-1 {
    flex: 1;
  }
  }
`;

export default GlobalStyle;
