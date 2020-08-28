import styled from 'styled-components';

export const Main = styled.div`
  padding: 10px;
  background-color: ${({ theme }) => theme.backgroundPrimary2};
  width: 50%;
  & .head--insurance-form {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .switch-insurance {
      width: 150px;
    }
  }
  .form-control{
    background-color: ${({ theme }) => theme.backgroundPrimary};
    &:focus {
      background-color: ${({theme }) => theme.backgroundPrimary};
    }
  }
  .check-box-label {
    max-width: 200px;
  }
`;
