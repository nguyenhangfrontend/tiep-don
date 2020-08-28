import React, { memo, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import T from 'prop-types';
import Modal from 'components/Modal';
import { connect } from 'react-redux';
import Button from 'components/Button';
import { SelectCustom } from 'components';
import EventLayerWrapper from 'components/EventLayerWrapper';
import { hideModal } from 'components/Modal/RootModal/actions';
import {
  fetchPatientDocument,
  uploadFiles,
  searchPatient
} from 'containers/scan-medical-record/actions';
import { ModalConfirm } from './styled';
import {
  selectPatient,
  selectForm,
} from 'containers/scan-medical-record/selectors';

function AddNewModal(props) {
  const [fileNames, setFileName] = useState([]);
  const [files, setFiles] = useState([]);
  const [patientDocument, setPatientDocument] = useState('');
  const [formId, setFormId] = useState('');
  const {
    textOk,
    fetchPatientDocument,
    patient,
    forms,
    uploadFiles,
    searchPatient,
    hideModal
  } = props;
  const uploadFile = () => {
    if(!isEmpty(files) && !isEmpty(patient)){
      const params = {
        file: files[0],
        patientDocument: patient.patientDocument,
        formId,
      };
      uploadFiles({ params, callback: fetchMedicalScans});
    }
    
    
  };
  
  const fetchMedicalScans = () => {
    const param = null
    hideModal()
    searchPatient()
    fetchPatientDocument({param})
  };
  const changeFiles = e => {
    const files = Array.from(e.target.files);
    setFiles(files);
    setFileName(files.map(item => item.name));
  };
  const selectPhoto = () => {
    const selectPhoto = document.getElementById('fileinput');

    selectPhoto && selectPhoto.click();
  };
  const handleDeleteFile = index => {
    files.splice(index, 1);
    setFileName(files.name);
    setFiles(files);
  };

  const keydownPatientDocument = e => {
    if (e.keyCode === 13) {
      searchPatientDocument();
    }
  };
  const handleChangePatientDocument = e => {
    const param = e.target.value;
    setPatientDocument(param);
  };

  const searchPatientDocument = () => {
    const param = patientDocument
    fetchPatientDocument({param});
  };

  const handleChangeForm = formID => {
    setFormId(formID);
  };
  const footer = callback => (
    <div className="mokup-button">
      <Button
        className="btn-save"
        keyCode={13}
        type={'primary'}
        onClick={() => {
          uploadFile();
        }}
      >
        <img alt="" className="mokup-icon" src="/images/check.png" />
        {textOk || 'Lưu Lại'}
      </Button>
    </div>
  );

  return (
    <EventLayerWrapper layerEvent={{ key: 'addNewModal', events: [] }}>
      <ModalConfirm className="poup">
        <div className="emr-small  text-center">
          <Modal className="mokup" callBackWithCustomClose={() =>fetchPatientDocument({param: null})} show footer={footer} width={'35%'}>
            {close => {
              return (
                <div className="mokup-item" >
                  <h4 className="title-confirm">Thêm mới</h4>
                  <div className="main-popup">
                    <div className="header">
                      <div className="search">
                        <span>Nhập mã Hồ sơ</span>
                        <div className="input-content">
                          <input
                            className="form-control"
                            onChange={handleChangePatientDocument}
                            onKeyDown={keydownPatientDocument}
                          />
                          <button
                            onClick={searchPatientDocument}
                            class="icon-input"
                          >
                            <i class="fa fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                      {!isEmpty(patient) && (
                        <div>
                          <div className="patient-info">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="info-item">
                                  <span className="label-info">Mã HS: </span>
                                  <span className="info-content patient-doccument">
                                    {patient.patientDocument}
                                  </span>
                                </div>
                                <div className="info-item">
                                  <span className="label-info">
                                    Họ và tên:{' '}
                                  </span>
                                  <span className="info-content patient-name">
                                    {patient.patientName}
                                  </span>
                                </div>
                                <div className="info-item">
                                  <span className="label-info">
                                    Ngày sinh:{' '}
                                  </span>
                                  <span className="info-content">
                                    {patient.birthday}
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="info-item">
                                  <span className="label-info">
                                    Giới tính:{' '}
                                  </span>
                                  <span className="info-content">
                                    {patient.gender === 1 ? 'Nam' : 'Nữ'}
                                  </span>
                                </div>
                                <div className="info-item">
                                  <span className="label-info">Địa chỉ: </span>
                                  <span className="info-content">
                                    {patient.address}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="select-file">
                            <span className="label-info">Chọn biểu mẫu: </span>
                            <SelectCustom
                              placeholder="Chọn loại biểu mẫu"
                              type={'white'}
                              options={forms}
                              onChange={handleChangeForm}
                              value={formId}
                            />
                            <div className="upload">
                              <Button
                                type={'gray-dark'}
                                className="btn-upload"
                                onClick={selectPhoto}
                              >
                                Upload
                                <input
                                  type="file"
                                  id="fileinput"
                                  onChange={changeFiles}
                                  selectPhoto
                                />
                              </Button>

                              <ul className="file-name">
                                {!isEmpty(fileNames) && fileNames.map((item, index) => {
                                  return (
                                    <li key={index}>
                                      <span
                                        onClick={handleDeleteFile}
                                        className="delete"
                                      >
                                        <i
                                          class="fa fa-times"
                                          aria-hidden="true"
                                        ></i>
                                      </span>{' '}
                                      {item}{' '}
                                    </li>
                                  );
                                })}
                                
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }}
          </Modal>
        </div>
      </ModalConfirm>
    </EventLayerWrapper>
  );
}

AddNewModal.defaultProps = {
  dataFunction: T.func,
  customClose: T.func,
};

AddNewModal.propTypes = {
  errors: T.object,
};
const mapState = createStructuredSelector({
  patient: selectPatient(),
  forms: selectForm(),
});
const mapDispatch = dispatch => ({
  fetchPatientDocument: data => dispatch(fetchPatientDocument(data)),
  searchPatient: data => dispatch(searchPatient(data)),
  uploadFiles: data => dispatch(uploadFiles(data)),
  hideModal: () => dispatch(hideModal()),
});

export default memo(connect(mapState, mapDispatch)(AddNewModal));
