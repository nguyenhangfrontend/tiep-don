import constants from 'resources/strings'
import request from 'utils/request'

export const fetchServices = (data) => {
	return request(constants.api.service.technical_services, {
		params: { ...data },
	})
};

export const fetchPatientServices = (data) => {
	return request(constants.api.patient_service.technical_services, {
		params: { ...data },
	})
};

export const removeServices = data => {
	return request(constants.api.patient_service.technical_services, {
		data,
		method: 'delete',
	})
};

export const addServices = (data) => {
	return request(constants.api.patient_service.technical_services, {
		data,
		method: 'post',
	})
};
