import styled from 'styled-components';

const Main = styled.div`
  & .select-user-info {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 30px 48px 0 48px;
  }

  & .select-service-toolbar {
    background-color: ${props => props.theme.whitePrimary};
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    margin-top: 15px;
    display: flex;
  }
`;

const ActionFillter = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 6px;
  background: #fff;
  .button {
    width: 160px;
    height: 46px;
    background: rgba(0, 0, 0, 0.06);
    color: #000000;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    display: inline-flex;
    margin-right: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    &.active {
      background: #538200;
      opacity: 0.84;
      color: #fff;
      border-radius: none;
    }
    img {
      width: 20px;
      margin-right: 5px;
    }
  }
  .form-control {
    flex: 1;
  }
`;

export { Main, ActionFillter };
