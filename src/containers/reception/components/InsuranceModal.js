import React, { memo, useEffect, useState } from 'react';
import T from 'prop-types';
import Modal from 'components/Modal';
import Button from 'components/Button';
import styled from 'styled-components';
import EventLayerWrapper from 'components/EventLayerWrapper';
import HospitalDB from 'utils/IndexedDB/Hospital';
const ModalInsurance = styled.div`
  .c-modal-content {
    .c-modal-display {
      & .mokup-title {
        text-align: center;
        font-size: 20px;
        text-transform: uppercase;
        font-family: Roboto-medium;
      }

      & .mokup-confirm {
        padding: 16px;
        color: ${props => props.theme.green};
        background: ${props => props.theme.darkenGreen};
        margin: 10px -25px;
        font-size: 20px;
        font-family: Roboto-medium;
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
          font-family: Roboto-regular;
        }
      }
      .c-modal-footer {
        border: none;
      }
    }
  }
`;
const InsuranceModal = ({ data, modalActions, modalDatas }) => {
  const [hospitalsIds, setHostpitalIds] = useState([]);
  const [error, setError] = useState([false]);
  const [message, setMessage] = useState(['']);
  const [errorServer, setErrorServer] = useState([false]);
  useEffect(() => {
    HospitalDB.getAll(getHospitalFromDB);
    getMessageErrorPortal();
  });
  
  const getMessageErrorPortal = () => {
    let message = '';
    let error;
    let errorServer;
    switch (data.maKetQua) {
      case '000':
        message = 'Thông tin thẻ chính xác';
        error = true;
        break;
      case '001':
        message =
          'Thẻ do BHXH Bộ Quốc Phòng quản lý, đề nghị kiểm tra thẻ và thông tin giấy tờ tùy thân';
        break;
      case '002':
        message =
          'Thẻ do BHXH bộ Công An quản lý, đề nghị kiểm tra thẻ và thông tin giấy tờ tùy thân';
        break;
      case '003':
        message = 'Thẻ cũ hết giá trị sử dụng, được cấp thẻ mới';
        break;
      case '004':
        message = 'Thẻ cũ còn giá trị sử dụng, được cấp thẻ mới';
        break;
      case '010':
        message = 'Thẻ hết giá trị sử dụng';
        break;
      case '051':
        message = 'Mã thẻ không đúng';
        break;
      case '052':
        message = 'Mã tỉnh cấp thẻ (ký tự thứ 4,5) của thẻ không đúng';
        break;
      case '053':
        message = 'Mã quyền lợi (ký tự thứ 3) của thẻ không đúng';
        break;
      case '050':
        message = 'Không có thông tin thẻ';
        break;
      case '060':
        message = 'Thẻ sai họ tên';
        break;
      case '061':
        message = 'Thẻ sai họ tên (đúng ký tự đầu)';
        break;
      case '070':
        message = 'Thẻ sai ngày sinh';
        break;
      case '100':
        message = 'Lỗi khi lấy dữ liệu sổ thẻ';
        break;
      case '101':
        message = 'Lỗi server';
        errorServer = true;
        break;
      case '110':
        message = 'Thẻ đã thu hồi';
        break;
      case '120':
        message = 'Thẻ đã báo giảm';
        break;
      case '121':
        message = 'Thẻ đã báo giảm chuyển ngoại tỉnh';
        break;
      case '122':
        message = 'Thẻ đã báo giảm chuyển nội tỉnh';
        break;
      case '123':
        message = 'Thẻ đã báo giảm do tăng lại cùng đơn vị';
        break;
      case '124':
        message = 'Thẻ đã báo giảm ngừng tham gia';
        break;
      case '130':
        message = 'Trẻ em không xuất trình thẻ';
        break;
      case '205':
        message = 'Lỗi sai định dạng tham số';
        break;
      case '401':
        message = 'Lỗi xác thực tài khoản';
        errorServer = true;
        break;
      default:
        message = 'Lỗi server';
        errorServer = true;
    }
    setError(error);
    setMessage(message);
    setErrorServer(errorServer);
  };

  const getHospitalFromDB = data => {
    const listHospital = data.sort((a, b) => {
      return new Date(a.value) - new Date(b.value);
    });
    const hospitalsIds = listHospital.map(item => {
      return {
        ...item,
        displayText: `${item.value} - ${item.name}`,
      };
    });
    setHostpitalIds(hospitalsIds);
  };

  const { save } = modalActions;

  const {
    noInfoInsurance,
    isCreateAction,
    checkIgnoreInsurancePortal,
    regAtHospitalId,
    patientDocument,
    birthdayFormat,
    patientName,
    gender,
    continuity5YearDate,
    insuranceFromDate,
    insuranceToDate,
  } = modalDatas;
  const maDKBD = data.maDKBD
    ? hospitalsIds.find(item => item.value === data.maDKBD)
    : '';
  const maCSKCB = data.dsLichSuKCB2018
    ? hospitalsIds.find(item => item.value === data.dsLichSuKCB2018[0].maCSKCB)
    : '';
  const footer = callback => (
    <div className="text-right">
      {isCreateAction === true ? (
        <div>
          <div className="mokup-button">
            {!checkIgnoreInsurancePortal ? null : (
              <Button
                onClick={callback}
                className="mokup-button-item mokup-button-no"
                shortKey={'ESCAPE'}
                keyCode={27}
                type={'bluedark-light'}
                size={'medium'}
              >
                <img alt="" className="mokup-icon" src="/images/check.png" />
                Hủy
              </Button>
            )}

            <Button
              //
              className="mokup-button-item mokup-button-yes"
              shortKey={'ENTER'}
              keyCode={13}
              type={'primary'}
              onClick={() => {
                callback();
                save();
              }}
            >
              <img alt="" className="mokup-icon" src="/images/check.png" />
              Lưu
            </Button>
          </div>
        </div>
      ) : !noInfoInsurance ? (
        <div className="mokup-button">
          <Button
            onClick={callback}
            className="mokup-button-item mokup-button-no"
            shortKey={'ESCAPE'}
            keyCode={27}
            type={'bluedark-light'}
          >
            <img alt="" className="mokup-icon" src="/images/close.png" />
            Không chấp nhận
          </Button>

          <Button
            className="mokup-button-item mokup-button-yes"
            onClick={() => {
              callback();
            }}
            shortKey={'ENTER'}
            keyCode={13}
            type={'primary'}
          >
            <img alt="" className="mokup-icon" src="/images/check.png" />
            Chấp nhận
          </Button>
        </div>
      ) : (
        <div className="mokup-button">
          <Button
            onClick={callback}
            className="mokup-button-item mokup-button-yes"
            shortKey={'ENTER'}
            keyCode={13}
            type={'primary'}
          >
            <img alt="" className="mokup-icon" src="/images/check.png" />
            Chấp nhận
          </Button>
        </div>
      )}
    </div>
  );

  const gender1 = gender && (parseInt(gender) === 1 ? 'Nam' : 'Nữ');

  return (
    <EventLayerWrapper layerEvent={{ key: 'insuranceModal', events: [] }}>
      <ModalInsurance className="poup">
        <div className="emr-small">
          <Modal className="mokup" show footer={footer} width={'60%'} isDark>
            <div className="mokup-item">
              <h1 className="mokup-title">
                Check cổng bảo hiểm {patientDocument && ' - ' + patientDocument}
              </h1>
              <h1
                className={!error ? 'mokup-confirm color-red' : 'mokup-confirm'}
              >
                <span className="mokup-check">
                  {data.maKetQua}: {message}
                </span>
              </h1>
              <div className="mokup-info">
                <div className="mokup-info-user">
                  {data.ten && (
                    <div className="mokup-info-item">
                      <p className="mokup-info-item-title"> Họ và tên:</p>
                      <p className="mokup-info-item-inner">
                        {' '}
                        {data.ten}{' '}
                        {!data.checkInsuranceBarcode
                          ? patientName &&
                            patientName.toLocaleUpperCase() !==
                              data.ten.toLocaleUpperCase() && (
                              <span className="error-info--insurance color-red">
                                (Sai: {patientName})
                              </span>
                            )
                          : null}{' '}
                      </p>
                    </div>
                  )}
                  {data.ngaySinh && (
                    <div className="mokup-info-item">
                      <p className="mokup-info-item-title"> Ngày sinh:</p>
                      <p className="mokup-info-item-inner">
                        {' '}
                        {data.ngaySinh}{' '}
                        {birthdayFormat && birthdayFormat !== data.ngaySinh && (
                          <span className="error-info--insurance color-red">
                            (Sai: {birthdayFormat})
                          </span>
                        )}
                      </p>
                    </div>
                  )}

                  {data.giơiTinh && (
                    <div className="mokup-info-item">
                      <p className="mokup-info-item-title"> Giới tính:</p>
                      <p className="mokup-info-item-inner">
                        {' '}
                        {data.giơiTinh}{' '}
                        {gender && gender1 !== data.giơiTinh && (
                          <span className="error-info--insurance color-red">
                            (Sai: {gender1})
                          </span>
                        )}
                      </p>
                    </div>
                  )}

                  {data.diaChi && (
                    <div className="mokup-info-item">
                      <p className="mokup-info-item-title"> Địa chỉ:</p>
                      <p className="mokup-info-item-inner">{data.diaChi}</p>
                    </div>
                  )}

                  {data.maDKBD && (
                    <div className="mokup-info-item">
                      <p className="mokup-info-item-title"> Nơi ĐK:</p>
                      <p className="mokup-info-item-inner">
                        {maDKBD ? <span>{maDKBD.displayText}</span> : ''}{' '}
                        {regAtHospitalId &&
                          regAtHospitalId.value !== maDKBD.value && (
                            <span className="error-info--insurance color-red">
                              (Sai: {regAtHospitalId.displayText})
                            </span>
                          )}
                      </p>
                    </div>
                  )}

                  {data.ngayDu5Nam && (
                    <div className="mokup-info-item">
                      <p className="mokup-info-item-title"> Ngày đủ 5 năm:</p>
                      <p className="mokup-info-item-inner">
                        {' '}
                        {data.ngayDu5Nam && data.ngayDu5Nam}{' '}
                        {data.ngayDu5Nam &&
                          continuity5YearDate &&
                          data.ngayDu5Nam !==
                            continuity5YearDate.format('dd/MM/yyyy') && (
                            <span className="error-info--insurance color-red">
                              (Sai: {continuity5YearDate.format('dd/MM/yyyy')})
                            </span>
                          )}
                      </p>
                    </div>
                  )}
                  {data.gtTheTu && (
                    <div className="mokup-info-item">
                      <p className="mokup-info-item-title"> Từ ngày:</p>
                      <p className="mokup-info-item-inner">
                        {' '}
                        {data.gtTheTu && data.gtTheTu}{' '}
                        {insuranceFromDate &&
                          insuranceFromDate.format('dd/MM/yyyy') !==
                            data.gtTheTu && (
                            <span className="error-info--insurance color-red">
                              (Sai: {insuranceFromDate.format('dd/MM/yyyy')})
                            </span>
                          )}
                      </p>
                    </div>
                  )}
                  {data.gtTheDen && (
                    <div className="mokup-info-item">
                      <p className="mokup-info-item-title"> Đến ngày:</p>
                      <p className="mokup-info-item-inner">
                        {' '}
                        {data.gtTheDen && data.gtTheDen}{' '}
                        {insuranceToDate &&
                          insuranceToDate.format('dd/MM/yyyy') !==
                            data.gtTheDen && (
                            <span className="error-info--insurance color-red">
                              (Sai: {insuranceToDate.format('dd/MM/yyyy')})
                            </span>
                          )}
                      </p>
                    </div>
                  )}
                  {data.maTheMoi && (
                    <div className="mokup-info-item">
                      <p className="mokup-info-item-title"> Mã thẻ mới:</p>
                      <p className="mokup-info-item-inner">
                        {' '}
                        {data.maTheMoi ? (
                          <span>
                            {data.maTheMoi} ({data.gtTheTuMoi} -{' '}
                            {data.gtTheDenMoi})
                          </span>
                        ) : (
                          ''
                        )}
                      </p>
                    </div>
                  )}

                  {data.maDKBDMoi && (
                    <div className="mokup-info-item">
                      <p className="mokup-info-item-title"> Mã ĐK mới:</p>
                      <p className="mokup-info-item-inner"> {data.maDKBDMoi}</p>
                    </div>
                  )}
                </div>
                {/* data.dsLichSuKCB2018[0].tinhTrang == 2 && */}
                {data.dsLichSuKCB2018 &&
                  data.dsLichSuKCB2018[0].maCSKCB !== maDKBD &&
                  parseInt(data.dsLichSuKCB2018[0].tinhTrang) === 2 && (
                    <div className="mokup-hospital-before">
                      <h5 className="mokup-hospital-before-title">
                        Bệnh viện trước
                      </h5>
                      <div className="mokup-hospital-before-info">
                        <div className="row">
                          <div className="col-lg-7 col-md-7 col-sm-7">
                            <div className="mokup-info-item">
                              <p className="mokup-info-item-title">
                                {' '}
                                Bệnh viện:
                              </p>
                              <p className="mokup-info-item-inner">
                                {maCSKCB.displayText}
                              </p>
                            </div>
                            <div className="mokup-info-item">
                              <p className="mokup-info-item-title">
                                {' '}
                                Chẩn đoán:
                              </p>
                              <p className="mokup-info-item-inner">
                                {' '}
                                {data.dsLichSuKCB2018[0].maCSKCB.tenBenh}
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-5 col-md-5 col-sm-5">
                            <div className="mokup-info-item">
                              <p className="mokup-info-item-title">
                                {' '}
                                Lý do vào:
                              </p>
                              <p className="mokup-info-item-inner">
                                {' '}
                                Thông tuyến
                              </p>
                            </div>
                            <div className="mokup-info-item">
                              <p className="mokup-info-item-title">
                                {' '}
                                Ngày đăng ký:
                              </p>
                              <p className="mokup-info-item-inner">
                                {' '}
                                {data.ngayVao}
                              </p>
                            </div>
                            <div className="mokup-info-item">
                              <p className="mokup-info-item-title">
                                {' '}
                                Thời gian ra viện:
                              </p>
                              <p className="mokup-info-item-inner">
                                {data.ngayRa}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                {errorServer ? (
                  <p className="error-serverPortal">
                    Vui lòng truy cập{' '}
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://gdbhyt.baohiemxahoi.gov.vn/"
                    >
                      https://gdbhyt.baohiemxahoi.gov.vn/
                    </a>{' '}
                    để kiểm tra
                  </p>
                ) : null}
              </div>
            </div>
          </Modal>
        </div>
      </ModalInsurance>
    </EventLayerWrapper>
  );
};

InsuranceModal.defaultProps = {
  data: {},
};

InsuranceModal.propTypes = {
  errors: T.object,
};

export default memo(InsuranceModal);
