import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/saga/injectSaga';
import Record from './components/MedicalRecord';
import reducer from './reducer';
import { getListPatient, getMedicalCodeList } from './actions';
import saga from './saga';
import { prefix } from './constants';
import MedicalRecordDetail from './components/MedicalRecordDetail';

export function MedicalRecord(props) {
  useInjectReducer({ key: prefix, reducer });
  useInjectSaga({ key: prefix, saga });

  const { getListPatient } = props;
  useEffect(() => {
    getListPatient();
  }, [getListPatient]);
  return (
    <section className="emr-section">
      <div className="container-fluid">
        <Switch>
          <Route
            exact
            path="/admin/ho-so-benh-an"
            render={prop => <Record {...prop} {...props} />}
          />
          <Route
            path={`/admin/ho-so-benh-an/:id`}
            component={MedicalRecordDetail}
          />
        </Switch>
      </div>
    </section>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    getListPatient: data => dispatch(getListPatient(data)),
    getMedicalCodeList: data => dispatch(getMedicalCodeList(data)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(MedicalRecord);
