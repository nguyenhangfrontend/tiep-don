import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty, isEqual  } from 'lodash';
import {
  selectPatient,
  selectPatients,
  selectCounters,
  selectPatientsAll,
} from 'containers/reception/selectors';
import ModalConfirm from 'components/Modal/Confirm';
import { ModalAction } from 'components/Modal';
import {
  fetchPatients,
  fetchPatient,
  fetchCounter,
  openCloseCounter,
  fetchPatientsAll,
} from '../../actions';
import { selectUserApp } from 'reducers/selectors';
import View from './View';
import { combinePatientType } from './utils';
import { withRouter } from 'react-router-dom';

class LeftSide extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loading: false,
      isSelectAllCounter: false,
      counter: {},
      activeCounter: false,
      valueSearch: '',
    };
  }

  componentDidMount() {
    const { fetchPatients, fetchPatientsAll } = this.props;
    const counterStr = localStorage.getItem('counter');

    const counterId = counterStr ? JSON.parse(counterStr).id : '';
    if (counterStr) {
      this.setState({ counter: JSON.parse(counterStr) });
      this.changeActiveFilter(!!counterId);
    }

    const params = { counterId };

    fetchPatients({ params });
    fetchPatientsAll(0);
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.user.currentUser, nextProps.user.currentUser)){
      const { user, fetchCounter } = nextProps;
      const departmentId = !isEmpty(user.currentUser.department) &&
        user.currentUser.department.id;
      fetchCounter({ departmentId });
    }
  }

  selectAllCounter = isSelectAllCounter => {
    const { fetchPatients } = this.props;
    const { counter } = this.state;

    if (isSelectAllCounter) {
      const counterId = 0;
      const params = { counterId };
      fetchPatients({ params });
    } else {
      const counterId = counter ? counter.id : '';
      const params = { counterId };
      fetchPatients({ params });
    }

    this.setState({ isSelectAllCounter });
  };

  changeCounter = counter => {
    const { fetchPatients, openCloseCounter } = this.props;

    localStorage.setItem('counter', JSON.stringify(counter));
    const counterId = counter.id;
    const params = { counterId };
    localStorage.setItem('isOpenCounter', JSON.stringify(true));
    const isOpenCounter = true;
    // const isOpenCounter = !this.props.isOpenCounter;
    this.changeActiveFilter(true);
    const paramOpenCounter = { id: counterId, available: isOpenCounter };
    if (isOpenCounter) {
      openCloseCounter({
        paramOpenCounter,
        callBack: fetchPatients({ params }),
      });
    }

    this.setState({ counter });
  };

  changeSearch = value => {
    this.setState({ value });
  };

  changeActiveFilter = activeCounter => {
    this.setState(
      {
        activeCounter,
        isSelectAllCounter: false,
      },
      () => {
        const { fetchPatients } = this.props;
        const { activeCounter } = this.state;
        let isOpenCounter;
        if (activeCounter) {
          isOpenCounter = true;
        } else {
          isOpenCounter = false;
        }
        const counterStr = localStorage.getItem('counter');
        localStorage.setItem('isOpenCounter', JSON.stringify(isOpenCounter));
        const counterId = counterStr ? JSON.parse(counterStr).id : '';
        const params = counterId;
        const paramOpenCounter = { id: counterId, available: isOpenCounter };
        if (isOpenCounter) {
          openCloseCounter({ paramOpenCounter });
        }
      },
    );
  };

  getPatientSuccessCallback = () => {
    const { valueSearch } = this.state;
    const { patientsAll, fetchPatient, patients, history } = this.props;

    const valueFormat = valueSearch
      .trim()
      .unsignText()
      .toLocaleUpperCase();

    const skipingPatientsAll = patientsAll.filter(item => item.status === 30);
    const recievedPatientsAll = patientsAll.filter(item => item.status === 40);

    const skipingPatients = patients.filter(item => item.status === 30);
    const recievedPatients = patients.filter(item => item.status === 40);

    const patientDoccuments = recievedPatientsAll.map(
      item => item.patientDocument,
    );
    const sequenceNos = skipingPatientsAll.map(item => item.sequenceNo);

    if (sequenceNos.includes(valueFormat)) {
      fetchPatient({ receptionId: skipingPatients[0].receptionId });
    }
    if (
      patientDoccuments.includes(valueFormat) ||
      recievedPatients.length === 1
    ) {
      history.push(`/admin/tiep-don/${recievedPatients[0].id}`);
    }
  };

  getPatients = e => {
    const { fetchPatients } = this.props;
    const { value, counter } = this.state;
    const counterId = counter.id ? counter.id : '';
    this.setState({
      valueSearch: e.target.value,
    });
    if (e.key === 'Enter') {
      const params = { value, counterId };
      fetchPatients({ params, callback: this.getPatientSuccessCallback });
    }
  };

  selectRow = row => () => {
    const { fetchPatient } = this.props;
    fetchPatient({
      receptionId: row.receptionId,
      patientId: row.receptionId ? null : row.id,
    });
  };

  render() {
    const { loading, patients, counters, patient, visible } = this.props;
    return (
      <>
        <View
          {...this.state}
          patient={patient}
          counters={counters}
          changeSearch={this.changeSearch}
          changeActiveFilter={this.changeActiveFilter}
          patients={combinePatientType(patients)}
          selectAllCounter={this.selectAllCounter}
          changeOpenClose={this.changeOpenClose}
          changeCounter={this.changeCounter}
          getPatients={this.getPatients}
          selectRow={this.selectRow}
          visible={visible}
        />
      </>
    );
  }
}

LeftSide.defaultProps = {
  patient: {},
  patients: [],
  counters: [],
};

LeftSide.propTypes = {
  patient: T.shape({}),
  patients: T.arrayOf(T.shape({})),
  counters: T.arrayOf(T.shape({})),
};

const mapState = createStructuredSelector({
  patient: selectPatient(),
  patients: selectPatients(),
  patientsAll: selectPatientsAll(),
  counters: selectCounters(),
  user: selectUserApp(),
});

const mapDispatch = dispatch => ({
  showConfirmModal: modalProps => {
    const modalType = ModalConfirm;
    dispatch(ModalAction.showModal({ modalType, modalProps }));
  },
  fetchPatient: data => dispatch(fetchPatient(data)),
  fetchPatients: data => dispatch(fetchPatients(data)),
  openCloseCounter: data => dispatch(openCloseCounter(data)),
  fetchCounter: data => dispatch(fetchCounter(data)),
  fetchPatientsAll: data => dispatch(fetchPatientsAll(data)),
});

export default connect(mapState, mapDispatch)(withRouter(LeftSide));
