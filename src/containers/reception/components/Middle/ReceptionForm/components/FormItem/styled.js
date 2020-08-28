import styled from 'styled-components';

export const Main = styled.div`
  & .form-control {
   
    border-color: transparent;
    box-shadow: none;
    color: ${({theme }) => theme.whitePrimary};
    height: 32px;
    &:focus{
      outline: none;
      border-color: ${({theme }) => theme.white2};
      box-shadow: none;
      color: ${({theme }) => theme.whitePrimary}
    }
    &:disabled {
      background-color: ${({ theme })=> theme['white-blur']};
    }
  }
  & .color-red{
    color: #ff5579;
  }
`;
