import constants from 'resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from 'utils/client-utils';

export default {
    getTechnicalService(type, fromApi) {
        return new Promise(async (resolve, reject) => {
            if (!fromApi) {
                var data = await datacacheProvider.read("", "DATA-TECHNICAL", [], true, true);
                if (data && data.length) {
                    this.getTechnicalService(type, true);
                    resolve(data);
                } else
                    this.getTechnicalService(type, true).then(s => {
                        resolve(s);
                    }).catch(e => {
                        resolve([]);
                    });
            }
            else {
                clientUtils.requestApi("get", constants.api.service.technical_services + "?type=" + type, {}).then(s => {
                    if (s.code == 0 && s.data && s.data.length != 0) {
                        datacacheProvider.save("", "DATA-TECHNICAL", s.data, true, true);
                        resolve(s.data);
                    }
                }).catch(e => {
                    resolve([]);
                })
            }
        });

    },
    getGroupService(fromApi) {
        return new Promise(async (resolve, reject) => {
            if (!fromApi) {
                var data = await datacacheProvider.read("", "DATA-GROUP-SERVICE", [], true, true);
                if (data && data.length) {
                    this.getGroupService(true);
                    resolve(data);
                } else
                    this.getGroupService(true).then(s => {
                        resolve(s);
                    }).catch(e => {
                        resolve([]);
                    });
            }
            else {
                clientUtils.requestApi("get", constants.api.service.service_group, {}).then(s => {
                    if (s.code == 0 && s.data && s.data.length != 0) {
                        datacacheProvider.save("", "DATA-GROUP-SERVICE", s.data, true, true);
                        resolve(s.data);
                    }
                }).catch(e => {
                    resolve([]);
                })
            }
        });
    },
    getDataUom() {
        return new Promise(async (resolve, reject) => {
            let obj = {}
            try {
                let services = await this.getTechnicalService(1)
                services.forEach(item => {
                    obj[item.id] = item.uom;
                })
                resolve(obj)
            } catch (error) {
                resolve(obj)
            }
        });
    }

}