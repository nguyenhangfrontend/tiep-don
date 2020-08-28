import clientUtils from 'utils/client-utils';
import { isObject } from 'lodash';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const data = response.json();
  return data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {

  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(
  url,
  {
    method = 'GET',
    params = null,
    contentType = 'application/json',
    // accept = 'application/json',
    data = null,
    getPureFile = false,
    requireAuthen = true,
    accessToken = clientUtils.auth,
  },
) {
  const options = {
    method: method.toUpperCase(),
    headers: {
      // Accept: accept,
      'Content-type': contentType,
    },
  };
  let fullURl = url.getServiceUrl();
  if (isObject(params)) {
    fullURl = new URL(fullURl);
    Object.keys(params).forEach(key =>
      fullURl.searchParams.append(key, params[key]),
    );
  }
  if (data != null) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty('file')) {
      const dataForm = new FormData();
      dataForm.append('file', data.file);

      for (const name in data) {
        dataForm.append(name, data[name]);
      }
      dataForm.append('user', 'hubot');
      options.body = dataForm;
      delete options.headers['Content-type'];
    } else options.body = JSON.stringify(data); // data can be `string` or {object}!
  }

  if (requireAuthen) {
    const token = accessToken;
    options.headers.Authorization = `Bearer ${token}`;
  }
  if (getPureFile) return fetch(fullURl, options);

  return fetch(url && url.indexOf('http') === 0 ? fullURl : fullURl, options)
    .then(checkStatus)
    .then(parseJSON);
}
