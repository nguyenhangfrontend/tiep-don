// let wallet_services = '/wallet-services-test'; //test

// let EMR_service = '/isofhcare';
let EMR_service = '/api/emr/v1';
let SIGNER_service = '/api/signer/v1';
let FILE_service = '/api/file-service/v1';

module.exports = {
  key: {
    storage: {
      current_account: 'CURRENT_USER_EMR',
      current_tokenRole: 'CURRENT_TOKEN_ROLE',
      current_role: 'CURRENT_ROLE',
      current_department: 'CURRENT_DEPARTMENT',
      current_userName: 'CURRENT_USERNAME',
      current_saveAcc: 'CURRENT_SAVEACC',
      current_counter: 'CURRENT_COUNTER',
      last_action_time: 'LAST_ACTION_TIME',
    },
  },
  action: {
    action_user_login: 'ACTION_USER_LOGIN',
    action_user_chose_role: 'ACTION_USER_ROLE',
    action_user_logout: 'ACTION_USER_LOGOUT',
    action_user_department: 'ACTION_USER_CHOSE_DEPARTMENT',
    action_get_token_role: 'ACTION_TOKEN_ROLE',
    action_current_userName: 'ACTION_CURRENT_USERNAME',
    action_current_isSaveAcc: 'ACTION_CURRENT_SAVEACC',
    action_select_counter: 'ACTION_SELECT_COUNTER',
    action_last_time: 'ACTION_LAST_TIME',
    action_set_current_patient_id: 'ACTION_SET_CURRENT_PATIENT_ID',
    action_set_list_patient_histories: 'ACTION_SET_LIST_PATIENT_HISTORIES',
    action_set_current_patient: 'ACTION_SET_CURRENT_PATIENT',
    action_set_hightlightPatient: 'ACTION_SET_HIGHTLIGHT_PATIENT',
    action_edit: 'ACTION_EDIT',
    action_save_valueOnChangeCheck: 'ACTION_SAVE_VALUEONCHANGECHECK',
    action_set_technical_service_selected:
      'ACTION_SET_TECHNICAL_SERVICE_SELECTED',
    action_set_technical_service_selected_to_edit:
      'ACTION_SET_TECHNICAL_SERVICE_SELECTED_TO_EDIT',
    action_set_technical_service_selected_submit:
      'ACTION_SET_TECHNICAL_SERVICE_SELECTED_SUBMIT',
    action_update_technical_service_selected_submit:
      'ACTION_UPDATE_TECHNICAL_SERVICE_SELECTED_SUBMIT',
    action_change_is_addded_save: 'ACTION_CHANGE_IS_ADDED_SAVE',
    action_save_data_job: 'ACTION_SAVE_DATA_JOB',
    action_save_data_hospital: 'ACTION_SAVE_DATA_HOSPITAL',
    action_set_data_save_or_not: 'ACTION_SET_DATA_SAVE_OR_NOT',
    action_close_printer: 'ACTION_CLOSE_PRINTER',
    action_set_birthday_change_or_not: 'ACTION_SET_BIRTHDAY_CHANGE_OR_NOT',
    action_set_sequenceNo: 'ACTION_SET_SEQENCENO',
    action_save_list_patient: 'ACTION_SAVE_LIST_PATIENT',
    action_remove_service: 'ACTION_REMOVE_SERVICE',
    action_set_services: 'ACTION_SET_SERVICES',
    action_disabled_insurance_input: 'ACTION_DISABLED_INSURANCE_INPUT',
    action_disabled_service_input: 'ACTION_DISABLED_SERVICE_INPUT',
  },
  action_message: {
    action_reload_list_patient: 'ACTION_RELOAD_LIST_PATIENT',
    action_show_data_patient: 'ACTION_SHOW_DATA_PATIENT',
    action_close_main: 'ACTION_CLOSE_MAIN',
    action_get_reception_id: 'ACTION_GET_RECEPTION_ID',
    action_check_insurance_portal: 'ACTION_CHECK_INSURANCE_PORTAL',
    action_fill_data_insurance: 'ACTION_FILL_DATA_INSURANCE',
    action_reset_form: 'ACTION_RESET_FORM',
    action_edit_patient: 'ACTION_EDIT_PATIENT',
    action_get_edit_type: 'ACTION_GET_EDIT_TYPE',
    action_get_history_patient: 'GET_HISTORY_PATIENT',
    action_close_or_open_main: 'ACTION_CLOSE_OR_OPEN_MAIN',
    action_cancel_edit: 'ACTION_CANCEL_EDIT',
    action_remove_birthday_error: 'ACTION_REMOVE_BIRTHDAY_ERROR',
    action_set_value_onchange: 'ACTION_SET_VALUE_ONCHANGE',
    action_show_data_by_patient_history: 'ACTION_LOAD_DETAIL_PATIENT_HISTORY',
    action_get_detail_patient_id: 'ACTION_GET_DETAIL_PATIENT_ID',
    action_show_confirm_in_reception: 'ACTION_SHOW_CONFIRM_IN_RECEPTION',
    action_show_confirm_in_services_booked:
      'ACTION_SHOW_CONFIRM_IN_SERVICES_BOOKED',
    action_reload_list_service_booked: 'ACTION_RELOAD_LIST_SERVICE_BOOKED',
    action_reload_list_service_editing: 'ACTION_RELOAD_LIST_SERVICE_EDITING',
    action_save_technical_service_success:
      'ACTION_SAVE_TECHNICAL_SERVICE_SUCCESS',
  },
  message: {
    user: {
      create_error: 'Tạo mới tài khoản không thành công!',
      update_error: 'Cập nhật tài khoản không thành công!',
      error_code_2:
        'SĐT đã được sử dụng trong hệ thống. Vui lòng sử dụng SĐT khác!',
      error_code_3:
        'Email đã được sử dụng trong hệ thống. Vui lòng sử dụng Email khác!',
      error_code_4:
        'Số văn bằng chuyên môn đã tồn tại trên hệ thống. Vui lòng sử dụng Số văn bằng chuyên môn khác!',
      error_code_5:
        'Username đã tồn tại trên hệ thống. Vui lòng sử dụng Username khác!',
    },
    post: {
      approved_success: 'Duyệt câu hỏi và gán cho bác sĩ thành công!',
      approved_error: 'Duyệt câu hỏi không thành công!',
    },
    hospital: {
      create_error: 'Tạo mới tài khoản không thành công!',
      update_error: 'Cập nhật tài khoản không thành công!',
    },
  },
  api: {
    auth: {
      login: EMR_service + '/auth/login',
      role: EMR_service + '/auth/roles',
      userInfo: SIGNER_service + '/utils/me',
    },
    counter: {
      get_all: EMR_service + '/counters',
    },
    reception: {
      detail: EMR_service + '/reception',
      reception_form: EMR_service + '/reception/reception-form',
      specify_form: EMR_service + '/reception/chi-dinh-tat-ca-form',
    },
    patients: {
      search: EMR_service + '/reception/patients',
      detailValue: EMR_service + '/patient-histories',
      ethnicities: EMR_service + '/ethnicities',
      countries: EMR_service + '/countries',
      provinces: EMR_service + '/provinces',
      districts: EMR_service + '/districts',
      zones: EMR_service + '/zones',
      hospital: EMR_service + '/hospitals',
      histories: EMR_service + '/reception/check-up-histories',
      update: EMR_service + '/reception/check-up-histories',
      createOrUpdate: EMR_service + '/patient-histories',
      suggestions: EMR_service + '/patient-histories',
      detailPatientIdNo: EMR_service + '/patient-histories',
      detailPatientInsurance: EMR_service + '/patient-histories',
      detailPatientPhone: EMR_service + '/patient-histories',
      jobs: EMR_service + '/jobs',
      jobInsurance: EMR_service + '/insurance-cards',
      openCloseCounter: EMR_service + '/counters/pause',
      next: EMR_service + '/reception/next',
      barcodeInsurance: EMR_service + '/insurance-cards/parse-barcode',
      InfoPortalInsurance:
        EMR_service + '/insurance-cards/check-insurance-portal',
      avatar: EMR_service + '/files',
      pdf: EMR_service + '/reception/tam-giu-the-form',
      pdfShow: EMR_service + '/files',
      pdfShowSigned: SIGNER_service + '/files',
      // pdfShowSignedPatient: SIGNER_service + "/signed-files",
      historySigned: SIGNER_service + '/sign/signed-files',
      patientSign: EMR_service + '/sign/sign-report-pdf-image',
      doctorSign: EMR_service + '/sign/ca-sign-report-pdf-image',
    },
    service: {
      technical_services: EMR_service + '/technical-services',
      service_group: EMR_service + '/service-group-level1s',
    },
    image: {
      upload: EMR_service + '/patient-histories/avatars',
      scanID: EMR_service + '/patient-histories/identity-card',
    },
    patient_service: {
      technical_services: EMR_service + '/patient-services/technical-services',
    },
    room: {
      search_reception_room: EMR_service + '/reception/rooms',
      get_all: EMR_service + '/rooms',
      service_rooms: EMR_service + '/service-rooms',
    },
    department: {
      get_all: EMR_service + '/departments',
    },
    user: {
      getAllDoctor: EMR_service + '/users?qualification=BS',
      getAll: EMR_service + '/users',
    },
    medicalRecord: {
      patientList: EMR_service + '/patients',
      searchPatientScan: FILE_service + '/documents',
      patientDocument: EMR_service + '/patient-histories',
      forms: SIGNER_service + '/forms',
      uploadFiles: FILE_service + '/documents',
      showPdfFile: FILE_service + '/files',
      medicalRecord: EMR_service + '/reception/benh-an-vao-vien-form',
      pdfHospitalized: EMR_service + '/reception/nhap-vien-form',
      medicalCodeList: EMR_service + '/patient-histories',
      medicalTreatmentSheets: EMR_service + '/medical-record-lines',
      medicalTreatmentForm: EMR_service + '/reception/to-dieu-tri-form',
      commitedPaper: EMR_service + '/reception/cam-doan-pt-tt-form',
      medicalBill: EMR_service + '/patient-checkups',
      allRecords: EMR_service + '/reception/tong-hop-form',
      technicalServices: EMR_service + '/patient-services/technical-services',
      surgicalForm: EMR_service + '/reception/phau-thuat-form',
      specializeExamination: EMR_service + '/patient-checkups',
      specExamForm: EMR_service + '/reception/kham-chuyen-khoa-form',
      hospitalCheckout: EMR_service + '/reception/ra-vien-form',
      summaryList: EMR_service + '/reception/bang-ke-tong-hop-form',
      list6556: EMR_service + '/reception/bang-ke-6556-form',
      medicineSupply: EMR_service + '/reception/cap-phat-va-su-dung-thuoc-form',
      healthInsurance: EMR_service + '/reception/don-thuoc-bh-form',
      reactionMedicine: EMR_service + '/reception/phan-ung-thuoc-form',
      surgicalCertificate:
        EMR_service + '/reception/chung-nhan-phau-thuat-form',
      transitPaper: EMR_service + '/reception/chuyen-tuyen-form',
      pharmacyPresctiptions:
        EMR_service + '/reception/don-thuoc-nha-thuoc-form',
      summaryCostOutpatient:
        EMR_service + '/reception/bang-ke-tong-hop-ngoai-tru-form',
      bloodTranfer: EMR_service + '/reception/truyen-mau-form',
      consultationReport:
        EMR_service + '/reception/hoi-chan-thuoc-co-dau-sao-form',
    },
    resources: {
      dyeMethods: `${EMR_service}/dye-methods`,
      biopsyLocations: `${EMR_service}/biopsy-locations`,
    },
    home: {
      getToken: 'https://api.emr.test.isofh.vn/auth/oauth/token',
    },
  },
};
