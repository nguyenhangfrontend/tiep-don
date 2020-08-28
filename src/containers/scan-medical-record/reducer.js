import produce from 'immer';
import * as types from './constants';
import * as typesPrint from 'containers/print/constants';
import { handleListPdf } from './utils';

export const initialState = {
  patientListScan: [],
  patient: {},
  forms: [],
  loadingAll: false,
  files: {},
  file: {}
};

const medicalRecordScan = (state = initialState, action) =>
  produce(state, draftState => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case types.PATIENT_LIST:
        draftState.loadingAll = true;
        draftState.patientListScan = action.payload;
        break;
      case types.PATIENT_LIST_SUCCESS:
        draftState.loadingAll = false;
        draftState.patientListScan = action.payload;
        break;

      case types.PATIENT:
        draftState.loadingAll = true;
        draftState.patient = action.payload;
        break;
      case types.PATIENT_SUCCESS:
        draftState.loadingAll = false;
        draftState.patient = action.payload;
        break;
        
      case types.FETCH_FORMS:
        draftState.loadingAll = true;
        draftState.forms = action.payload;
        break;
      case types.FETCH_FORMS_SUCCESS:
        draftState.loadingAll = false;
        draftState.forms = action.payload;
        break;

      case types.UPLOAD_FILES:
        draftState.loadingAll = true;
        draftState.files = action.payload;
        break;
      case types.UPLOAD_FILES_SUCCESS:
        draftState.loadingAll = false;
        draftState.files = action.payload;
        break;

      default:
        return state;
    }
  });

export default medicalRecordScan;
