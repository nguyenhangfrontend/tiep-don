import client from '../utils/client-utils';
import constants from '../resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from '../utils/client-utils';
export default {
    getAllRoomReception(fromApi) {
        return new Promise((resolve, reject) => {
            if (!fromApi) {
                var data = datacacheProvider.read("", "DATA-ROOM-RECEPTION", [], true, true);
                if (data && data.length) {
                    this.getAllRoomReception(true);
                    resolve(data);
                } else
                    this.getAllRoomReception(true).then(s => {
                        resolve(s);
                    }).catch(e => {
                        resolve([]);
                    });
            }
            else {
                clientUtils.requestApi("get", constants.api.room.search_reception_room, {}).then(s => {
                    if (s.code === 0) {
                        datacacheProvider.save("", "DATA-ROOM-RECEPTION", s.data, true, true);
                        resolve(s.data);
                    }
                    resolve([]);
                }).catch(e => {
                    resolve([]);
                });
            }
        })
    },
    getAll(fromApi) {
        return new Promise((resolve, reject) => {
            if (!fromApi) {
                var data = datacacheProvider.read("", "DATA-ROOM", [], true, true);
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
                clientUtils.requestApi("get", constants.api.room.get_all, {}).then(s => {
                    if (s.code === 0) {
                        datacacheProvider.save("", "DATA-ROOM", s.data, true, true);
                        resolve(s.data);
                    }
                    resolve([]);
                }).catch(e => {
                    resolve([]);
                });
            }
        })
    },
    service_rooms(patientHistoryId, serviceIds) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", `${constants.api.room.service_rooms}?serviceIds=${serviceIds.join(',')}&patientHistoryId=${patientHistoryId}`, {}).then(s => {
                if (s.code === 0) {
                    resolve(s.data);
                }
                resolve([]);
            }).catch(e => {
                resolve([]);
            });

        })
    }
}   
