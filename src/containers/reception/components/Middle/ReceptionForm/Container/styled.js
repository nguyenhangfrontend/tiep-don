import styled from 'styled-components';

export const Main = styled.div`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.backgroundPrimary};
  & .label-input {
    display: block;
    width: 100%;
    color: ${({ theme }) => theme.whitePrimary};
    margin-bottom: 8px;
    line-height: 12px;
    margin-top: 6px;
  }
  & .input-content p {
    font-weight: 700;
  }
  & div[class*='col-'] {
    padding: 0 5px;
  }
  & .row {
    margin: 0 -5px;
  }
  & .form-item {
    display: flex;
  }
  & .mr10 {
    margin-right: 10px;
  }
  & .mb10 {
    margin-bottom: 10px;
  }
  & .mb5 {
    margin-bottom: 5px;
  }
  .input-item {
    margin-bottom: 10px;
    .input-content {
      font-weight: 500;
    }
  }
  .more-info {
    margin-top: 10px;
    .more-info--action {
      color: ${({ theme }) => theme.blue2};
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      position: relative;
      &:after {
        content: '\f0d7';
        display: inline-block;
        font-family: FontAwesome;
        font-size: 22px;
        vertical-align: middle;
        margin-left: 8px;
      }
    }
    .more-info--inner {
      padding: 10px;
      border: 1px solid #798083;
      border-radius: 8px;
    }
  }

  & .take-photo {
    padding-top: 85%;
    width: 90%;
    float: right;
    background-size: 100% 100%;
    background-position: center;
    position: relative;
    overflow: hidden;
    border-radius: 7px;
    & .over-lay-captured {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: ${({ theme }) => theme.backgroundModal};
      transform: translateX(-100%);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s;
    }
    &:hover .over-lay-captured {
      transform: translateX(0);
    }
  }
`;
