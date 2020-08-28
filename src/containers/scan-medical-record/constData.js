import  ViewScan  from './components';
export const columnsPatient = [
  { key: 'patientDocument', content: '', title:'Mã hồ sơ',  width: 0, className: 'col-patient-value' },
  {
    key: 'name',
    content: '',
    width: 0,
    title:'Họ và tên',
    className: 'col-name',
    isTitle: true,
  },
  { key: 'form', content: '', width: 0, title: 'Biểu mẫu', className: 'col-sample' },
  { key: 'canTimes', content: '', width: 0, title: 'Lần scan', className: 'col-times-scan' },
  { key: 'birthday', content: '', width: 0, title: 'Ngày sinh', className: 'col-birthday' },
  { key: 'gender', content: '', width: 0, title: 'Giới tính', className: 'col-gender' },
  { key: 'address', content: '', width: 0, title: 'Địa chỉ', className: 'col-address' },
  {
    key: 'medicalRecordScan',
    content: '',
    width: 0,
    title: 'Giấy tờ scan',
    className: 'col-scan-paper',
    component: ViewScan,
    value: 'link'
  },
  // {
  //   key: 'active',
  //   value: 'active',
  //   content: '',
  //   width: 0,
  //   title: 'Có hiệu lực',
  //   className: 'col-effective',
  //   component:  Active
  // },
];