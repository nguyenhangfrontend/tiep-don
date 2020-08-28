import React, { memo, useEffect } from 'react'
import Services from 'utils/IndexedDB/Services';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useParams } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/saga/injectSaga'
import BookService from './BookedServices';
import ServicesDB from "utils/IndexedDB/Services";
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import { fetchPatient } from 'containers/reception/actions';
import { prefix } from './constants';

const HookWrapper = (props) => {
	useInjectReducer({ key: prefix, reducer });
	useInjectSaga({ key: prefix, saga });
	let { patientId } = useParams();

	const {
		getDepartments, getUsers, getTechnicalServices, getBiopsyLocations, getDyeMethods,
		fetchPatient, updateTechnicalServices,
	} = props;

	const catchTechnicalServices = (data) => {
		updateTechnicalServices(data);
	};

	useEffect(() => {
		getDepartments();
		getUsers();
		getDyeMethods();
		getBiopsyLocations();
		getTechnicalServices({ type: 1 });

		const getServiceFromDb = data => {
			updateTechnicalServices(data);
		};

		Services.getAll(getServiceFromDb);
	}, []);

	useEffect(() => {
		fetchPatient({ patientId });
	}, [patientId]);

	return (
		<BookService {...props} />
	);
};

const mapDispatchToProps = (dispatch) => ({
	getUsers: data => dispatch(actions.getUsers(data)),
	getDepartments: data => dispatch(actions.getDepartments(data)),
	getTechnicalServices: data => dispatch(actions.getTechnicalServices(data)),
	fetchPatient: data => dispatch(fetchPatient(data)),
	getBiopsyLocations: data => dispatch(actions.getBiopsyLocations(data)),
	getDyeMethods: data => dispatch(actions.getDyeMethods(data)),
	updateTechnicalServices: data => dispatch(actions.updateTechnicalServices(data)),
});

const withConnect = connect(
	null,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(HookWrapper)
