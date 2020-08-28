import clientUtils from '../utils/client-utils';
import constants from '../resources/strings';

export default {
    technical_services(obj) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("post", constants.api.patient_service.technical_services, obj).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
    get_technical_service(patientHistoryId) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", `${constants.api.patient_service.technical_services}?type=1&patientHistoryId=${patientHistoryId}`, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
    remove_technical_service(services, patientHistoryId) {
        return new Promise((resolve, reject) => {
            let data = services.map(item => {
                return {
                    id: item.id,
                    patientHistoryId
                }
            });
            clientUtils.requestApi("delete", `${constants.api.patient_service.technical_services}`, data).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
    });
}

}