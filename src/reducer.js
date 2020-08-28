/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux'
import modal from 'components/Modal/RootModal/reducer';
import history from 'utils/history'
import globalReducer from './reducers/'
// import languageProviderReducer from 'containers/LanguageProvider/reducer'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    modal,
    // language: languageProviderReducer,
    ...injectedReducers,
  });

  return rootReducer
}
