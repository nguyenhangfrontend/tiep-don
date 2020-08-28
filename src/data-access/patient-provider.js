import constants from 'resources/strings';
import clientUtils from 'utils/client-utils';

export default {
    getDetailPatientHistory(id) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi('get', `${constants.api.patients.detailValue}/${id}`).then(s => {
                resolve(s);
            }).catch(e => {
                reject(e);
            })
        });
    },
    getListPationHistories(id) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi('get', `${constants.api.patients.histories}/${id}`).then(s => {
                resolve(s);
            }).catch(e => {
                reject(e);
            })
        });
    },

    getPatients(counterId, value) {

        let queries = '?';

        queries += `counterId=${counterId}&`;
        if (value) {
            value = encodeURI(value)
            queries += `value=${value}&`;
        }

        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.patients.search + queries, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
    getByIdNo(patientIdNo) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi('get', `${constants.api.patients.detailPatientIdNo}/?idNo=${patientIdNo}`).then(s => {
                resolve(s);
            }).catch(e => {
                reject(e);
            })
        });
    },
    getByPatientValue(patientValue) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi('get', `${constants.api.patients.detailValue}/?patientValue=${patientValue}`).then(s => {
                resolve(s);
            }).catch(e => {
                reject(e);
            })
        });
    },
    updatePatientHistory(object) {

        return new Promise((resolve, reject) => {
            clientUtils.requestApi("put", constants.api.patients.createOrUpdate, object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
    createPatientHistory(object) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("post", constants.api.patients.createOrUpdate, object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
}