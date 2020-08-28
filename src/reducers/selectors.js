import { createSelector } from 'reselect'
import { initialState } from './index'
export const selectGlobal = state => state.global || initialState;
// 
export const lastTime = () =>
  createSelector(
    selectGlobal,
    selectGlobal => selectGlobal.last_time,
  );

export const selectDepartment = () =>
  createSelector(
    selectGlobal,
    selectGlobal => selectGlobal.userApp.department,
  );

export const selectUserApp = () =>
  createSelector(
    selectGlobal,
    selectGlobal => selectGlobal.userApp,
  );
