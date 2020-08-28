var CryptoJS = require("crypto-js");
export default {
    save(userId, key, value, ignoreEncrypt, saveLargeData) {
        return new Promise(async (resolve, reject) => {
            try {
                var data = {
                    value
                };
                if (!saveLargeData) {

                    if (ignoreEncrypt) {
                        localStorage.setItem(userId + "_" + key, JSON.stringify(data));
                    } else {
                        let data2 = CryptoJS.AES.encrypt(JSON.stringify(data), "ISOFHCARE");
                        localStorage.setItem(userId + "_" + key, data2.toString());
                    }
                    resolve(true);
                }
                else {
                    let storage = window.storage;

                    // Await initialization of the storage area
                    // let grantedCapacity = await storage.initialized;
                    try {
                        if (ignoreEncrypt) {
                            storage.setContents(userId + "_" + key, JSON.stringify(data)).then(function () {
                                resolve(true);
                            }).catch(error => {
                                reject(error);
                            });
                        } else {
                            let data2 = CryptoJS.AES.encrypt(JSON.stringify(data), "ISOFHCARE");
                            storage.setContents(userId + "_" + key, data2.toString()).then(function () {
                                resolve(true);
                            }).catch(error => {
                                reject(error);
                            });
                        }
                    } catch (error) {
                        reject(error);
                    }
                }
            } catch (error) {
                reject(error);
            }
        })
    },
    read(userId, key, defaultValue, ignoreEncrypt, readLargeData) {
        if (!readLargeData) {
            if (localStorage.hasOwnProperty(userId + "_" + key)) {
                var item = localStorage.getItem(userId + "_" + key);
                if (!ignoreEncrypt) {
                    item = CryptoJS.AES.decrypt(item, "ISOFHCARE").toString(CryptoJS.enc.Utf8);
                }
                if (item)
                    try {
                        var data = JSON.parse(item);
                        if (data && data.value) {
                            return data.value;
                        }
                    } catch (error) {
                    }
            }
            return (defaultValue);
        } else {
            return new Promise(async (resolve, reject) => {
                let storage = window.storage;
                // let grantedCapacity = await storage.initialized;
                storage.getContents(userId + "_" + key).then(function (content) {
                    let item = content;
                    if (!ignoreEncrypt) {
                        item = CryptoJS.AES.decrypt(content, "ISOFHCARE").toString(CryptoJS.enc.Utf8);
                    }
                    if (item)
                        try {
                            var data = JSON.parse(item);
                            if (data && data.value) {
                                resolve(data.value);
                            }
                            else {
                                resolve(defaultValue);
                            }
                        } catch (error) {
                            resolve(defaultValue);
                        }
                }).catch(err => {
                    resolve(defaultValue)
                });
            });
        }
    }
}
