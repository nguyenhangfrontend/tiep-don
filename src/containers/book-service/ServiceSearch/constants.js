import { CheckAll, CheckOne } from './components';

export const columns = [
	{ key: 'checkAll', value: '', title: 'Tất cả', component: CheckAll, sortFunc: '', width: 90, fixed: 'left' },
	{ key: 'checked', value: '', title: '', component: CheckOne, sortFunc: '', width: 40, fixed: 'left' },
	{ key: 'value', value: 'value', title: 'Mã DV', component: '', sortFunc: '', width: 60, fixed: '' },
	{ key: 'serviceName', value: 'serviceName', title: 'Tên DV', component: '', sortFunc: '', width: 200, fixed: '' },
	{ key: 'serviceUnitPrice', value: 'serviceUnitPrice', title: 'Giá DV', component: '', sortFunc: '', width: 200, fixed: '' },
	{ key: 'insuranceUnitPrice', value: 'insuranceUnitPrice', title: 'Giá BH', component: '', sortFunc: '', width: 200, fixed: '' },
	{ key: 'differenceUnitPrice', value: 'differenceUnitPrice', title: 'Giá Chênh', component: '', sortFunc: '', width: 200, fixed: '' },
	{ key: 'roomId', value: 'roomId', title: 'Phòng', component: '', sortFunc: '', width: 200, fixed: '' },
];