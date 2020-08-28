

import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/saga/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { prefix } from './constants';
import ListPatient from './components/ListPatient';

function MedicalRecordScan(props) {
   useInjectReducer({ key: prefix, reducer });
  useInjectSaga({ key: prefix, saga });



  useEffect(() => {
  }, []);



  return (
    <section className="emr-section">
       <div className="container-fluid">
        <ListPatient {...props} />
      </div>
    </section>
  );
}



export function mapDispatchToProps(dispatch) {
  return {
  };
}


const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MedicalRecordScan);

