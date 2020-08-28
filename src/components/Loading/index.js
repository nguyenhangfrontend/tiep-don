import React, {memo} from 'react';
import { Main } from './styled';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  selectLoadingAll,
} from 'containers/reception/selectors';

const Loading = ({ visible, children, isLoadingAll }) => {
  return (
    <Main>
      {visible && (
        <div className={`loading-mark ${isLoadingAll ? 'loading-all':''}`}>
          <div className="loading-inner">
            <div className="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
      {children}
    </Main>
  );
};
const mapState = createStructuredSelector({
  isLoadingAll: selectLoadingAll(),
});

const withConnect = connect(mapState, null, null, {
  forwardRef: true,
});

export default compose(withConnect, memo)(Loading);
