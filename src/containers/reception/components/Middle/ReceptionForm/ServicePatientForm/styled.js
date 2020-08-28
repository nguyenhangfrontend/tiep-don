import styled from 'styled-components'

export const Main = styled.div`
  padding-right: 10px;
  width: 50%;
  .form-control {
    background-color: ${({theme }) => theme.backgroundPrimary2};
    &:focus {
      background-color: ${({theme }) => theme.backgroundPrimary2};
    }
  }
`