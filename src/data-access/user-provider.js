import request from 'utils/request';
import constants from '../resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from '../utils/client-utils';

var md5 = require('md5');
export default {
  getAccountStorage() {
    var user = datacacheProvider.read(
      '',
      constants.key.storage.current_account,
    );
    return user;
  },
  getTokenStorage() {
    var user = datacacheProvider.read(
      '',
      constants.key.storage.current_tokenRole,
    );
    return user;
  },
  saveAccountStorage(account) {
    return datacacheProvider.save(
      '',
      constants.key.storage.current_account,
      account,
    );
  },
  getUserInfo(accessToken) {
    return request(constants.api.auth.userInfo, { accessToken });
  },
  login(usernameOrEmail, password) {
    let object = {
      usernameOrEmail,
      password: password,
    };
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('post', constants.api.auth.login, object)
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  selectRole(object) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('post', `${constants.api.auth.role}`, object)
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  updatePassword(id, object) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('put', constants.api.user.updatePassword + '/' + id, object)
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  create(object) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('post', constants.api.user.create, object)
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  update(id, object) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('put', constants.api.user.update + '/' + id, object)
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  block(id, object) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('put', constants.api.user.block + '/' + id, object)
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  active(id, object) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('put', constants.api.user.active + '/' + id, object)
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  getDetail(id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('get', constants.api.user.detail + '/' + id)
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  getTokenFromCode(code) {
    return new Promise((resolve, reject) => {
      clientUtils
        .getTokenFromCode(code)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
