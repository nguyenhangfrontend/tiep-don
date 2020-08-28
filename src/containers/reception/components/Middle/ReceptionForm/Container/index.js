import React, { memo, useRef, useEffect } from 'react';
import T from 'prop-types';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { Main } from './styled';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPatient, selectDepartmentId , selectIsEdit, selectIgnoreCheckInsurance} from 'containers/reception/selectors';
import { setIsEdit, setEditType } from 'containers/reception/actions';


import {
  createPatient,
  fetchPatients,
  checkIsCreate,
  editPatient
} from 'containers/reception/actions';
import { formToBody } from './utils';
import { initialForm as insuranceForm } from '../InsurancePatientForm/constants';
import { initialForm as patientForm } from '../ServicePatientForm/constant';
import { toast } from 'react-toastify';
import Header from '../Header';
import FormContainer from '../FormContainer';

const Container = props => {
  const {
    patient,
    createPatient,
    closeEdit,
    fetchPatients,
    checkIsCreate,
    editPatient,
    ignoreValidateInsurancePortal
  } = props;
  const history = useHistory();
  const formPatientRef = useRef(null);
  const formInsuranceRef = useRef(null);

  const createSuccessCallback = patientId => {
    const counterStr = localStorage.getItem('counter');
    const counterId = counterStr ? JSON.parse(counterStr).id : '';
    const params = { counterId };
    fetchPatients({ params });
    history.push(`/admin/tiep-don/${patientId}`);
    closeEdit(null)
    
  };
  const checkIsCreateInsurance = () =>{
    
    
    const insuranceInfo = formInsuranceRef.current.onSubmit();
    checkIsCreate(true);
    if (insuranceInfo.form.patientType === 2) {
      
      formInsuranceRef.current.checkInsurancePortal();
    }else {
      submit()
    }
    
  }

  const submit = () => {
    
    const counterStr = localStorage.getItem('counter');
    const departmentId = counterStr ? JSON.parse(counterStr).departmentId : '';
    const patientInfo = formPatientRef.current.onSubmit();
    const insuranceInfo = formInsuranceRef.current.onSubmit();
    
    const form = { ...patientInfo.form, ...insuranceInfo.form };

    const body = formToBody({ ...insuranceForm, ...patientForm, ignoreValidateInsurancePortal }, form);

  
    if (!patientInfo.error && !insuranceInfo.error) {
      if(!body.id){
        createPatient({
          body: {
            ...body,
            birthdayStr: patientInfo.form.birthday.strData,
            departmentId
          },
          callback: createSuccessCallback,
        });
      }else {
        editPatient({
          body: {
            ...body,
            birthdayStr: patientInfo.form.birthday.strData,
            departmentId
          },
          callback: createSuccessCallback,
        });
      }
      
    }
      
    
  };
 

  useEffect(() => {
    formPatientRef.current.initForm(patient);
    formInsuranceRef.current.initForm(patient);
  }, [patient]);
  
  const onScanId = () => {
    formPatientRef.current.onScanId();
  }

  return (
    <Main>
      <Header submit={checkIsCreateInsurance} closeEdit={closeEdit}  scanId={onScanId}/>
      <FormContainer
        formPatientRef={formPatientRef}
        formInsuranceRef={formInsuranceRef}
        submit={submit}
      />
    </Main>
  );
};

Container.propTypes = {
  editType: T.number,
  patient: T.shape({}),
  closeEdit: T.func,
  createPatient: T.func,
};

const mapState = createStructuredSelector({
  patient: selectPatient(),
  departmentId: selectDepartmentId(),
  isEdit: selectIsEdit(),
  ignoreValidateInsurancePortal: selectIgnoreCheckInsurance()
});

const mapDispatch = dispatch => ({
  createPatient: data => dispatch(createPatient(data)),
  editPatient: data => dispatch(editPatient(data)),
  fetchPatients: data => dispatch(fetchPatients(data)),
  checkIsCreate: data => dispatch(checkIsCreate(data)),
  setIsEdit: data => dispatch(setIsEdit(data)),
	setEditType: data => dispatch(setEditType(data)),
});

const withConnect = connect(mapState, mapDispatch, null, { forwardRef: true });

export default compose(withConnect, memo)(Container);
