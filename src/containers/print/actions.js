import { createSingleAction } from 'utils/reduxActions'
import * as types from './constants'

// get historySigned list data
export const getHistorySigned = createSingleAction(types.HISTORY_SIGNED)
export const getHistorySignedSuccess = createSingleAction(types.HISTORY_SIGNED_SUCCESS)
export const getHistorySignedFailure = createSingleAction(types.HISTORY_SIGNED_FAILURE)

// get pdfHospitalized list data
export const getpdfHospitalized = createSingleAction(types.PDF_HOSPITALIZED)
export const getpdfHospitalizedSuccess = createSingleAction(types.PDF_HOSPITALIZED_SUCCESS)
export const getpdfHospitalizedFailure = createSingleAction(types.PDF_HOSPITALIZED_FAILURE)

// // get historySigned list data
// export const getHistorySigned = createSingleAction(types.HISTORY_SIGNED)
// export const getHistorySignedSuccess = createSingleAction(types.HISTORY_SIGNED_SUCCESS)
// export const getHistorySignedFailure = createSingleAction(types.HISTORY_SIGNED_FAILURE)

// // get historySigned list data
// export const getHistorySigned = createSingleAction(types.HISTORY_SIGNED)
// export const getHistorySignedSuccess = createSingleAction(types.HISTORY_SIGNED_SUCCESS)
// export const getHistorySignedFailure = createSingleAction(types.HISTORY_SIGNED_FAILURE)

export const resetState = createSingleAction(types.RESET_STATE)
