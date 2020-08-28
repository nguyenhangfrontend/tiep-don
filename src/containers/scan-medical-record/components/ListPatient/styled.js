import React from 'react';

import styled from 'styled-components';

export const Main = styled.div`
  .form-search {
    margin-bottom: 20px;
    .inner-search {
      display: flex;
      align-content: flex-end;
      align-items: flex-end;
      justify-content: space-between;
    }
  }
  & .input-content {
    margin: 0 10px;
  }
  & .button-search {
    margin-top: 22px;
  }
  & .button-add-new {
    font-weight: 500;
    min-width: 100px;
  }
  & .label {
    margin-bottom: 10px;
    display: block;
  }
  div[class*='control'] {
    background-color: #fff;
    color: #273237;
    border-color: #273237;
  }
  div[class*='singleValue']{
    color: #273237;
  }
`;
