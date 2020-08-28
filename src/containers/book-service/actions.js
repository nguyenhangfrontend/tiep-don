import { createSingleAction } from 'utils/reduxActions';
import * as types from './constants';

export const fetchFailure = createSingleAction(types.FETCH_DATA_FAILURE);

// get departments data
export const getDepartments = createSingleAction(types.UPDATE_DEPARTMENT);
export const getDepartmentsSuccess = createSingleAction(types.UPDATE_DEPARTMENT_SUCCESS);

// get users data
export const getUsers = createSingleAction(types.USERS);
export const getUsersSuccess = createSingleAction(types.USERS_SUCCESS);

// get technical service data
export const getTechnicalServices = createSingleAction(types.TECHNICAL_SERVICE);
export const updateTechnicalServices = createSingleAction(types.UPDATE_TECHNICAL_SERVICE);

// get patient services
export const getPatientServices = createSingleAction(types.PATIENT_SERVICE);
export const getPatientServicesSuccess = createSingleAction(types.PATIENT_SERVICE_SUCCESS);
export const updatePatientServices = createSingleAction(types.UPDATE_PATIENT_SERVICE);

// remove patient services
export const removePatientServices = createSingleAction(types.REMOVE_PATIENT_SERVICE);
export const removePatientServicesSuccess = createSingleAction(types.REMOVE_PATIENT_SERVICE_SUCCESS);

// get dye methods
export const getDyeMethods = createSingleAction(types.FETCH_DYE_METHODS);
export const getDyeMethodsSuccess = createSingleAction(types.FETCH_DYE_METHODS_SUCCESS);

// get biopsy locations
export const getBiopsyLocations = createSingleAction(types.FETCH_BIOPSY_LOCATIONS);
export const getBiopsyLocationsSuccess = createSingleAction(types.FETCH_BIOPSY_LOCATIONS_SUCCESS);

// get service rooms
export const getServiceRooms = createSingleAction(types.FETCH_SERVICE_ROOMS);
export const getServiceRoomsSuccess = createSingleAction(types.FETCH_SERVICE_ROOMS_SUCCESS);

// add service
export const editService = createSingleAction(types.EDIT_SERVICE_CALL);
export const addService = createSingleAction(types.ADD_SERVICE);
export const addServiceSuccess = createSingleAction(types.ADD_SERVICE_SUCCESS);
export const editServiceSuccess = createSingleAction(types.EDIT_SERVICE_SUCCESS);

// update on plan services
export const updateOnPlanService = createSingleAction(types.PLAN_SERVICES);

export const openEditService = createSingleAction(types.OPEN_EDIT_SERVICE);
export const clearEditData = createSingleAction(types.CLEAR_EDIT_SERVICE);
