import produce from 'immer'
import * as types from './constants'

export const initialState = {
  loading: true,
  historySigned: [],
  pdfHospitalized: '',
}

const printPDF = (state = initialState, action) =>
  produce(state, draftState => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case types.HISTORY_SIGNED:
        draftState.error = action.error
        draftState.loading = true
        break
      case types.HISTORY_SIGNED_SUCCESS:
        draftState.loading = false
        draftState.historySigned = action.payload
        break
      case types.PDF_HOSPITALIZED:
        draftState.loading = true
        break
      case types.PDF_HOSPITALIZED_SUCCESS:
        draftState.loading = false
        draftState.pdfHospitalized = action.payload
        break
      case types.PDF_HOSPITALIZED_FAILURE:
      case types.HISTORY_SIGNED_FAILURE:
        draftState.error = action.error
        draftState.loading = false
        break
      case types.RESET_STATE:
        draftState = initialState
        break
    }
  })

export default printPDF
