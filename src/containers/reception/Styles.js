// 01DE9BY5ETNB3ZJ3ZTAC9JQBK7
import styled from 'styled-components';

export const WrappedReceived = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  height: 100%;

  .set-service {
    transition: 0.5s ease;
    flex: 1;
    .main-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: ${props => props.theme.whitePrimary};
    }
  }
  .main-content {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`;
