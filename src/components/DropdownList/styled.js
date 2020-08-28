import styled from 'styled-components';

export const Main = styled.ul`
    background-color: #ede7e7;
    position: absolute;
    width: 100%;
    top: 35px;
    border-radius: 3px;
    color: #333;
    z-index: 999;
    box-shadow: 0 0 1px #555;
    max-height: 247px;
    & li {
      padding: 5px 10px;
    }
    & li:hover,
    li.active-item {
      background-color: #b4ec5159;
    }

    & li.active-item {
      background-color: #03a9f44f;
      color: #000;
    }
  
`;
