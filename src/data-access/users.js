import constants from 'resources/strings'
import request from 'utils/request'

export const fetchUsers = (data) => {
	return request(constants.api.user.getAll, {
		params: { ...data },
	})
};

export const fetchPatient = (data) => {
	return request(`${constants.api.patients.detailValue}/${data.patientId}`, {})
};

export const fetchWaitingPatient = (data) => {
	return request(`${constants.api.reception.detail}/${data.receptionId}`, {})
};

export const fetchPatients = data => {
	return request(constants.api.patients.search, {
		// params: counterId, value
		params: { ...data },
	})
};
