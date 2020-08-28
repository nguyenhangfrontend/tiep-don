import React from 'react';

import styled from 'styled-components';

export const ModalConfirm = styled.div`
  button {
    min-width: 140px;
    text-transform: uppercase;
  }
  .button-search {
    font-weight: 500;
  }
  .close-btn {
    min-width: auto;
  }
  div[class*='control'] {
    background-color: #fff;
    color: #273237;
    border-color: #273237;
    min-width: 160px;
  }
  div[class*='singleValue']{
    color: #273237;
  }
  .css-1pcexqc-container {
    position: relative;
    box-sizing: border-box;
    width: 300px;
    margin-top: 8px;
  }
  .select-file {
    text-align: left;
    margin-top: 15px;
    .label-info {
      color: #333;
      font-weight: 500;
    }
  }

  .upload {
    text-align: left;
    margin-top: 15px;
    .file-name {
      li {
        color: ${({ theme }) => theme.pink};
        margin-top: 5px;
      }
      .delete {
        color: #888;
        cursor: pointer;
        padding: 2px;
      }
    }
  }

  .c-modal-display {
    .c-modal-footer {
      border: none;
    }
  }

  .title-confirm,
  .main-popup {
    color: #333;
  }
  .btn-upload {
    position: relative;
    input {
      visibility: hidden;
      width: 100%;
      position: absolute;
      height: 100%;
      left: 0;
      z-index: 999;
    }
  }
  .main-popup {
    .search {
      display: flex;
      margin-bottom: 15px;
      align-items: center;
      justify-content: center;
      .icon-input {
        position: absolute;
        top: 6px;
        right: 10px;
        background: none;
        border: none;
        padding: 0;
        min-width: 0;
        color: #868585;
      }
      .form-control {
        border-color: #333;
        min-width: 250px;
      }
      span {
        display: inline-block;
        font-weight: 500;
        margin-right: 12px;
      }
    }
    .input-content {
      position: relative;
    }
    .patient-info {
      background-color: ${({ theme }) => theme.backgroundBlueLighten};
      text-align: left;
      padding: 20px;
      .info-content {
        font-weight: 700;
      }
      .patient-name {
        color: ${({ theme }) => theme.greenDark};
      }
      .patient-doccument {
        color: ${({ theme }) => theme.pink};
      }
      .info-item {
        display: flex;
      }
      .label-info {
        padding-right: 10px;
        font-weight: 500;
        min-width: 75px;
      }
    }
  }
`;
