import { createSelector } from 'reselect'
import { initialState } from './reducer'
import { context } from './constants';

export const selectModal = state => state[context] || initialState

export const currentModal = () =>
  createSelector(
    selectModal,
    state => state.current,
  )