import constants from 'resources/strings'
import request from 'utils/request'

export const fetchDyeMethods = (data) => {
  return request(constants.api.resources.dyeMethods, {
    params: { ...data },
  })
};

export const fetchBiopsyLocations = (data) => {
  return request(constants.api.resources.biopsyLocations, {
    params: { ...data },
  })
};
