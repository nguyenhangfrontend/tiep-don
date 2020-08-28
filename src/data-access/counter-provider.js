import constants from 'resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from 'utils/client-utils';

export default {
    getCounters(departmentId) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.counter.get_all + '?departmentId=' + departmentId, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    }
}