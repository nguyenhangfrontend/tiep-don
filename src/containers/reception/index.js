import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import 'react-datepicker/dist/react-datepicker.css';
import Reception from './Reception';
import LeftSideBar from './components/LeftSide';
import RightSideBar from './components/RightSideBar';
import serviceProvider from 'data-access/service-provider';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/saga/injectSaga';
import constants from 'resources/strings';
import reducer from './reducer';
import Loading from 'components/Loading';
import {
  fetchRooms,
  getJobs,
  getHospitals,
  getEthnicity,
  getCountry,
  getDistricts,
  getZones
} from './actions';
import saga from './saga';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { prefix } from './constants';

import {
  selectLoadingLeft,
  selectLoadingMiddle,
  selectLoadingRight,
  selectLoadingAll,
} from 'containers/reception/selectors';

export function ReceptionMain(props) {
  const {
    fetchRooms,
    dispatch,
    getJobs,
    getHospitals,
    getEthnicity,
    getCountry,
    getDistricts,
    isLoadingLeft,
    isLoadingMiddle,
    isLoadingAll,
    getZones
  } = props;

  useInjectReducer({ key: prefix, reducer });
  useInjectSaga({ key: prefix, saga });

  const [globalState, setglobalState] = useState({
    openSibarRight: false,
  });

  const toggleSibarRight = () => {
    const newState = {
      ...globalState,
      openSibarRight: !globalState.openSibarRight,
    };
    setglobalState(newState);
  };

  useEffect(() => {
    fetchRooms();
    getJobs();
    getHospitals();
    getEthnicity();
    getCountry();
    getDistricts();
    getZones();
    // TODO
    serviceProvider
      .getTechnicalService(1)
      .then(s => {
        let obj = {};
        s.forEach(item => {
          if (!obj[item.serviceType]) obj[item.serviceType] = [];
          obj[item.serviceType].push(item);
        });
        dispatch({
          type: constants.action.action_set_services,
          value: obj,
        });
      })
      .catch(e => {});
  }, []);

  return (
    <section
      className={`emr-section ${
        !globalState.openSibarRight ? 'responive' : ''
      }`}
    >
      <Loading visible={isLoadingAll}>
        <button
          onClick={toggleSibarRight}
          className="icon-close-main close-sidebar-right"
        >
          <i className="fa fa-angle-up" aria-hidden="true"></i>
        </button>
        <div className="container-fluid">
          <div className="row flex-content">
            <div className={`col-md-3 custom-col3 pr-0`}>
             
                <LeftSideBar />
              
            </div>
            <div className="col-md-6 width62 pr-0">
              
                <MessengerCustomerChat
                  pageId="1381360718853960"
                  appId="398569107179016"
                  htmlRef="xxx"
                />

                <Reception />
             
            </div>
            <div
              className={`col-md-3 custom-col3 responive-sidebar ${
                !globalState.openSibarRight ? 'responive-sidebar-active' : ''
              }`}
            >
              <RightSideBar />
            </div>
          </div>
        </div>
      </Loading>
    </section>
  );
}

const mapState = createStructuredSelector({
  isLoadingLeft: selectLoadingLeft(),
  isLoadingRight: selectLoadingRight(),
  isLoadingMiddle: selectLoadingMiddle(),
  isLoadingAll: selectLoadingAll(),
});

const mapDispatch = dispatch => ({
  dispatch,
  fetchRooms: data => dispatch(fetchRooms(data)),
  getJobs: data => dispatch(getJobs(data)),
  getHospitals: data => dispatch(getHospitals(data)),
  getEthnicity: data => dispatch(getEthnicity(data)),
  getCountry: data => dispatch(getCountry(data)),
  getDistricts: data => dispatch(getDistricts(data)),
  getZones: data => dispatch(getZones(data)),

});

const withConnect = connect(mapState, mapDispatch, null, {
  forwardRef: true,
});

export default compose(withConnect, memo)(ReceptionMain);
