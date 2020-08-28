import DvKIcon from 'resources/svg/dv_kham.svg';
import DvPTIcon from 'resources/svg/dv_phauthuat.svg';
import DvXNIcon from 'resources/svg/dv_xetnghiem.svg';
import DvCDHAIcon from 'resources/svg/dv_chuandoanhinhanh.svg';
import DvTTIcon from 'resources/svg/dv_thuthuat.svg';
import DvKHACIcon from 'resources/svg/dv_khac.svg';
import Dv_TDCNIcon from 'resources/svg/dv_thamdochucnang.svg';

export const prefix = 'bookService';

export const FETCH_DATA_FAILURE = `${prefix}_FETCH_DATA_FAILURE`;

export const UPDATE_DEPARTMENT = `${prefix}_UPDATE_DEPARTMENT`;
export const UPDATE_DEPARTMENT_SUCCESS = `${prefix}_UPDATE_DEPARTMENT_SUCCESS`;

export const UPDATE_PATIENT_SERVICE = `${prefix}_UPDATE_PATIENT_SERVICE`;

export const USERS = `${prefix}_USERS`;
export const USERS_SUCCESS = `${prefix}_USERS_SUCCESS`;

export const TECHNICAL_SERVICE = `${prefix}_TECHNICAL_SERVICE`;
export const UPDATE_TECHNICAL_SERVICE = `${prefix}_UPDATE_TECHNICAL_SERVICE`;

export const PATIENT_SERVICE = `${prefix}_PATIENT_SERVICE`;
export const PATIENT_SERVICE_SUCCESS = `${prefix}_PATIENT_SERVICE_SUCCESS`;

export const FETCH_DYE_METHODS = `${prefix}_FETCH_DYE_METHODS`;
export const FETCH_DYE_METHODS_SUCCESS = `${prefix}_FETCH_DYE_METHODS_SUCCESS`;

export const FETCH_BIOPSY_LOCATIONS = `${prefix}_FETCH_BIOPSY_LOCATIONS`;
export const FETCH_BIOPSY_LOCATIONS_SUCCESS = `${prefix}_FETCH_BIOPSY_LOCATIONS_SUCCESS`;

export const PLAN_SERVICES = `${prefix}_PLAN_SERVICES`;

export const REMOVE_PATIENT_SERVICE = `${prefix}_REMOVE_PATIENT_SERVICE`;
export const REMOVE_PATIENT_SERVICE_SUCCESS = `${prefix}_REMOVE_PATIENT_SERVICE_SUCCESS`;

export const ADD_SERVICE = `${prefix}_ADD_SERVICE`;
export const OPEN_EDIT_SERVICE = `${prefix}_OPEN_EDIT_SERVICE`;
export const CLEAR_EDIT_SERVICE = `${prefix}_CLEAR_EDIT_SERVICE`;
export const EDIT_SERVICE_CALL = `${prefix}_EDIT_SERVICE_CALL`;
export const EDIT_SERVICE_SUCCESS = `${prefix}_EDIT_SERVICE_SUCCESS`;
export const ADD_SERVICE_SUCCESS = `${prefix}_ADD_SERVICE_SUCCESS`;

export const FETCH_SERVICE_ROOMS = `${prefix}_FETCH_SERVICE_ROOMS`;
export const FETCH_SERVICE_ROOMS_SUCCESS = `${prefix}_FETCH_SERVICE_ROOMS_SUCCESS`;

export const status = [
	{ id: 10, name: 'Đã in phiếu' },
	{ id: 20, name: 'Chờ tiếp đón' },
	{ id: 30, name: 'Đăng ký' },
	{ id: 40, name: 'Chờ tiếp nhận' },
	{ id: 50, name: 'Chờ khám' },
	{ id: 60, name: 'Bỏ qua' },
	{ id: 70, name: 'Đã bàn giao' },
	{ id: 80, name: 'Đã lấy mẫu bệnh phẩm' },
	{ id: 90, name: 'Scancode' },
	{ id: 100, name: 'Trả lại mẫu' },
	{ id: 110, name: 'Đang khám', nameKB: 'Đã tiếp nhận' },
	{ id: 120, name: 'Đang khám' },
	{ id: 130, name: 'Chờ kết luận' },
	{ id: 140, name: 'Đã kết luận' },
	{ id: 150, name: 'Đã có kết quả' },
	{ id: 300, name: 'Yêu cầu hoàn' },
	{ id: 310, name: 'Đã hoàn' },
];

export const specimenProperty = [
	{ value: 0, label: 'Không đạt yêu cầu' },
	{ value: 1, label: 'Đạt yêu cầu' },
];

export const serviceTypes = [
	{ id: 10, key: 'KB', name: 'Khám Bệnh', icon: DvKIcon },
	{ id: 20, key: 'XN', name: 'Xét nghiệm', icon: DvXNIcon },
	{ id: 40, key: 'TT', name: 'Thủ thuật', icon: DvTTIcon },
	{ id: 30, key: 'CDHA', name: 'Chuẩn đoán hình ảnh', icon: DvCDHAIcon },
	{ id: 40, key: 'KB', name: 'Phẫu thuật', icon: DvPTIcon },
	{ id: 0, key: 'KHAC', name: 'DV KHÁC', icon: DvKHACIcon },
	{ id: 0, key: 'TDCN', name: 'Thăm dò chức năng', icon: Dv_TDCNIcon },
	{ id: 0, key: 'KB', name: 'Chuẩn đoán hình ảnh', icon: DvCDHAIcon },
];
