import { isEmpty, isArray } from 'lodash';
import menu, { LIST_KEY } from './constants';

const listSpecialData = {
  [LIST_KEY.MedicineSupply]: LIST_KEY.TreetmentSheet, // if to be MedicineSupply => getdata of TreetmentSheet
  [LIST_KEY.SurgicalCertificate]: LIST_KEY.SurgicalBill, // same above
};

export function handleListPdf(type = 'inPatient', services) {
  const flattenServices = Object.keys(services).reduce(
    (r, k) => ({ ...r, ...services[k] }),
    {},
  );

  return menu.reduce((listFinal, item) => {
    const listMainPdf = item.subMenu[type].reduce(
      (listFinalPdf, itemSubMenu) => {
        if (itemSubMenu.haveSubMenu) {
          let currentListPdf;
          if (
            listSpecialData.hasOwnProperty(itemSubMenu.key) &&
            flattenServices[listSpecialData[itemSubMenu.key]]
          ) {
            currentListPdf = flattenServices[listSpecialData[itemSubMenu.key]];
          }

          if (
            !isEmpty(flattenServices[itemSubMenu.key]) &&
            isArray(flattenServices[itemSubMenu.key])
          ) {
            currentListPdf = flattenServices[itemSubMenu.key];
          }

          if (!isEmpty(currentListPdf))
            listFinalPdf.push({ [itemSubMenu.key]: currentListPdf });
          return listFinalPdf;
        } else {
          listFinalPdf.push(itemSubMenu.key);
        }
        return listFinalPdf;
      },
      [],
    );
    listFinal[item.key] = listMainPdf;
    return listFinal;
  }, {});
}
