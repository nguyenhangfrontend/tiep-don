export const prefix = 'medicalRecord';

// get patient list data
export const PATIENT_LIST = `${prefix}/PATIENT_LIST`;
export const PATIENT_LIST_SUCCESS = `${prefix}/PATIENT_LIST_SUCCESS`;
export const PATIENT_LIST_FAILURE = `${prefix}/PATIENT_LIST_FAILURE`;

// get medical_treatment_sheet data
export const MEDICAL_TREATMENT_SHEET = `${prefix}/MEDICAL_TREATMENT_SHEET`;
export const MEDICAL_TREATMENT_SHEET_SUCCESS = `${prefix}/MEDICAL_TREATMENT_SHEET_SUCCESS`;
export const MEDICAL_TREATMENT_SHEET_FAILURE = `${prefix}/MEDICAL_TREATMENT_SHEET_FAILURE`;

// get medical_code_list data
export const MEDICAL_CODE_LIST = `${prefix}/MEDICAL_CODE_LIST`;
export const MEDICAL_CODE_LIST_SUCCESS = `${prefix}/MEDICAL_CODE_LIST_SUCCESS`;
export const MEDICAL_CODE_LIST_FAILURE = `${prefix}/MEDICAL_CODE_LIST_FAILURE`;

// get medical_bills
export const MEDICAL_BILLS = `${prefix}/MEDICAL_BILLS`;
export const MEDICAL_BILLS_SUCCESS = `${prefix}/MEDICAL_BILLS_SUCCESS`;
export const MEDICAL_BILLS_FAILURE = `${prefix}/MEDICAL_BILLS_FAILURE`;

// get all medical records
export const GET_ALL_MEDICAL_RECORDS = `${prefix}/GET_ALL_MEDICAL_RECORDS_SHEET`;
export const GET_ALL_MEDICAL_RECORDS_SUCCESS = `${prefix}/GET_ALL_MEDICAL_RECORDS_SUCCESS`;
export const GET_ALL_MEDICAL_RECORDS_FAILURE = `${prefix}/GET_ALL_MEDICAL_RECORDS_FAILURE`;

// lay danh sach ten dich vu trong menu cap 2
export const GET_ALL_SERVICE_NAME_START = `${prefix}/GET_ALL_SERVICE_NAME_START`;
export const GET_ALL_SERVICE_NAME_SUCCESS = `${prefix}/GET_ALL_SERVICE_NAME_SUCCESS`;
export const GET_ALL_SERVICE_NAME_FAILURE = `${prefix}/GET_ALL_SERVICE_NAME_FAILURE`;

// lay link in form
export const GET_FORM_START = `${prefix}/GET_FORM_START`;
export const GET_FORM_SUCCESS = `${prefix}/GET_FORM_SUCCESS`;
export const GET_FORM_FAILURE = `${prefix}/GET_FORM_FAILURE`;

// clear cached data sevices and link form on medical record
export const CLEAR_CACHED_DATA_ON_MEDICAL_RECORD = `${prefix}/CLEAR_CACHED_DATA_ON_MEDICAL_RECORD`;

// clear cached info patient
export const CLEAR_INFO_PATIENT = `${prefix}/CLEAR_INFO_PATIENT`;

// add data and condition render menu level 4 on Pdf
export const ADD_DATA_AND_CONDITION_TO_PDF = `${prefix}/ADD_DATA_AND_CONDITION_TO_PDF`;

export const CLEAR_LINK_fORM = `${prefix}/CLEAR_LINK_fORM`;

export const ADD_INFOR_ITEM_MEDICAL_RECORD = `${prefix}/ADD_INFOR_ITEM_MEDICAL_RECORD`;

export const GET_INFO_USER_HAVE_MEDICAL_RECORD = `${prefix}/GET_INFO_USER_HAVE_MEDICAL_RECORD`;
export const GET_INFO_USER_HAVE_MEDICAL_RECORD_SUCCESS = `${prefix}/GET_INFO_USER_HAVE_MEDICAL_RECORD_SUCCESS`;
export const GET_INFO_USER_HAVE_MEDICAL_RECORD_FAILED = `${prefix}/GET_INFO_USER_HAVE_MEDICAL_RECORD_FAILED`;

export const GET_MEDICAL_CODE_LASTEST = `${prefix}/GET_MEDICAL_CODE_LASTEST`;
export const GET_MEDICAL_CODE_LASTEST_SUCCESS = `${prefix}/GET_MEDICAL_CODE_LASTEST_SUCCESS`;
export const GET_MEDICAL_CODE_LASTEST_FAILED = `${prefix}/GET_MEDICAL_CODE_LASTEST_FAILED`;

export const LIST_KEY = {
  TreetmentSheet: 'TreetmentSheet',
  MedicineSupply: 'MedicineSupply',
  SpecExamForm: 'SpecExamForm',
  SurgicalBill: 'SurgicalBill',
  BloodTranfer: 'BloodTranfer',
  ReactionMedicine: 'ReactionMedicine',
  ConsultationReport: 'ConsultationReport',
  CommitedPaper: 'CommitedPaper',
  HealthInsurance: 'HealthInsurance',
  PharmacyPresctiptions: 'PharmacyPresctiptions',
  SurgicalCertificate: 'SurgicalCertificate',
  HospitalCheckout: 'HospitalCheckout',
  SummaryList: 'SummaryList',
  List6556: 'List6556',
  TransitPaper: 'TransitPaper',
  SummaryCostOutpatient: 'SummaryCostOutpatient',
};

export const menuItems = [
  {
    name: 'tờ bìa BA',
    openSubmenu: false,
    namePdf: 'Tờ bìa bệnh án',
    key: 'tbba',
  },
  {
    name: 'P. nhập viện',
    openSubmenu: false,
    key: 'pnv',
    namePdf: 'Phiếu nhập viện',
    outPatient: true,
  },
  {
    name: 'Mã hồ sơ',
    openSubmenu: true,
    key: 'mhs',
  },
  {
    name: 'Tổng kết BA',
    openSubmenu: false,
    namePdf: 'Tổng kết bệnh án',
    key: 'tkba',
  },
];

export const subMenuRecordCodeInPatient = [
  {
    name: 'Tờ điều trị',
    key: LIST_KEY.TreetmentSheet,
    namePdf: 'Tờ điều trị',
    toggleClass: true,
    haveSubMenu: true,
  },
  {
    name: 'Phiếu khám chuyên khoa',
    key: LIST_KEY.SpecExamForm,
    namePdf: 'Phiếu khám chuyên khoa',
    toggleClass: true,
    haveSubMenu: true,
  },
  {
    name: 'Phiếu phẫu thuật',
    key: LIST_KEY.SurgicalBill,
    namePdf: 'Phiếu phẫu thuật',
    toggleClass: true,
    haveSubMenu: true,
  },
  {
    name: 'Phiếu truyền máu',
    key: LIST_KEY.BloodTranfer,
    namePdf: 'Phiếu truyền máu',
    toggleClass: true,
    haveSubMenu: false,
  },
  {
    name: 'Giấy phản ứng thử thuốc',
    key: LIST_KEY.ReactionMedicine,
    namePdf: 'Giấy phản ứng thử thuốc',
    toggleClass: true,
    haveSubMenu: false,
  },
  {
    name: 'Phiếu cấp phát thuốc',
    key: LIST_KEY.MedicineSupply,
    toggleClass: true,
    namePdf: 'Phiếu cấp phát thuốc',
    haveSubMenu: true,
  },
  {
    name: 'Biên bản hội chẩn',
    key: LIST_KEY.ConsultationReport,
    toggleClass: true,
    namePdf: 'Biên bản hội chẩn',
    haveSubMenu: false,
  },
  {
    name: 'Giấy cam đoan',
    key: LIST_KEY.CommitedPaper,
    namePdf: 'Giấy cam đoan',
    haveSubMenu: false,
  },
];

export const subMenuRecordCodeOutPatient = [
  {
    name: 'Đơn thuốc BHYT',
    key: LIST_KEY.HealthInsurance,
    namePdf: 'Đơn thuốc BHYT',
    toggleClass: true,
    haveSubMenu: false,
  },
  {
    name: 'Đơn thuốc nhà thuốc',
    key: LIST_KEY.PharmacyPresctiptions,
    namePdf: 'Đơn thuốc nhà thuốc',
    toggleClass: true,
    haveSubMenu: false,
  },
  {
    name: 'Phiếu khám chuyên khoa',
    key: LIST_KEY.SpecExamForm,
    namePdf: 'Phiếu khám chuyên khoa',
    toggleClass: true,
    haveSubMenu: true,
  },
  {
    name: 'Phiếu phẫu thuật',
    key: LIST_KEY.SurgicalBill,
    namePdf: 'Phiếu phẫu thuật',
    toggleClass: true,
    haveSubMenu: true,
  },
  {
    name: 'Biên bản hội chẩn',
    key: LIST_KEY.ConsultationReport,
    toggleClass: true,
    namePdf: 'Biên bản hội chẩn',
    haveSubMenu: false,
  },
];

export const subMenuSummaryRecordInpatient = [
  {
    name: 'Giấy chứng nhận phẫu thuật',
    key: LIST_KEY.SurgicalCertificate,
    namePdf: 'Giấy chứng nhận phẫu thuật',
    toggleClass: true,
    haveSubMenu: true,
  },
  {
    name: 'Giấy ra viện',
    key: LIST_KEY.HospitalCheckout,
    namePdf: 'Giấy ra viện',
    toggleClass: true,
    haveSubMenu: false,
  },
  {
    name: 'Bảng kê tổng hợp',
    key: LIST_KEY.SummaryList,
    namePdf: 'Bảng kê tổng hợp',
    toggleClass: true,
    haveSubMenu: false,
    formValue: 'BM027',
    patientSign: true
  },
  {
    name: 'Bảng kê 6556',
    key: LIST_KEY.List6556,
    namePdf: 'Bảng kê 6556',
    toggleClass: true,
    haveSubMenu: false,
    formValue: 'BM028'
  },
  {
    name: 'Giấy chuyển tuyến',
    key: LIST_KEY.TransitPaper,
    namePdf: 'Giấy chuyển tuyến',
    toggleClass: true,
    haveSubMenu: false,
  },
];

export const subMenuSummaryRecordOutPatient = [
  {
    name: 'Bảng kê tổng hợp',
    key: LIST_KEY.SummaryCostOutpatient,
    namePdf: 'Bảng kê tổng hợp',
    toggleClass: true,
    haveSubMenu: false,
    formValue: 	'BM026',
    patientSign: true
  },
  {
    name: 'Bảng kê 6556',
    key: LIST_KEY.List6556,
    namePdf: 'Bảng kê 6556',
    toggleClass: true,
    haveSubMenu: false,
    formValue: 	'BM028',
    patientSign: true
  },
  {
    name: 'Giấy chuyển tuyến',
    key: LIST_KEY.TransitPaper,
    namePdf: 'Giấy chuyển tuyến',
    toggleClass: true,
    haveSubMenu: false,
  },
];

export const LIST_KEY_DEPENDENT = {
  tkba: {
    keyDependent: LIST_KEY.SurgicalBill,
    menuParent: 'mhs',
  },
};

export default [
  {
    subMenu: {
      inPatient: subMenuRecordCodeInPatient,
      outPatient: subMenuRecordCodeOutPatient,
    },
    title: 'Tất cả hồ sơ',
    key: 'mhs',
  },
  {
    subMenu: {
      inPatient: subMenuSummaryRecordInpatient,
      outPatient: subMenuSummaryRecordOutPatient,
    },
    title: 'Tổng kết BA',
    key: 'tkba',
  },
];
