import { createSingleAction } from 'utils/reduxActions';
import * as types from './constants';

export const searchPatient = createSingleAction(types.PATIENT_LIST);
export const searchPatientSuccess = createSingleAction(
  types.PATIENT_LIST_SUCCESS,
);
export const searchPatientFailure = createSingleAction(
  types.PATIENT_LIST_FAILURE,
);

export const fetchPatient = createSingleAction(types.PATIENT);
export const fetchPatientSuccess = createSingleAction(
  types.PATIENT_SUCCESS,
);
export const fetchPatientFailure = createSingleAction(
  types.PATIENT_FAILURE,
);

export const fetchPatientDocument = createSingleAction(types.PATIENT_DOCUMENT);
export const fetchPatientDocumentSuccess = createSingleAction(
  types.PATIENT_DOCUMENT_SUCCESS,
);
export const fetchPatientDocumentFailure = createSingleAction(
  types.PATIENT_DOCUMENT_FAILURE,
);

export const fetchForms = createSingleAction(types.FETCH_FORMS);
export const fetchFormsSuccess = createSingleAction(
  types.FETCH_FORMS_SUCCESS,
);
export const fetchFormsFailure = createSingleAction(
  types.FETCH_FORMS_FAILURE,
);

export const uploadFiles = createSingleAction(types.UPLOAD_FILES);
export const uploadFilesSuccess = createSingleAction(
  types.UPLOAD_FILES_SUCCESS,
);
export const uploadFilesFailure = createSingleAction(
  types.UPLOAD_FILES_FAILURE,
);

export const showPdf = createSingleAction(types.SHOW_PDF);
export const showPdfSuccess = createSingleAction(
  types.SHOW_PDF_SUCCESS,
);
export const showPdfFailure = createSingleAction(
  types.SHOW_PDF_FAILURE,
);


