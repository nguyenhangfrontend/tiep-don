import ServicesDB from 'utils/IndexedDB/Services';
import ServicesGroupLv1 from 'utils/IndexedDB/ServicesGroupLv1';
import ServicesGroupLv2 from 'utils/IndexedDB/ServicesGroupLv2';
import ServicesGroupLv3 from 'utils/IndexedDB/ServicesGroupLv3';
import Uom from 'utils/IndexedDB/Uom';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDepartments } from 'data-access/department';
import { toast } from 'react-toastify';
import { fetchUsers } from 'data-access/users';
import { fetchServices, fetchPatientServices, removeServices, addServices } from 'data-access/services';
import { fetchDyeMethods, fetchBiopsyLocations } from 'data-access/resources';
import { fetchRoomsByServiceId } from 'data-access/rooms';
import ErrorDeleteModal from './components/ErrorDeleteModal';
import EditServices from './EditServices';
import * as types from './constants';
import * as actions from './actions'
import { showModal, hideModal } from 'components/Modal/RootModal/actions';
import { combineError, objectToArray } from 'containers/book-service/utils';

export function* departments({ payload }) {
	try {
		const res = yield call(fetchDepartments, payload);
		yield put(actions.getDepartmentsSuccess(res.data))
	} catch (err) {
		yield put(actions.fetchFailure(err))
	}
}

export function* users({ payload }) {
	try {
		const res = yield call(fetchUsers, payload);
		yield put(actions.getUsersSuccess(res.data))
	} catch (err) {
		yield put(actions.fetchFailure(err))
	}
}

export function* services({ payload }) {
	try {
		const res = yield call(fetchServices, payload);
		const serviceGroupLv1 = {};
		const serviceGroupLv2 = {};
		const serviceGroupLv3 = {};
		const uom = {};

		res.data.forEach(item => {
			if (item.serviceGroupLevel1Id) {
				serviceGroupLv1[item.serviceGroupLevel1Id] = item.serviceGroupLevel1;
			}
			if (item.serviceGroupLevel2Id) {
				serviceGroupLv2[item.serviceGroupLevel2Id] = item.serviceGroupLevel2;
			}
			if (item.serviceGroupLevel3Id) {
				serviceGroupLv3[item.serviceGroupLevel3Id] = item.serviceGroupLevel3;
			}
			if (item.uomId) {
				uom[item.uomId] = item.uom;
			}
		});

		ServicesDB.putMore(res.data);
		ServicesGroupLv1.putMore(objectToArray(serviceGroupLv1));
		ServicesGroupLv2.putMore(objectToArray(serviceGroupLv2));
		ServicesGroupLv3.putMore(objectToArray(serviceGroupLv3));
		Uom.putMore(objectToArray(uom));

		yield put(actions.updateTechnicalServices(res.data))
	} catch (err) {
		yield put(actions.fetchFailure(err))
	}
}

export function* patientServices({ payload }) {
	try {
		const res = yield call(fetchPatientServices, payload);
		yield put(actions.getPatientServicesSuccess(res.data || []))
	} catch (err) {
		yield put(actions.fetchFailure(err))
	}
}


export function* getDyeMethods({ payload }) {
	try {
		const res = yield call(fetchDyeMethods, payload);
		yield put(actions.getDyeMethodsSuccess(res.data))
	} catch (err) {
		yield put(actions.fetchFailure(err))
	}
}

export function* getBiopsyLocations({ payload }) {
	try {
		const res = yield call(fetchBiopsyLocations, payload);
		yield put(actions.getBiopsyLocationsSuccess(res.data))
	} catch (err) {
		yield put(actions.fetchFailure(err))
	}
}



export function* removeService({ payload }) {
	try {
		const res = yield call(removeServices, payload);
		const response = res.data.reduce((result, next) => ({
			success: next.code === 0 ? [...result.success, next] : result.success,
			errors: next.code !== 0 ? [...result.errors, next] : result.errors,
		}), { success: [], errors: [] });

		if (response.errors.length === 0) {
			toast.success('Xoá dịch vụ thành công!');
		}

		if (response.errors.length > 0) {
			yield put(showModal({
				modalType: ErrorDeleteModal,
				modalProps: { success: response.success.length, errors: response.errors }
			}));
		}

		yield put(actions.removePatientServicesSuccess(response.success));
	} catch (err) {
		yield put(actions.fetchFailure(err))
	}
}

export function* getServiceRooms({ payload }) {
	try {
		const res = yield call(fetchRoomsByServiceId, payload);
		yield put(actions.getServiceRoomsSuccess(res.data))
	} catch (err) {
		yield put(actions.fetchFailure(err))
	}
}

export function* editServices({ payload }) {
	try {
		const res = yield call(addServices, payload);
		const success = res.data.filter(item => item.code === 0);
		const errors = res.data.filter(item => item.code !== 0);
		yield put(actions.editServiceSuccess({ success, errors }));

		if (errors.length < 1) {
			toast.success('Chỉnh sửa dịch vụ hoàn tất!');
			yield put(hideModal());
			yield put(actions.clearEditData());
		} else {
			const option = {
				errors: combineError(errors, payload),
			};
			yield put(actions.openEditService(option));
		}

	} catch (err) {
		yield put(actions.fetchFailure(err))
	}
}

export function* addPatientService({ payload }) {
	try {
		const res = yield call(addServices, payload.services);
		const success = res.data.filter(item => item.code === 0);
		const errors = res.data.filter(item => item.code !== 0);

		if (errors.length < 1) {
			toast.success('Kê dịch vụ thành công!');
			yield put(hideModal());
			yield put(actions.clearEditData());
			payload.callBack2();
		}

		yield put(actions.addServiceSuccess({ success, errors }));

		if (errors.length === 1) {
			const modalType = EditServices;
			const modalProps = {
				type: 'booking',
				callBackWithCustomClose: yield put(actions.clearEditData())
			};
			const services = payload.filter(item => item.serviceId === errors[0]['serviceId']);

			const option = {
				group: { type: services[0]['serviceType'] },
				services: services.map(item => ({ ...item, key: item.serviceId, parent: 0 })),
				sequences: [{ sequenceGroupNo: 0 }],
				errors: combineError(errors, payload),
			};
			yield put(actions.openEditService(option));
			yield put(showModal({ modalType, modalProps }))
		}

		if (errors.length > 1) {
			const modalType = ErrorDeleteModal;
			const modalProps = {
				headMessage: 'Kê thành công',
				bodyMessage: 'Không kê được',
				errors: combineError(errors, payload),
			};

			yield put(showModal({ modalType, modalProps }))
		}
	} catch (err) {
		yield put(actions.fetchFailure(err))
	}
}

export default function* bookServices() {
	yield takeLatest(types.UPDATE_DEPARTMENT, departments);
	yield takeLatest(types.USERS, users);
	yield takeLatest(types.TECHNICAL_SERVICE, services);
	yield takeLatest(types.PATIENT_SERVICE, patientServices);
	yield takeLatest(types.REMOVE_PATIENT_SERVICE, removeService);
	yield takeLatest(types.FETCH_DYE_METHODS, getDyeMethods);
	yield takeLatest(types.FETCH_BIOPSY_LOCATIONS, getBiopsyLocations);
	yield takeLatest(types.FETCH_SERVICE_ROOMS, getServiceRooms);
	yield takeLatest(types.EDIT_SERVICE_CALL, editServices);
	yield takeLatest(types.ADD_SERVICE, addPatientService);
}
