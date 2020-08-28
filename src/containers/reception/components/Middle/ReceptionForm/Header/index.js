import React, { memo } from 'react';
import { Main } from './styled';
import Button from 'components/Button';
import SaveIcon from 'resources/svg/save.svg';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsEdit, selectPatient } from 'containers/reception/selectors';
import CloseIcon from 'resources/svg/close-white.svg';

const Header = props => {
  const { submit, closeEdit, scanId, isEdit, patient } = props;
  return (
    <Main>
      <div className="head-main">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="head-main-left">
              <div className="info-action patient-value">
                <span className="number-label">Số: </span>
               <span className="label-bn">{patient && patient.sequenceNo}</span>
              </div>

              <Button
                icon={<SaveIcon />}
                keyCode={117}
                shortKey={'F6'}
                type={'dark-light'}
                className={'scan-id-btn text-uppercase'}
                onClick={scanId}
              >
                scan CMT
              </Button>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="head-main-right">
              <Button
                icon={<SaveIcon />}
                type={'primary'}
                className="btn-save"
                onClick={submit}
                shortKey={'F4'}
                keyCode={115}
              >
                {'LƯU LẠI'}
              </Button>

              {isEdit && (
                <Button
                  keyCode={27}
                  className="btn-close"
                  type={'transparent'}
                  onClick={closeEdit}
                >
                  <CloseIcon />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
const mapState = createStructuredSelector({
  isEdit: selectIsEdit(),
  patient: selectPatient(),
});

const mapDispatch = dispatch => ({});

const withConnect = connect(mapState, mapDispatch, null, { forwardRef: true });

export default compose(withConnect, memo)(Header);
