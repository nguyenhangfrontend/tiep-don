import axios from 'axios';
import dataCacheProvider from 'data-access/datacache-provider';
import constants from 'resources/strings';
let getServerUrl = () => {
  let domain = window.location.origin;
  switch (domain) {
    case 'http://localhost:3000': //dev
      return 'https://api.emr.test.isofh.vn';
    case 'http://172.17.50.163:2390': //emr-web-dhy-production vpn
      return 'http://172.17.50.163:8983';
    case 'http://192.168.55.163:2390': // emr-web-dhy-production LAN 
      return 'http://192.168.55.163:8983';
    case 'https://emr.production.isofh.vn': //dhy
      return 'https://api.emr.production.isofh.vn';
    case 'http://10.0.0.94:2390': //stable
      return 'http://10.0.0.94:2301';
    case 'https://emr.stable.isofh.vn': //stable
      return 'https://api.emr.stable.isofh.vn';
    case 'https://emr.test.isofh.vn': //test
      return 'https://api.emr.test.isofh.vn';
    case 'http://10.0.0.94:2190': //emr-web-dhy-develop
      return 'http://10.0.0.94:2101';
    case 'https://emr.demo.isofh.vn': //test
      return 'https://api.emr.demo.isofh.vn';
    case 'http://10.0.0.94:2590': //demo
      return 'http://10.0.0.94:2501';

    default:
  }
};

const server_url = getServerUrl();
// const server_url = "http://10.0.0.86:5050"
// const server_url = "https://api.produce.isofhcare.com"; //release
// const server_url = "http://34.95.91.81"; //stable
const EMR_SOURCE = '/api/emr/v1/files/';
String.prototype.absoluteUrl =
  String.prototype.absolute ||
  function(defaultValue) {
    var _this = this.toString();
    if (_this == '')
      if (defaultValue != undefined) return defaultValue;
      else return _this;
    if (_this.startsWith('http') || _this.startsWith('blob')) {
      return _this;
    }
    if (
      _this.endsWith('.jpg') ||
      _this.endsWith('.png') ||
      _this.endsWith('.JPG') ||
      _this.endsWith('.PNG') ||
      _this.endsWith('.gif')
    ) {
      return server_url + EMR_SOURCE + _this + '';
    }
    if (
      !_this.endsWith('.jpg') ||
      !_this.endsWith('.png') ||
      _this.endsWith('.JPG') ||
      _this.endsWith('.PNG') ||
      !_this.endsWith('.gif')
    ) {
      return defaultValue;
    }
    // if(this.startsWith("user"))
    //     return
    return server_url + _this + '';
  };
String.prototype.getServiceUrl =
  String.prototype.absolute ||
  function(defaultValue) {
    if (this == '')
      if (defaultValue != undefined) return defaultValue;
      else return this;
    if (this.startsWith('http') || this.startsWith('blob')) {
      return this;
    }
    return server_url + this;
  };

String.prototype.replaceAllText = function(strTarget, strSubString) {
  var strText = this;
  var intIndexOfMatch = strText.indexOf(strTarget);
  while (intIndexOfMatch != -1) {
    strText = strText.replace(strTarget, strSubString);
    intIndexOfMatch = strText.indexOf(strTarget);
  }
  return strText;
};

export default {
  // auth: "eyJhbGciOiJSUzI1NiJ9.eyJyb2xlIjoiaXNvZmhDYXJlIiwiY3JlYXRlZCI6MTU1MzA3MDc0Mzc4NiwidHlwZSI6MCwidXNlcklkIjo1NX0.k8B3Cm5M-22ckpKk3W1fhgHoHq7LGVdKIjhLZUl0abKES5nSCC5RhupsRXctTK6skQMvCZ8f-TuZGbDcNgdlsb_Kc0ogFmaPmGI4ao7MKrCb9nCr4fxztUN0ABWUERA1wnQNFljgVR9FIrNKnf2hx_aTHIrwS9Ol1JOaKJVnj83cK5vg2ExvN7ralb1yoyuHEZoODlDBVHCIxeG5X3oaJE6-BKfcafXau_cmYz-Ovg31VtZpu1lCffaOj2uLSefPBvqfL2d2U1sswiUrV95rankTjOomr31lP4xiCN71-7YX_6Hx7EraRFhmclmaOjGUWM83VB0fvY8hIEHiE8yB8w",
  auth:
    dataCacheProvider.read('', constants.key.storage.current_tokenRole) || '',
  serverApi: server_url,
  response: {
    ok(data, message) {
      if (!message) message = '';
      return {
        success: true,
        data: data,
        message: message,
      };
    },
    noOk(message) {
      if (!message) message = '';
      return {
        success: false,
        message: message,
      };
    },
  },
  uploadFile(url, file) {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: 'Bearer ' + this.auth,
      },
    };
    return axios.post(url.getServiceUrl(), formData, config);
  },
  getTokenFromCode({ code, urlRedirect }) {
    var data = new FormData();
    data.append('redirect_uri', urlRedirect);
    data.append('grant_type', 'authorization_code');
    data.append('code', code);
    data.append('client_id', 'isofh');
    data.append('client_secret', 'isofh');
    return axios.post(`${server_url}/auth/oauth/token`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  requestApi(methodType, url, body) {
    return new Promise((resolve, reject) => {
      var dataBody = '';
      if (!body) body = {};
      // eslint-disable-next-line no-extend-native
      // Date.prototype.toJSON = function(){ return moment(this).format(); }
      dataBody = JSON.stringify(body);
      this.requestFetch(
        methodType,
        url && url.indexOf('http') == 0 ? url : url,
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.auth,
        },
        dataBody,
      )
        .then(s => {
          // ;
          s.json()
            .then(val => {
              resolve(val);
            })
            .catch(e => {
              reject(e);
            });
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  requestFetch(methodType, url, headers, body) {
    return new Promise((resolve, reject) => {
      let fetchParam = {
        method: methodType,
        headers,
      };
      if (methodType.toLowerCase() !== 'get') {
        fetchParam.body = body;
      }
      return fetch(url.getServiceUrl(), fetchParam)
        .then(json => {
          if (!json.ok) {
            reject(json);
          } else resolve(json);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  requestService(url) {
    return new Promise(function(resolve, reject) {
      axios
        .get(server_url + url)
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
};
