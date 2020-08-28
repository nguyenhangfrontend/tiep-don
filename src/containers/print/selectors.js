import { createSelector } from 'reselect'
import { initialState } from './reducer'
import { context } from './constants'
export const selectPrinter = state => state[context] || initialState
// 
export const selectHistorySigned = () =>
  createSelector(
    selectPrinter,
    printState => printState.historySigned,
  )
  
export const selectPdfHospitalized = () =>
  createSelector(
    selectPrinter,
    printState => printState.pdfHospitalized,
  )