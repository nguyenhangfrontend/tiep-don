import styled from 'styled-components';

export const Main = styled.div`
  margin-bottom: 10px;
  .info-action {
    .number-label {
      font-size: 24px;
      color: #fff;
      line-height: 24px;
      margin-right: 15px;
      vertical-align: middle;
      padding-top: 7px;
    }
    .label-bn {
      font-size: 37px;
      color: ${({theme}) => theme.green};
      font-weight: 500;
      display: inline-block;
      vertical-align: middle;
      line-height: 39px;
    }
  }
  .head-main-left{
    display: flex;
    justify-content: space-between;
  }
  .head-main-right{
    display: flex;
    justify-content: flex-end;
  }
  
`;
