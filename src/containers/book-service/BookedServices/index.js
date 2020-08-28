import React, { memo, useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect'
import { getPatientServices } from 'containers/book-service/actions';
import { setIsEdit, setEditType } from 'containers/reception/actions';
import { selectIsEdit } from 'containers/reception/selectors';
import {
	selectPatientServices,
} from 'containers/book-service/selectors';
import {
  selectHospitals,
  selectJobIds,
  selectEthnicityIds,
} from 'containers/reception/selectors';
import { selectPatient } from 'containers/reception/selectors';
import PatientInfo from 'containers/book-service/BookedServices/components/PatientInfo';
import ToolBar from 'containers/book-service/BookedServices/components/ToolBar';
import BookService from 'containers/book-service/BookServices';
import ReceptionForm from 'containers/reception/components/Middle/ReceptionForm/Container';
import Services from 'containers/book-service/Services';
import EventLayerWrapper from 'components/EventLayerWrapper';
import { Main, EditMain } from './styled';

const BookedServices = (props, ref) => {
	const [disabledButton, setDisabledButton] = useState({});

	const servicesRef = useRef(null);
	const bookServicesRef = useRef(null);
	const receptionDetailRef = useRef(null);
	const { getPatientServices, patientServices, patient, jobIds, hospitals, ethnicityIds, isEdit } = props;

	let { patientId } = useParams();

	useImperativeHandle(ref, () => ({
		savePatient
	}));

	useEffect(() => {
		if (patientId) {
			getPatientServices({ patientHistoryId: patientId, type: 1 });
		}
	}, [patientId]);

	const showBookServices = () => {
		const { show } = bookServicesRef.current;
		show();
	};

	const editPatient = (type) => () => {
		const { setIsEdit, setEditType } = props
		setEditType(type);
		setIsEdit(true)
	};

	const closeEdit = () => {
		const { setIsEdit, setEditType } = props
		setEditType(null);
		setIsEdit(false)
	};
	const savePatient = () => {
		receptionDetailRef.current.save()
	}

	const editServices = () => {
		const { showEditing } = servicesRef.current;
		showEditing(null, true)();
		showBookServices();
	};

	const removeService = () => {
		const { requestRemoveService } = servicesRef.current;
		requestRemoveService(null, true)();
	};

	const printReceptionForm = () => {
		const { printReceptionForm } = servicesRef.current;
		printReceptionForm();
	};

	const printSpecifyForm = () => {
		const { printAllService } = servicesRef.current;
		printAllService();
	};

	if (isEdit) {
		return (
			<EditMain>
				<div className={'edit-main-content'}>
					<EventLayerWrapper layerEvent={{ key: 'patientEdit', events: [] }}>
						<ReceptionForm
							ref={receptionDetailRef}
							closeEdit={closeEdit}
						/>
					</EventLayerWrapper>
				</div>
			</EditMain>
		)
	}

	return (
		<Main className='emr-small h-100'>
			<div className='main-content'>
				<PatientInfo
					editPatient={editPatient}
					patient={patient}
					ethnicityIds={ethnicityIds}
					jobIds={jobIds}
					hospitals={hospitals}
				/>

				<div className='d-flex flex-column flex-1 book-service-tab'>
					<div className='tab-service' style={{ marginLeft: 10 }}>
						<div className={`tab-service-item active`}>{'Dịch vụ'}</div>
					</div>
					<div className='main-info'>
						<ToolBar
							disabledButton={disabledButton}
							printReceptionForm={printReceptionForm}
							showBookServices={showBookServices}
							editServices={editServices}
							printSpecifyForm={printSpecifyForm}
							removeService={removeService}
						/>

						<Services ref={servicesRef} services={patientServices} patient={patient}/>
					</div>
				</div>
			</div>

			<BookService ref={bookServicesRef} />
		</Main>
	)
};

const mapState = createStructuredSelector({
	patientServices: selectPatientServices(),
	patient: selectPatient(),
	jobIds: selectJobIds(),
  ethnicityIds: selectEthnicityIds(),
	hospitals: selectHospitals(),
	isEdit: selectIsEdit(),
});

const mapDispatch = dispatch => ({
	getPatientServices: data => dispatch(getPatientServices(data)),
	setIsEdit: data => dispatch(setIsEdit(data)),
	setEditType: data => dispatch(setEditType(data)),
});

const withConnect = connect(
	mapState,
	mapDispatch,
	null,
	{ forwardRef: true }
);

export default compose(
	withConnect,
	memo,
)(forwardRef(BookedServices))
