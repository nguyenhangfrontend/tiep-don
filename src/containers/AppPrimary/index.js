import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/saga/injectSaga';
import reducer from './reducer';
import { getTokenFromCodeStart, getUserInfo } from './actions';
import saga from './sagas';
import { prefix } from './constants';
import Home from './Home';

function AppPrimary(props) {
  useInjectReducer({ key: prefix, reducer });
  useInjectSaga({ key: prefix, saga });

  return <Home {...props} />;
}

const mapDispatchToProps = dispatch => {
  return {
    getTokenFromCode: data => dispatch(getTokenFromCodeStart(data)),
    getUserInfo: () => dispatch(getUserInfo()),
  };
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(AppPrimary);
