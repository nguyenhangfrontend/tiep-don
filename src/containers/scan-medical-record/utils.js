import { isEmpty, isArray } from 'lodash';


export function handleListPdf(type = 'inPatient', services) {
  const flattenServices = Object.keys(services).reduce(
    (r, k) => ({ ...r, ...services[k] }),
    {},
  );


}
