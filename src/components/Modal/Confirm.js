import React, { memo, useRef, useEffect } from 'react';
import T from 'prop-types';
import Modal from 'components/Modal';
import { connect } from 'react-redux';
import Button from 'components/Button';
import styled from 'styled-components';
import EventLayerWrapper from 'components/EventLayerWrapper';
import constants from 'resources/strings';
import { setDataChange } from 'containers/reception/actions';
const ModalConfirm = styled.div`
  button {
    min-width: 140px;
    text-transform: uppercase;
  }
  .close-btn {
    min-width: auto;
  }
  .c-modal-display {
    .c-modal-footer {
      border: none;
    }
  }
`;

const ConfirmModal = ({
  dataFunction,
  title,
  message,
  textOk,
  textCancle,
  setDataChange,
  customCancel
}) => {

  const handleOK = async () => {
    await setDataChange();
    dataFunction();
  };

 

  const footer = callback => (
    <div className="mokup-button">
      <Button
        href="#"
        keyCode={27}
        type={'bluedark-light'}
        onClick={() => {
          callback();
          if(customCancel) {
            customCancel()
          }
        }}
      >
        {textCancle || 'Không'}
      </Button>

      <Button
        className="btn-save"
        keyCode={13}
        type={'primary'}
        onClick={() => {
          callback();
          handleOK();
        }}
      >
        <img alt="" className="mokup-icon" src="/images/check.png" />
        {textOk || 'Có'}
      </Button>
    </div>
  );

  return (
    <EventLayerWrapper layerEvent={{ key: 'ConfirmModal', events: [] }}>
      <ModalConfirm className="poup">
        <div className="emr-small  text-center">
          <Modal className="mokup" show footer={footer} width={'22%'} isDark>
            {close => {
              return (
                <div className="mokup-item">
                  <h4 className="title-confirm">{title}</h4>
                  <p className="question-create_content">{message}?</p>
                </div>
              );
            }}
          </Modal>
        </div>
      </ModalConfirm>
    </EventLayerWrapper>
  );
};

ConfirmModal.defaultProps = {
  dataFunction: T.func,
  customClose: T.func,
};

ConfirmModal.propTypes = {
  errors: T.object,
};

const mapDispatch = dispatch => ({
  setDataChange: data => dispatch(setDataChange(data)),
});

export default memo(connect(null, mapDispatch)(ConfirmModal));
