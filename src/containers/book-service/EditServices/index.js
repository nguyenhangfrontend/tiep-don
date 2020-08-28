import React, { useEffect, memo, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
	selectEditData, selectDyeMethods, selectServices,
	selectUsers, selectDepartments, selectBiopsyLocations
} from 'containers/book-service/selectors';
import { selectPatient } from 'containers/reception/selectors';
import { selectDepartment } from 'reducers/selectors';
import { getServiceRooms, editService, addService } from 'containers/book-service/actions';
import { columns } from 'containers/book-service/EditServices/constants';
import { getTechnicalService } from './utils';
import View from './View';

const EditServices = (props) => {
	const {
		type, editData, getServiceRooms, patient, technicalServices, addService,
		dyeMethods, users, departments, biopsyLocations, department, editService
	} = props;

	const tableRef = useRef(null);

	useEffect(() => {
		getServiceRooms({
			serviceIds: editData.services.map(item => item.serviceId).join(','),
			patientHistoryId: patient.id
		});
	}, []);

	const submitEdit = () => {
		const data = {
			serviceInHospital: true,
			docDate: new Date(),
			actDate: new Date(),
			fromDepartmentId: department.value,
			createdFromRecordId: patient.id,
			patientHistoryId: patient.id,
			createdFromServiceType: 200,
		};

		const services = tableRef.current.collect();
		const body = services
			.filter(item => !!item.serviceId)
			.map(item => type === 'booking' ? ({ ...item, ...data, id: null }) : item);

		type === 'booking' ? addService(body) : editService(body);
	};

	return (
		<View
			type={type}
			errors={editData.errors}
			group={editData.group}
			sequences={editData.sequences}
			rooms={editData.rooms}
			services={getTechnicalService(editData.services, technicalServices)}
			tableRef={tableRef}
			columns={columns}
			technicalServices={technicalServices}
			dyeMethods={dyeMethods}
			users={users}
			departments={departments}
			biopsyLocations={biopsyLocations}
			submitEdit={submitEdit}
		/>
	);
};

const mapState = createStructuredSelector({
	editData: selectEditData(),
	patient: selectPatient(),
	dyeMethods: selectDyeMethods(),
	technicalServices: selectServices(),
	users: selectUsers(),
	departments: selectDepartments(),
	biopsyLocations: selectBiopsyLocations(),
	department: selectDepartment(),
});

const mapDispatch = (dispatch) => ({
	getServiceRooms: data => dispatch(getServiceRooms(data)),
	editService: data => dispatch(editService(data)),
	addService: data => dispatch(addService(data)),
});

const withConnect = connect(
	mapState,
	mapDispatch,
);

export default compose(
	withConnect,
	memo,
)(EditServices)
