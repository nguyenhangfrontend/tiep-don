import constants from 'resources/strings';
import request from 'utils/request';

// object tra ve link api goi khi hien thi danh sach dich vu trong submenu
const mapIdRowToApi = (patientHistoryId , type)=> ({
  SurgicalBill: {
    apiLink: constants.api.medicalRecord.technicalServices,
    params: {
      serviceType: 40,
      patientHistoryId,
      subclinical: false,
    },
  },
  SpecExamForm: {
    apiLink: constants.api.medicalRecord.specializeExamination,
    params: {
      patientHistoryId,
      createdFromServiceType: type === 'inPatient' ? 210: 10
    },
  },
  TreetmentSheet: {
    apiLink: constants.api.medicalRecord.medicalTreatmentSheets,
    params: {
      patientHistoryId,
      createdFromServiceType: 210,
    },
  },
});

// object tra ve link api goi khi in form
const mapKeyToUrl = {
  SurgicalBill: constants.api.medicalRecord.surgicalForm,
  SpecExamForm: constants.api.medicalRecord.specExamForm,
  HospitalCheckout: constants.api.medicalRecord.hospitalCheckout,
  SummaryList: constants.api.medicalRecord.summaryList,
  List6556: constants.api.medicalRecord.list6556,
  MedicineSupply: constants.api.medicalRecord.medicineSupply,
  HealthInsurance: constants.api.medicalRecord.healthInsurance,
  ReactionMedicine: constants.api.medicalRecord.reactionMedicine,
  TreetmentSheet: constants.api.medicalRecord.medicalTreatmentForm,
  CommitedPaper: constants.api.medicalRecord.commitedPaper,
  SurgicalCertificate: constants.api.medicalRecord.surgicalCertificate,
  TransitPaper: constants.api.medicalRecord.transitPaper,
  PharmacyPresctiptions: constants.api.medicalRecord.pharmacyPresctiptions,
  SummaryCostOutpatient: constants.api.medicalRecord.summaryCostOutpatient,
  BloodTranfer: constants.api.medicalRecord.bloodTranfer,
  ConsultationReport: constants.api.medicalRecord.consultationReport,
};

export default {
  showPatient(data) {
    let page = '0',
      size = '1000';
    return request(constants.api.medicalRecord.patientList, {
      params: { page, size, ...data },
    });
  },

  searchPatient(data){
    return request(constants.api.medicalRecord.searchPatientScan, {
      
      params: { ...data },

    });
  },

  getMedicalCodeList(data) {
    let page = '0',
      size = '99999';
    return request(constants.api.medicalRecord.medicalCodeList, {
      params: { page, size, patientValue: data },
    });
  },

  getLastestMedicalCode(patientValue) {
    const param = { page: '0', size: '1', patientValue: patientValue };
    return request(constants.api.medicalRecord.medicalCodeList, {
      params: param,
    });
  },

  getInfoUserHaveMedicalRecord(patientDocument) {
    return request(constants.api.medicalRecord.medicalCodeList, {
      params: { patientDocument },
    });
  },

  getMedicalTreatmentSheet(data) {
    return request(constants.api.medicalRecord.medicalTreatmentSheets, {
      params: { ...data },
    });
  },
  // patientHistoryId
  getMedicalBill(data) {
    const treatmentDirection = 70;
    return request(constants.api.medicalRecord.medicalBill, {
      params: { treatmentDirection, ...data },
    });
  },
  fetchPatientDocument(data) {
    return request(constants.api.medicalRecord.patientDocument, {
      params: { patientDocument:  data},
    });
  },
  fetchForms() {
    return request(constants.api.medicalRecord.forms, {
      params:{}
    });
  },
  showPdfFile(data){
    const res = request(constants.api.medicalRecord.showPdfFile + `/${data}`,{});
    res.then(r => console.log('r: ', r));

    return res;
  },
  uploadFiles(data) {
    return request(constants.api.medicalRecord.uploadFiles, {
      data,
      method: 'post',
    });
  },

  // get all medical records
  getMedicalRecords: patientId => {
    return request(
      constants.api.medicalRecord.allRecords + `/${patientId}`,
      {},
    );
  },

  /* START */
  /* lay tat ca ten danh sach dich vu */
  getAllServicesName: ({ patientHistoryId,type, idRow, }) => {
    const data = mapIdRowToApi(patientHistoryId, type)[idRow];
    const { apiLink, params } = data;
    return request(apiLink, { params });
  },
  /* END */

  /* START */
  // get link print form
  getLinkForm: ({ keyItem, serviceId }) => {
    if (keyItem === 'ConsultationReport') {
      return request(mapKeyToUrl[keyItem], { params: serviceId });
    }
    return request(`${mapKeyToUrl[keyItem]}/${serviceId}`, {});
  },
  /* END */
};
