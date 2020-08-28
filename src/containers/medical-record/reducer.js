import produce from 'immer';
import * as types from './constants';
import * as typesPrint from 'containers/print/constants';
import { handleListPdf } from './utils';

export const initialState = {
  loading: false,
  error: null,
  patientList: [],
  medicalTreatmentSheets: [],
  medicalCodeList: [],
  medicalBills: {},
  dataMenuPdf: {
    inPatient: {},
    outPatient: {},
  },
  allRecordsUrl: '',
  services: {},
  linkForm: {},
  dataShowMenuLv4: {},
  itemMedicalRecordInfo: {},
};

const medicalRecord = (state = initialState, action) =>
  produce(state, draftState => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case types.PATIENT_LIST:
        draftState.loading = true;
        break;

      case types.PATIENT_LIST_SUCCESS:
        draftState.patientList = action.payload;
        draftState.loading = false;
        break;

      case types.PATIENT_LIST_FAILURE:
        draftState.error = action.error;
        draftState.loading = false;
        break;

      case types.MEDICAL_TREATMENT_SHEET_SUCCESS:
        draftState.medicalTreatmentSheets = action.payload;
        break;

      case types.MEDICAL_CODE_LIST_SUCCESS:
        draftState.medicalCodeList = action.payload;
        break;

      case types.MEDICAL_BILLS_SUCCESS:
        draftState.medicalBills = action.payload;
        break;

      case types.GET_ALL_MEDICAL_RECORDS:
        draftState.loading = true;
        break;
      case types.GET_ALL_MEDICAL_RECORDS_SUCCESS: {
        const { payload } = action;
        draftState.loading = false;
        draftState.allRecordsUrl = payload;
        break;
      }

      /* START */
      // reducer for get all service for submenu
      case types.GET_ALL_SERVICE_NAME_START:
        draftState.loading = true;
        break;

      case types.GET_ALL_SERVICE_NAME_SUCCESS: {
        const { payload } = action || {};
        const { services, idRow, keyTotalMenu } = payload || {};
        draftState.loading = false;
        draftState.services = {
          ...draftState.services,
          [keyTotalMenu]: {
            ...draftState.services[keyTotalMenu],
            ...{ [idRow]: services },
          },
        };
        draftState.dataMenuPdf.inPatient = handleListPdf(
          'inPatient',
          draftState.services,
        );
        draftState.dataMenuPdf.outPatient = handleListPdf(
          'outPatient',
          draftState.services,
        );
        break;
      }

      case types.GET_ALL_SERVICE_NAME_FAILURE: {
        draftState.loading = false;
        draftState.error = action.payload;
        break;
      }
      /* END */

      /* START */
      // reducer for add link for save form
      case types.GET_FORM_START:
        draftState.linkForm = {};
        draftState.loading = true;
        break;

      case types.GET_FORM_SUCCESS: {
        const { payload } = action;
        const { keyItem, data } = payload;
        draftState.loading = false;
        draftState.linkForm[keyItem] = data;
        break;
      }
      case types.GET_FORM_FAILURE: {
        draftState.loading = false;
        draftState.error = action.payload;
        break;
      }
      /* END */

      case types.CLEAR_LINK_fORM: {
        draftState.linkForm = initialState.linkForm;
        break;
      }

      case types.CLEAR_CACHED_DATA_ON_MEDICAL_RECORD: {
        draftState.linkForm = {};
        draftState.services = {};
        break;
      }

      case types.CLEAR_INFO_PATIENT: {
        draftState.itemMedicalRecordInfo = {};
        draftState.medicalCodeList = {};
        break;
      }

      case typesPrint.PDF_HOSPITALIZED:
        draftState.loading = true;
        break;

      case typesPrint.PDF_HOSPITALIZED_SUCCESS: {
        draftState.loading = false;
        break;
      }

      case typesPrint.PDF_HOSPITALIZED_FAILURE: {
        draftState.loading = false;
        break;
      }

      case types.ADD_DATA_AND_CONDITION_TO_PDF: {
        const { dataShowMenuLv4 } = state;
        const obj = { ...dataShowMenuLv4, ...action.payload };
        draftState.dataShowMenuLv4 = obj;
        break;
      }

      case types.GET_INFO_USER_HAVE_MEDICAL_RECORD: {
        draftState.loading = true;
        break;
      }

      case types.GET_INFO_USER_HAVE_MEDICAL_RECORD_SUCCESS: {
        draftState.loading = false;
        draftState.itemMedicalRecordInfo = action.payload;
        break;
      }

      case types.GET_INFO_USER_HAVE_MEDICAL_RECORD_FAILED: {
        draftState.itemMedicalRecordInfo = action.payload;
        draftState.loading = false;
        break;
      }

      default:
        return state;
    }
  });

export default medicalRecord;
