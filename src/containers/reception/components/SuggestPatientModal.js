import React, { memo, useState, useEffect } from 'react';
import T from 'prop-types';
import Modal from 'components/Modal';
import Button from 'components/Button';
import styled from 'styled-components';
import EventLayerWrapper from 'components/EventLayerWrapper';

const ModalSuggestList = styled.div`
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

const SuggestListModal = ({ data, clearDataInputDuplicate, modalActions }) => {
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(function() {
    window.addEventListener('keydown', selectPatient);
  });

  
  const callbackQuit = () => {
    modalActions.clearCode()
  };

  const showDetailPatient = ( patientId ) => {
    modalActions.showDataDupplicate(patientId)
  }

  const selectPatient = e => {
    if (e.keyCode === 40) {
      setSelectedIndex(selectedIndex + 1);
      window.removeEventListener('keydown', selectPatient);
    }

    if (e.keyCode === 38) {
      setSelectedIndex(selectedIndex - 1);
      window.removeEventListener('keydown', selectPatient);
    }
    if (e.keyCode === 13) {
      showSelectedIndexPatient(data[selectedIndex].id);
    }
  };
  const showSelectedIndexPatient = () => {
    showDetailPatient(data[selectedIndex].id)
  }


 
  const footer = callback => (
    <div className="footer-popup">
      <div className="mokup-button">
        <Button
          className="btn btn-primary btn-cancel"
          href="#"
          keyCode={27}
          type={'light-blue'}
          onClick={ ()=> {
            callback()
            callbackQuit()
          }}
        >
          <img alt="" className="mokup-icon" src="/images/small-close.png" />
          Hủy
        </Button>

        <Button
          className="btn btn-primary btn-save"
          shortKey={'ENTER'}
          keyCode={13}
          type={'primary'}
          onClick={() => {
            callback();
            showSelectedIndexPatient();
          }}
        >
          <img alt="" className="mokup-icon" src="/images/check.png" />
          Lấy thông tin<span className="keyboard"> ENTER</span>
        </Button>
      </div>
    </div>
  );

  return (
    <EventLayerWrapper layerEvent={{ key: 'SuggestListModal', events: [] }}>
      <ModalSuggestList className="poup">
        <div className="emr-small">
          <Modal
            className="mokup"
            show
            footer={footer}
            width={'75%'}
            callBackWithCustomClose={callbackQuit}
          >
            {close => {
              ;
              return (
                <div className="modal-popup">
                  <h2 className="title-table text-center">
                    Danh sách người bệnh trùng
                  </h2>
                  <input className="hide-input" type="checkbox" />
                  <div className="table-wrapp table-suggest">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="col-suggest"></th>
                          <th className="col-suggest">STT</th>
                          <th className="col-suggest">Ngày đăng ký</th>
                          <th className="col-suggest"> Mã NB </th>
                          <th className="col-suggest">Tên NB</th>
                          <th className="col-suggest">Ngày sinh</th>
                          <th className="col-suggest"> Giới tính </th>
                          <th className="col-suggest">SĐT</th>
                          <th className="col-suggest">Địa chỉ</th>
                          <th className="col-suggest">CMT</th>
                        </tr>
                      </thead>
                      <tbody className="tbody">
                        {data && data.length ? (
                          data.map((patientItem, index) => {
                            const date = new Date(patientItem.timeGoIn).format(
                              'dd/MM/yyyy',
                            );

                            const birthday = new Date(
                              patientItem.birthday,
                            ).format('dd/MM/yyyy');

                            return (
                              <tr
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                                onDoubleClick={() => {
                                  close();
                                  showDetailPatient(patientItem.id);
                                }}
                                className={
                                  parseInt(selectedIndex) === parseInt(index)
                                    ? 'tr-row active-item'
                                    : 'tr-row'
                                }
                              >
                                <td className="col-suggest">
                                  <span className="around-radio">
                                    <input type="hidden" />
                                  </span>
                                </td>
                                <td className="col-suggest">{index + 1}</td>
                                <td className="col-suggest">{date}</td>
                                <td className="col-suggest">
                                  {' '}
                                  {patientItem.patientValue}{' '}
                                </td>
                                <td className="col-suggest">
                                  {patientItem.patientName}
                                </td>
                                <td className="col-suggest">{birthday}</td>
                                <td className="col-suggest">
                                  {patientItem.gender === 1 ? 'Nam' : 'Nữ'}
                                </td>
                                <td className="col-suggest">
                                  {patientItem.phone}
                                </td>
                                <td className="col-suggest">
                                  {patientItem.address}
                                </td>
                                <td className="col-suggest">
                                  {patientItem.idNo}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="10">Không có người bệnh</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            }}
          </Modal>
        </div>
      </ModalSuggestList>
    </EventLayerWrapper>
  );
};

SuggestListModal.defaultProps = {
  data: [],
};

SuggestListModal.propTypes = {
  errors: T.object,
};

export default memo(SuggestListModal);
