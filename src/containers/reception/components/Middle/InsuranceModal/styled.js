import styled from 'styled-components';

const Main = styled('div')`
	.c-modal-content {
    .c-modal-display {
      & .mokup-title {
        text-align: center;
        font-size: 20px;
        text-transform: uppercase;
      }

      & .mokup-confirm {
        padding: 16px;
        color: ${props => props.theme.green};
        background: ${props => props.theme.darkenGreen};
        margin: 10px -25px;
        font-size: 20px;
        text-align: center;
        &.color-red {
          background: ${props => props.theme.darkenPink};
          color: ${props => props.theme.pink};
        }
      }
      .mokup-button-item {
        margin: 0 5px;
      }
      .mokup-hospital-before-title {
        margin: 45px 0 15px 0;
        font-weight: 700;
      }
      .mokup-hospital-before-info {
        background-color: #27373f;
        padding: 15px;
        border-radius: 5px;
        
        .mokup-info-item-title {
          width: 25% !important;
        }
      }
      & .mokup-info-item {
        display: flex;
        padding: 4px 0;
        .mokup-info-item-title {
          width: 15%;
        }
      }
      .c-modal-footer {
        border: none;
      }
    }
  }
`;

export { Main };
