
import constants from '../resources/strings';
import clientUtils from '../utils/client-utils';

export default {
    showPdf(fileName) {
        return new Promise((resolve, reject) => {
            clientUtils.requestFetch("get", constants.api.patients.pdfShow + "/" + fileName, {
                'Authorization': 'Bearer ' + clientUtils.auth
            }).then(x => {
                x.arrayBuffer().then(s => resolve(s)).catch(e => reject(e));
                // ;
                // x.json().then(val => {
                //     (val);
                //     resolve(val);
                // }).catch(e => { reject(e) });
            }).catch(e => {
                reject(e);
            })
        })
    },
    showPdfSigned(fileName){
      
        return new Promise((resolve, reject) => {
            clientUtils.requestFetch("get", constants.api.patients.pdfShowSigned + "/" + fileName, {
                'Authorization': 'Bearer ' + clientUtils.auth
            }).then(x => {
                x.arrayBuffer().then(s => resolve(s)).catch(e => reject(e));
                // ;
                // x.json().then(val => {
                //     (val);
                //     resolve(val);
                // }).catch(e => { reject(e) });
            }).catch(e => {
                reject(e);
            })
        })
    },
    showPdfScan(fileName){
      
        return new Promise((resolve, reject) => {
            clientUtils.requestFetch("get", constants.api.medicalRecord.showPdfFile + "/" + fileName, {
                'Authorization': 'Bearer ' + clientUtils.auth
            }).then(x => {
                x.arrayBuffer().then(s => resolve(s)).catch(e => reject(e));
                // ;
                // x.json().then(val => {
                //     (val);
                //     resolve(val);
                // }).catch(e => { reject(e) });
            }).catch(e => {
                reject(e);
            })
        })
    },
    // pdfSignedPatient(fileName){
      
    //     return new Promise((resolve, reject) => {
    //         clientUtils.requestFetch("get", constants.api.patients.pdfShowSignedPatient + "/" + fileName, {
    //             'Authorization': 'Bearer ' + clientUtils.auth
    //         }).then(x => {
    //             x.arrayBuffer().then(s => resolve(s)).catch(e => reject(e));
    //             // ;
    //             // x.json().then(val => {
    //             //     (val);
    //             //     resolve(val);
    //             // }).catch(e => { reject(e) });
    //         }).catch(e => {
    //             reject(e);
    //         })
    //     })
    // },
    signature(object){
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("post", constants.api.patients.doctorSign, object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
        
    },
    signaturePatient(object){
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("post", constants.api.patients.patientSign, object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
        
    },
    getPdf(patientId) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.patients.pdf + "/" + patientId, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
    medicalRecord(patientMedicalCode) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.medicalRecord.medicalRecord + "/" + patientMedicalCode, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
    getPdfHospitalized(patientMedicalCode) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.medicalRecord.pdfHospitalized + "/" + patientMedicalCode, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },


    getCommitedPaper(patientDocument) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.medicalRecord.pdfCommited + "/" + patientDocument, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
    getMedicalTreatmentPaper(idTreatmentPaper) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.medicalRecord.medicalTreatmentForm + "/" + idTreatmentPaper, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
    historySigned(patientDocument, formValue, recordId){
        
        return new Promise((resolve, reject) => {
            let userId1= ""
            clientUtils.requestApi("get", constants.api.patients.historySigned + "?userId=" + userId1+ "&formValue=" + formValue + "&patientDocument="+ patientDocument +"&recordId=" + recordId, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    }
}
