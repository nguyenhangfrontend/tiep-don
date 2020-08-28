import React from 'react';

import styled from 'styled-components';

export const Main = styled.tbody`
  background: #fff;
  & .tr-row {
    cursor: pointer;
    &.active-item{
    background-color: ${({theme }) => theme.backgroundBlueLight};
    }
    &:hover {
      background-color: ${({theme }) => theme.backgroundGreenLight};
    }
  }
`;
