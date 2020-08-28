import client from "../utils/client-utils";
import stringUtils from "mainam-react-native-string-utils";
import constants from "../resources/strings";
import datacacheProvider from "./datacache-provider";
import clientUtils from "../utils/client-utils";

export default {
  getEthnicities() {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.patients.ethnicities, {})
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  getCountries(fromApi) {
    return new Promise((resolve, reject) => {
      if (!fromApi) {
        var data = datacacheProvider.read("", "DATA-COUNTRY", [], true, true);
        if (data && data.length) {
          this.getCountries(true);
          resolve(data);
        } else
          this.getCountries(true)
            .then(s => {
              resolve(s);
            })
            .catch(e => {
              resolve([]);
            });
      } else {
        clientUtils
          .requestApi("get", constants.api.patients.countries, {})
          .then(x => {
            if (x.code === 0) {
              let countries = x.data;
              countries = countries.sort((a, b) => {
                return a.id == "1000179" ? -1 : 1;
              });
              datacacheProvider.save("", "DATA-COUNTRY", countries, true, true);
              resolve(countries);
            }
            resolve([]);
          })
          .catch(e => {
            resolve([]);
          });
      }
    });
  },

  // getListPatientsugges(fromApi, patientName, birthdayStr, provinceId, districtId, zoneId) {
  //     return new Promise((resolve, reject) => {
  //         if (!fromApi) {
  //             var data = datacacheProvider.read("", "DATA-SUGGESSPATIENT", []);
  //             if (data && data.length) {
  //                 this.getListPatientsugges(true);
  //                 resolve(data);
  //             } else
  //                 this.getListPatientsugges(true).then(s => {
  //                     resolve(s);
  //                 }).catch(e => {
  //                     resolve([]);
  //                 });
  //         }
  //         else {

  //             clientUtils.requestApi('get', `${constants.api.patients.suggestions}?patientName=${patientName}&birthday=${birthdayStr}&provinceId=${provinceId}&districtId=${districtId}&zoneId=${zoneId}`, {}).then(x => {
  //                 if (x.code === 0) {
  //                     let suggesPatients = x.data;

  //                     datacacheProvider.save("", "DATA-SUGGESSPATIENT", suggesPatients);
  //                     resolve(suggesPatients);
  //                 }
  //                 resolve([]);
  //             }).catch(e => {
  //                 resolve([]);
  //             });
  //         }
  //     });
  // },

  getListPatientsugges(
    patientName,
    birthdayStr,
    provinceId,
    districtId,
    zoneId
  ) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "get",
          `${constants.api.patients.suggestions}?patientName=${patientName}&birthday=${birthdayStr}&provinceId=${provinceId}&districtId=${districtId}&zoneId=${zoneId}`,
          {}
        )
        .then(x => {
          if (x.code === 0) {
            let suggesPatients = x.data;

            datacacheProvider.save("", "DATA-SUGGESSPATIENT", suggesPatients);
            resolve(suggesPatients);
          }
          resolve([]);
        })
        .catch(e => {
          resolve([]);
        });
    });
  },

  getProvinces(countryId, fromApi) {
    return new Promise((resolve, reject) => {
      if (!fromApi) {
        var data = datacacheProvider.read(
          "",
          "DATA-PROVINCE" + countryId,
          [],
          true,
          true
        );
        if (data && data.length) {
          this.getProvinces(countryId, true);
          resolve(data);
        } else {
          this.getProvinces(countryId, true)
            .then(s => {
              resolve(s);
            })
            .catch(e => {
              resolve([]);
            });
        }
      } else {
        clientUtils
          .requestApi("get", constants.api.patients.provinces, {})
          .then(x => {
            if (x.code === 0) {
              let provinces = null;
              if (countryId)
                provinces = x.data.filter(item => item.countryId == countryId);
              else provinces = x.data;
              datacacheProvider.save(
                "",
                "DATA-PROVINCE" + countryId,
                provinces,
                true,
                true
              );
              resolve(provinces);
            }
            resolve([]);
          })
          .catch(e => {
            resolve([]);
          });
      }
    });
  },
  getDistricts(provinceId, fromApi) {
    return new Promise((resolve, reject) => {
      if (!fromApi) {
        var data = datacacheProvider.read(
          "",
          "DATA-DICTRICT" + provinceId,
          [],
          true,
          true
        );
        if (data && data.length) {
          this.getDistricts(provinceId, true);
          resolve(data);
        } else {
          this.getDistricts(provinceId, true)
            .then(s => {
              resolve(s);
            })
            .catch(e => {
              resolve([]);
            });
        }
      } else {
        clientUtils
          .requestApi("get", constants.api.patients.districts, {})
          .then(x => {
            if (x.code === 0) {
              let dictricts = x.data.filter(
                item => item.provinceId == provinceId
              );
              datacacheProvider.save(
                "",
                "DATA-DICTRICT" + provinceId,
                dictricts,
                true,
                true
              );
              resolve(dictricts);
            }
            resolve([]);
          })
          .catch(e => {
            resolve([]);
          });
      }
    });
  },
  getZones(districtId, fromApi) {
    return new Promise((resolve, reject) => {
      if (!fromApi) {
        var data = datacacheProvider.read(
          "",
          "DATA-ZONE" + districtId,
          [],
          true,
          true
        );
        if (data && data.length) {
          this.getZones(districtId, true);
          resolve(data);
        } else {
          this.getZones(districtId, true)
            .then(s => {
              resolve(s);
            })
            .catch(e => {
              resolve([]);
            });
        }
      } else {
        clientUtils
          .requestApi("get", constants.api.patients.zones, {})
          .then(x => {
            if (x.code === 0) {
              let zones = x.data.filter(item => item.districtId == districtId);
              datacacheProvider.save(
                "",
                "DATA-ZONE" + districtId,
                zones,
                true,
                true
              );
              resolve(zones);
            }
            resolve([]);
          })
          .catch(e => {
            resolve([]);
          });
      }
    });
  },

  getJobs(fromApi) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.patients.jobs, {})
        .then(s => {
          if (s.code === 0) {
            datacacheProvider.save("", "DATA-JOB", s.data, true);
            resolve(s.data);
          }
          resolve([]);
        })
        .catch(e => {
          resolve([]);
        });
    });
  },
  getHospitals(fromApi) {
    return new Promise((resolve, reject) => {
      if (!fromApi) {
        var data = datacacheProvider.read("", "DATA-HOSPITAL", [], true);
        if (data && data.length) {
          this.getHospitals(true);
          resolve(data);
        } else
          this.getHospitals(true)
            .then(s => {
              resolve(s);
            })
            .catch(e => {
              resolve([]);
            });
      } else {
        clientUtils
          .requestApi("get", constants.api.patients.hospital, {})
          .then(s => {
            if (s.code === 0) {
              datacacheProvider.save("", "DATA-HOSPITAL", s.data, true);
              resolve(s.data);
            }
            resolve([]);
          })
          .catch(e => {
            resolve([]);
          });
      }
    });
  },
  getJobPatient(insuranceNumber) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "get",
          `${constants.api.patients.jobInsurance}?insuranceNumber=${insuranceNumber}`
        )
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  getDetailpatientInsurance(insuranceNumber) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "get",
          `${constants.api.patients.detailPatientInsurance}/?insuranceNumber=${insuranceNumber}`
        )
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  getPhoneDuplicate(phone) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "get",
          `${constants.api.patients.detailPatientPhone}/?phone=${phone}`
        )
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  getAvatar(avartarName) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "get",
          constants.api.patients.avatar + "/" + avartarName,
          {}
        )
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
        .requestApi("put", constants.api.patients.update + "/" + id, object)
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  getInfoBarcodeInsurance(object) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", constants.api.patients.barcodeInsurance, object)
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  nextPatient(counterId) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", constants.api.patients.next, counterId)
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  openCloseCounter(id, available) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", constants.api.patients.openCloseCounter, {
          id,
          available
        })
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  upload(image) {
    return new Promise((resolve, reject) => {
      clientUtils
        .uploadFile(constants.api.image.upload, image)
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  scanID(image) {
    return new Promise((resolve, reject) => {
      clientUtils
        .uploadFile(constants.api.image.scanID, image)
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  checkInfoPortalInsurance(object) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", constants.api.patients.InfoPortalInsurance, object)
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  getById(id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", `${constants.api.reception.detail}/${id}`)
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  reception_form(id, serviceIds) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "get",
          `${
            constants.api.reception.reception_form
          }?patientHistoryId=${id}&ids=${serviceIds || ""}`
        )
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  specify_form(patientHistoryId, patientServiceGroupIds, ids) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "get",
          `${
            constants.api.reception.specify_form
          }?patientHistoryId=${patientHistoryId}&patientServiceGroupIds=${patientServiceGroupIds ||
            ""}&ids=${ids || ""}`
        )
        .then(s => {
          resolve(s);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
};
