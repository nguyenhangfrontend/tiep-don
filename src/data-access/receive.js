import constants from 'resources/strings';
import request from 'utils/request';

export const fetchEthnicity = data => {
  return request(constants.api.patients.ethnicities, {
    params: { ...data },
  });
};

export const fetchHospital = data => {
  return request(constants.api.patients.hospital, {
    params: { ...data },
  });
};

export const fetchJobs = data => {
  return request(constants.api.patients.jobs, {
    params: { ...data },
  });
};

export const receptionForm = data => {
  return request(constants.api.reception.reception_form, {
    params: { ...data },
  });
};
export const fetchCountry = data => {
  return request(constants.api.patients.countries, {
    params: { ...data },
  });
};
export const fetchProvince = data => {
  return request(constants.api.patients.provinces, {
    params: { ...data },
  });
};
export const fetchDistrict = data => {
  return request(constants.api.patients.districts, {
    params: { ...data },
  });
};

export const fetchZone = data => {
  return request(constants.api.patients.zones, {
    params: { ...data },
  });
};

export const createPatient = data => {
  return request(constants.api.patients.createOrUpdate, {
    data,
    method: 'post',
  });
};

export const editPatient = data => {
  return request(constants.api.patients.createOrUpdate, {
    data,
    method: 'put',
  });
};

export const fetchCounter = data => {
  return request(constants.api.counter.get_all, {
    params: { ...data },
  });
};

export const getPatientValue = data => {
  return request(constants.api.patients.detailValue, {
    params: { patientValue: data },
  });
};
export const checkDupplicatePhone = data => {
  return request(constants.api.patients.detailPatientPhone, {
    params: { phone: data },
  });
};
export const checkDupplicateIdNo = data => {
  return request(constants.api.patients.detailPatientIdNo, {
    params: { IdNo: data },
  });
};
export const checkDupplicateInsuranceNumber = data => {
  return request(constants.api.patients.detailPatientInsurance, {
    params: { insuranceNumber: data },
  });
};

export const checkBarcodeInsurance = data => {
  return request(constants.api.patients.barcodeInsurance, {
    data,
    method: 'post',
  });
};
export const checkPortalInsurance = data => {
  return request(constants.api.patients.InfoPortalInsurance, {
    data,
    method: 'post',
  });
};
export const uploadImage = data => {
  return request(constants.api.image.upload, {
    data: { file: data },
    method: 'post',
    contentType: 'multipart/form-data',
  });
};
export const scanId = data => {
  return request(constants.api.image.scanID, {
    data: { file: data },
    method: 'post',
    contentType: 'multipart/form-data',
  });
};
export const checkPatientMultipeSuggest = data => {
  return request(constants.api.patients.suggestions, {
    params: { ...data },
  });
};
export const getImage = data => {
  return request(constants.api.patients.avatar, {
    params: { ...data },
  });
};
export const nextPatient = (data) => {
	
	return request(constants.api.patients.next, {
		
		data,
		method: 'post',
	})
};

export const openCloseCounter = data => {
  return request(constants.api.patients.openCloseCounter, {
    data,
    method: 'post',
  });
};

