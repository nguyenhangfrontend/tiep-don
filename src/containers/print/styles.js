import styled from 'styled-components';

export const PrinterWrapper = styled.div`
  display: ${props => (props.isDefaultScreen ? 'none' : 'block')};
`;

export const SideBarPdf = styled.div`
  background-color: #1a2b33;
  .btn-print.signatures {
    font-size: 13px;
    padding: 6px;
  }
  button.signatures.signed{
    color: #fff;
  }
`;

export const RowSign = styled.ul``;

export const WrapperPdf = styled.div`
  position: relative;
  button {
    position: absolute;
    top: 50%;
    z-index: 1;
    opacity: 0.5;
    margin: 0;
    font-size: 35px;
    &:nth-child(1) {
      left: 0;
      transform: translate(-50%, -50%);
    }
    &:nth-child(3) {
      transform: translate(50%, -50%);
      right: 0;
    }
  }
  &:hover {
    button {
      opacity: 1;
    }
  }
  
`;
