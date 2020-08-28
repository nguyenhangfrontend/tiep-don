import React from 'react';
// import Loadable from 'react-loadable';
import Loadable from 'utils/loadable';

function Loading() {
  return <div>Loading...</div>;
}

const tiepDon = Loadable(() => import('containers/reception'), {
  fallback: Loading,
});

const medicalRecord = Loadable(() => import('containers/medical-record'), {
  fallback: Loading,
});

const scanMedicalRecord = Loadable(() => import('containers/scan-medical-record'), {
  fallback: Loading,
});

const checkOut = Loadable(() => import('containers/check-out'), {
  fallback: Loading,
});

const routes = [
  // { path: '/admin/tiep-don', name: 'Tiếp đón', component: tiepDon },
  // { path: '/admin/thanh-toan', name: 'Thanh Toán', component: checkOut },
  {
    path: '/admin/ho-so-benh-an',
    name: 'Hồ sơ bệnh án',
    component: medicalRecord,
  },
  // {
  //   path: '/admin/scan-benh-an',
  //   name: 'Scan Giấy tờ',
  //   component: scanMedicalRecord,
  // },
];

export default routes;
