import client from '../utils/client-utils';
import constants from '../resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from '../utils/client-utils';

var md5 = require('md5');
export default {
    getAll(fromApi) {
        return new Promise((resolve, reject) => {
            if (!fromApi) {
                var data = datacacheProvider.read("", "DATA-DEPARTMENT", []);
                if (data && data.length) {
                    this.getAll(true);
                    resolve(data);
                } else
                    this.getAll(true).then(s => {
                        resolve(s);
                    }).catch(e => {
                        resolve([]);
                    });
            }
            else {
                clientUtils.requestApi("get", constants.api.department.get_all, {}).then(s => {
                    if (s.code === 0) {
                        datacacheProvider.save("", "DATA-DEPARTMENT", s.data);
                        resolve(s.data);
                    }
                    resolve([]);
                }).catch(e => {
                    resolve([]);
                });
            }
        })
    },
    getById(id) {
        return new Promise((resolve, reject) => {
            this.getAll().then(s => {
                if (s && s.length) {
                    resolve(s.find(item => item.id == id) || {});
                }
                resolve({})
            })
        })
    }
}   