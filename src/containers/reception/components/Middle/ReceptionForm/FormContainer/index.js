import React , {memo} from 'react';
import InsurancePatientForm from '../InsurancePatientForm';
import ServicePatientForm from '../ServicePatientForm';
import {Main} from './styled'
const FormContainer = (props) => {
  const { formPatientRef, formInsuranceRef, submit } = props;
  
  return(
    <Main>
      <ServicePatientForm ref={formPatientRef}  formInsuranceRef={formInsuranceRef} />
      <InsurancePatientForm ref={formInsuranceRef} submit={submit} formPatientRef={formPatientRef}/>
    </Main>
    
  )
};

export default memo(FormContainer)