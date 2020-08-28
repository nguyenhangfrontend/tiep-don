import React, { PureComponent } from 'react';
import { initialForm } from './constants';
import { getPatientInsuranceNumber, getPatientInsurancePortal, getPatientInsuranceBarcode, setIgnoreCheckInsurance, fetchPatient } from 'containers/reception/actions';
import { formToBody } from 'containers/reception/components/Middle/ReceptionForm/Container/utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsEdit, selectEditType } from 'containers/reception/selectors';
import View from './View';
import moment from 'moment';

class InsurancePatientForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: initialForm,
      disabled: true,
    };

    this.formChange = Object.keys(initialForm).reduce((result, key) => {
      return {
        ...result,
        [key]: this.setFormKey(key),
        [`${key}Ref`]: React.createRef(),
      };
    }, {});
  }
  
  save =()=> {
    
    const { submit } = this.props
    
    submit();

  }

  onSubmit = () => {
    
    const { form } = this.state;
    const keys = Object.keys(initialForm);
   
    const errors = keys
      .map(key => ({ keyRef: `${key}Ref`, key }))
      .map(item => ({ node: this.formChange[item.keyRef]['current'], key: item.key }))
      .map(item => (item.node ? item.node['validate'](form[item.key]) : ''));
     
    const error = !!errors.find(item => !!item);
    
    return {
      form,
      error,
    };
  };

  setFormKey = key => value => {
    const { form } = this.state;
    let newForm = { ...form };
    let disabled;
    
    switch(key) {
      case 'patientType':
        if (value === 1) {
          newForm = { ...initialForm, patientType: value };
          disabled = true;
        } else {
          newForm[key] = value;
          disabled = false;
        }
        break;
      default:
        newForm[key] = value;
        break;
    }

    this.setState({ form: newForm, disabled }, ()=> {
      if(key === 'insuranceFromDate' || key === 'insuranceToDate' || key ===  'continuity5YearDate' || key === 'regAtHospitalId'){
        this.checkInsurancePortal()
      }
      
    });
  };
  
  initForm = (patient) => {
    const keys = Object.keys(initialForm);
    if(keys){
      keys.map(key => ({ keyRef: `${key}Ref`, key }))
      .map(item => ({
        node: this.formChange[item.keyRef]['current'],
        key: item.key,
      }))
      .map(item => (item.node ? item.node['setError']('') : ''));
    }
   
    const { isEdit, editType } = this.props
    const { patientType } = this.state.form;
    const { formPatientRef } = this.props;
    const { duplicateType } = formPatientRef.current.state
    let form
   const insuranceFromDate = !duplicateType  || patientType === 2 ? patient.insuranceFromDate && new Date(patient.insuranceFromDate) : ''
   const insuranceToDate = !duplicateType  || patientType === 2 ? patient.insuranceToDate && new Date(patient.insuranceToDate) : ''
   const continuity5YearDate = !duplicateType  || patientType === 2 ? patient.continuity5YearDate && new Date(patient.continuity5YearDate) : ''

    if(duplicateType){
      if(patientType === 2){
        form = formToBody(initialForm, patient)
      }else {
        form = initialForm
      }
    }else {
      if(patient.patientType === 2){
        form = formToBody(initialForm, patient)
      }else {
        form = initialForm
      }
    }

   

    const disabledPatientTypeButton = editType === 1
    this.setState({
      
      disabledPatientTypeButton,
      form: {
        ...form,
        patientFromHospitalId: isEdit ? patient.patientFromHospitalId : null,
        id: isEdit ? patient.id: null,
        reason: isEdit ? patient.reason : '',
        continuity5Year: isEdit ? patient.continuity5Year : false,
        notCopayment: isEdit ? patient.notCopayment : false,
        insuranceFromDate,
        insuranceToDate,
        continuity5YearDate,

      },
    }, () => {
      const { patientType } = this.state.form
      this.setState({
        disabled: patientType === 1 || editType === 1
      })
    });
  };
  showDataDupplicate = patientId => {
    
    const { fetchPatient } = this.props;
    fetchPatient({
      patientId,
    });
  };
  clearCode = () => {
    this.setState({
      form: {
        ...this.state.form,
        insuranceNumber: '',
      }
    })
  };

  checkPatientInsuranceNumber = (e) => {
    const { getPatientInsurance, formPatientRef } = this.props;
    const param = e.target.value;

    

    getPatientInsurance({
      param,
      modalActions: {
        save: this.onSubmit,
        clearCode: this.clearCode,
        showDataDupplicate: this.showDataDupplicate
      }
    });
  };


  checkBarcodeEdit = e => {
    const param = { rawData: e.target.value };
    const { getPatientInsuranceBarcode } = this.props;
      getPatientInsuranceBarcode({
        param,
        callback: this.showDataCheckBarcode,
      });
    
  }
  showDataCheckBarcode = (data) => {
    const birthdayFormat = moment(data.birthday).format('DD/MM/YYYY');
    const name = data.patientName;
    this.checkInsurancePortal(birthdayFormat, name)
  }
  
  checkInsurancePortal = (birthdayFormat, name) => {
    
    const { formPatientRef, checkInsurancePortal } = this.props;
    const formPatientRefState = formPatientRef.current.state.form;
    const { insuranceNumber,  } = this.state.form;
    const birthdayChange = formPatientRefState.birthday && formPatientRefState.birthday.date ? moment(formPatientRefState.birthday.date).format('DD/MM/YYYY'): '';
    const nameChange = formPatientRefState.patientName ? formPatientRefState.patientName: '';
    const patientName = name || nameChange;
    const birthday = birthdayFormat || birthdayChange;
    const params = {
      hoTen : patientName,
      ngaySinh: birthday,
      maThe:  insuranceNumber
    };
    if(patientName && birthday && insuranceNumber){
      checkInsurancePortal({
        params,
        modalActions: {
          save: this.save,
          clearCode: this.clearCode,
        },
        modalData: this.getDataChangeCheckPortal
      })
    }

  };

  getDataChangeCheckPortal = () => {
    const { formPatientRef } = this.props;
    const formPatientRefState = formPatientRef.current.state.form;
    const patientName =  formPatientRefState.patientName;
    const gender =  formPatientRefState.gender;
    const birthday =  formPatientRefState.birthday && formPatientRefState.birthday.date ? formPatientRefState.birthday.date.format('DD/MM/YYYY'):'';
    const regAtHospitalId =  this.state.form.regAtHospitalId;
    const insuranceFromDate =  this.state.form.insuranceFromDate;
    const insuranceToDate =  this.state.form.insuranceToDate;
    const continuity5YearDate =  this.state.form.continuity5YearDate;
    const noInfoInsurance = false;
    const params = {
      noInfoInsurance,
      patientName,
      birthday,
      gender,
      regAtHospitalId,
      insuranceFromDate,
      insuranceToDate,
      continuity5YearDate
    };

    return params
  };

  render() {

    return (
      <View
        {...this.state}
        formChange={this.formChange}
        checkPatientInsuranceNumber={this.checkPatientInsuranceNumber}
        checkInsurancePortal={this.checkInsurancePortal}
        appointment={this.state.form.appointment}
        checkBarcodeEdit={this.checkBarcodeEdit}
      />
    );
  }
}
const mapState = createStructuredSelector({
  isEdit: selectIsEdit(),
  editType: selectEditType(),

});
const mapDispatch = dispatch => ({
  getPatientInsurance: data => dispatch(getPatientInsuranceNumber(data)),
  checkInsurancePortal: data => dispatch(getPatientInsurancePortal(data)),
  getPatientInsuranceBarcode: data => dispatch(getPatientInsuranceBarcode(data)),
  setIgnoreCheckInsurance: data => dispatch(setIgnoreCheckInsurance(data)),
  fetchPatient: data => dispatch(fetchPatient(data)),
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  InsurancePatientForm,
);
