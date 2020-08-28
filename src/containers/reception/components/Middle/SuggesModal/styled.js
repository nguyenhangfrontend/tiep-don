import styled from 'styled-components';

const Main = styled('div')`
	.modal-popup {
    width: 100%;
    padding: 0;
  }
  tr {
    cursor: pointer;
  }
  .c-modal-content {
    .c-modal-display {
      .c-modal-body {
        padding: 0;
      }
      .c-modal-footer {
        padding: 0;
      }

      .around-radio {
        width: 12px;
        height: 12px;
        border: 1px solid #000;
        display: inline-block;
        border-radius: 100%;
        &.active-item {
          background-color: #03a9f4;
        }
      }
    }
  }
`;

export { Main };
