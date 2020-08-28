import React from 'react';
import styled from 'styled-components';
export const Main = styled.ul`
  
  background-color: ${props => props.theme.backgroundBlueLight};
  .pagination {
    display: block;
    background-color: rgba(0, 165, 255, 0.2);
  }

  .pagination > li {
    display: inline-block;
    vertical-align: middle;
  }

  .pagination input.form-control {
    width: 43px;
    border-color: #ddd;
    box-shadow: none;
    border-radius: 0;
    border-left: 0;
    text-align: center;
    height: 35px;
    display: inline-block;
    padding: 0;
  }

  .control-pagination {
    background-color: ${props => props.theme.backgroundBlue};
    color: #ffff;
    font-size: 22px;
    display: block;
  }

  li > span {
    padding: 1px 12px;
  }

  & .input-page {
    input {
      display: inline-block;
      width: 48px;
      text-align: center;
    }

    .total-page {
      vertical-align: middle;
      float: none;
      background: none !important;
      border: none;
      padding-left: 5px;
      color: #000;
    }
  }
`;
