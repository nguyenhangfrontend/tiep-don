import React, { memo, useState, useEffect } from 'react';
import { Main } from './styled';
import { columnsPatient } from '../../constData';
import { SelectCustom, Input, Table } from 'components';
import Pagination from 'components/Pagination';
import { connect } from 'react-redux';
import { selectPatientList } from '../../selectors';
import { createStructuredSelector } from 'reselect';
import ModalAddNew from '../PopupAddNew';
import { ModalAction } from 'components/Modal';
import Loading from 'components/Loading';
import { isEmpty } from 'lodash';
import {
  selectLoadingAll,
  selectForm,
} from 'containers/scan-medical-record/selectors';
import {
  fetchForms,
  searchPatient,
} from 'containers/scan-medical-record/actions';
import Button from 'components/Button';

function ListPatient(props) {
  const [ListPatient, setPatientList] = useState([]);
  const [formId, setFormId] = useState('');
  const [patientDocument, setPatientDocument] = useState('');
  const [patientName, setPatientName] = useState('');
  const {
    patientList,
    onClick,
    showAddNewModal,
    isLoadingAll,
    fetchForms,
    forms,
    searchPatient,
  } = props;
  useEffect(() => {
    fetchForms();
    searchPatient();
    onChangePage()
  }, []);

  useEffect(() => {
    onChangePage()
  }, [patientList]);

  const onChangePage = patientList => {
    if (patientList) {
      const rows = patientList.map(item => ({
        ...item,
        key: item.id || item.receptionId,
        name: item.patientName,
        gender: item.gender === 1 ? 'Nam' : 'Nữ',
        canTimes: item.times,
        form:
          !isEmpty(forms) &&
          forms.find(itemForm => itemForm.value === item.formId).label,
      }));
      setPatientList(rows);
    }
  };

  const search = () => {
    const params = {
      patientName,
      patientDocument,
      formId: formId
    };
    for (var key in params) {
      if (!params[key]) {
        delete params[key];
      }
    }
    searchPatient(params);
  };
  const addNew = () => {
    showAddNewModal();
  };
  const handleChangeForm = formID => {
    setFormId(formID);
  };
  const changePatientDocument = e => {
    setPatientDocument(e);
  };
  const changePatientName = e => {
    setPatientName(e);
  };

  return (
    <Main>
      <div className="form-search">
        <div className="col-md-12">
          <div class="inner-search">
            <div class="left-tool-bar">
              <div className="row">
                <div className="input-content">
                  <span className="label">Mã HS hoặc tên NB</span>
                  <Input
                    value={patientDocument}
                    onChange={changePatientDocument}
                    placeholder="Mã HS"
                  />
                </div>
                <div className="input-content">
                  <span className="label">Tên người bệnh</span>
                  <Input
                    value={patientName}
                    onChange={changePatientName}
                    placeholder="Tên NB"
                  />
                </div>
                <div className="input-content">
                  <span className="label">Loại biểu mẫu</span>
                  <span className="label"></span>
                  <SelectCustom
                    placeholder="Chọn loại biểu mẫu"
                    isDisabled={true}
                    type={'white'}
                    options={forms}
                    value={formId}
                    onChange={handleChangeForm}
                    isClearable={true}
                  />
                </div>
                <div className="input-content">
                  <span className="label"></span>
                  <Button
                    width={'220px'}
                    type={'primary'}
                    className="button-search"
                    keyCode={13}
                    onClick={search}
                  >
                    {'Tìm kiếm'}
                  </Button>
                </div>
              </div>
            </div>
            <div className="right-toolbar">
              <Button
                type={'light-green'}
                className="button-add-new"
                onClick={addNew}
              >
                {'+ Thêm mới'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Table rows={ListPatient} onClick={onClick} columns={columnsPatient} />
      <Pagination
        items={patientList}
        pageSize={15}
        onChangePage={onChangePage}
      />
      <Loading visible={isLoadingAll} />
    </Main>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    showAddNewModal: modalProps => {
      const modalType = ModalAddNew;
      dispatch(ModalAction.showModal({ modalType, modalProps }));
    },
    fetchForms: data => dispatch(fetchForms(data)),
    searchPatient: data => dispatch(searchPatient(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  patientList: selectPatientList(),
  isLoadingAll: selectLoadingAll(),
  forms: selectForm(),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(ListPatient);
