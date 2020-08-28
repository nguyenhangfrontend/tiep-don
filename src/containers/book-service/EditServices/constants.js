import DvIcon from 'resources/svg/dv.svg';
import DvCDHAIcon from 'resources/svg/dv_chuandoanhinhanh.svg';
import DvKIcon from 'resources/svg/dv_kham.svg';
import DvPTIcon from 'resources/svg/dv_phauthuat.svg';
import DvTDCNIcon from 'resources/svg/dv_thamdochucnang.svg';
import DvTTIcon from 'resources/svg/dv_thuthuat.svg';
import DvXNIcon from 'resources/svg/dv_xetnghiem.svg';
import {
	BiopsyLocationId,
	DeferredPayment,
	Description,
	Diagnostic,
	DyeMethod,
	MainUser1Id,
	NotCounted,
	Option,
	PatientRequest,
	Quantity,
	RenderCheckbox,
	RenderDate,
	RenderValueOfArray,
	RoomId,
	ServiceId,
	ServicePurpose,
	ServiceUsed,
	SpecimenProperty,
	Specimens,
	RenderNumberFormat
} from './components';

export const columns = [
	{ value: 'serviceId', width: 200, key: 'serviceId', title: 'Tên dịch vụ', component: ServiceId, oneOf: 'technicalServices' },
	{ value: 'roomId', width: 150, key: 'roomId', title: 'Phòng', component: RoomId },
	{ value: 'notCounted', width: 50, key: 'notCounted', title: 'Không TT', component: NotCounted },
	{ value: 'quantity', width: 50, key: 'quantity', title: 'Số lượng', component: Quantity },
	{ value: 'serviceUsed', width: 50, key: 'serviceUsed', title: 'Tự túc', component: ServiceUsed },
	{ value: 'patientRequest', width: 50, key: 'patientRequest', title: 'NB yêu cầu', component: PatientRequest },
	{ value: 'servicePurposeId', width: 150, key: 'servicePurposeId', title: 'DKTTTT35', component: ServicePurpose },
	{ value: 'specimens', width: 150, key: 'specimens', title: 'Bệnh phẩm', component: Specimens },
	{ value: 'diagnostic', width: 150, key: 'diagnostic', title: 'Chẩn đoán', component: Diagnostic },
	{ value: 'biopsyLocationId', width: 150, key: 'biopsyLocationId', title: 'Vị trí sinh thiết', component: BiopsyLocationId },
	{ value: 'specimenProperty', width: 150, key: 'specimenProperty', title: 'Tính chất bệnh phẩm', component: SpecimenProperty },
	{ value: 'dyeMethodId', width: 150, key: 'dyeMethodId', title: 'Phương pháp nhuộm', component: DyeMethod },
	{ value: 'mainUser1Id', width: 150, key: 'mainUser1Id', title: 'BS khám', component: MainUser1Id, oneOf: 'users' },
	{ value: 'fromDoctorId', width: 150, key: 'fromDoctorId-1', title: 'BS chỉ định', component: RenderValueOfArray, oneOf: 'users' },
	{ value: 'description', width: 150, key: 'description', title: 'Mô tả', component: Description },
	{ value: 'option', width: 50, key: 'option', title: 'Theo yêu cầu', component: Option },
	{ value: 'deferredPayment', width: 50, key: 'deferredPayment', title: 'Thanh toán sau', component: DeferredPayment },
	{ value: 'conclusion', width: 150, key: 'conclusion', title: 'Kết luận', component: null },
	{ value: 'result', width: 150, key: 'result', title: 'Kết quả', component: null },
	{ value: 'fromDoctorId', width: 150, key: 'fromDoctorId', title: 'Người kê', component: RenderValueOfArray, oneOf: 'users' },
	{ value: 'empty', width: 150, key: 'empty', title: 'Người TH phụ', component: null },
	{ value: 'resultDate', width: 150, key: 'resultDate', title: 'Thời gian có kết quả', component: RenderDate },
	{ value: 'acceptedDate', width: 150, key: 'acceptedDate', title: 'Thời gian tiếp nhận', component: RenderDate },
	{ value: 'actDate', width: 150, key: 'actDate', title: 'Ngày thực hiện', component: RenderDate },
	{ value: 'fromDepartmentId', width: 150, key: 'fromDepartmentId', title: 'Khoa chỉ định', component: RenderValueOfArray, oneOf: 'departments' },
	{ value: 'status', width: 150, key: 'status', title: 'Trạng thái DV', component: RenderValueOfArray, oneOf: 'status' },
	{ value: 'paid', width: 50, key: 'paid', title: 'Đã thanh toán', component: RenderCheckbox },
	{ value: 'insuranceUnitPrice', width: 150, key: 'insuranceUnitPrice', title: 'Đơn giá BH', component: RenderNumberFormat },
	{ value: 'serviceUnitPrice', width: 150, key: 'serviceUnitPrice', title: 'Đơn giá DV', component: RenderNumberFormat },
	{ value: 'differenceUnitPrice', width: 150, key: 'differenceUnitPrice', title: 'Giá chênh', component: RenderNumberFormat },
	{ value: 'docDate', width: 150, key: 'docDate', title: 'Ngày kê', component: RenderDate },
	{ value: 'servicePaid', width: 50, key: 'servicePaid', title: 'Đã thanh toán DV', component: RenderCheckbox },
	{ value: 'insurancePaid', width: 50, key: 'insurancePaid', title: 'Đã thanh toán BH', component: RenderCheckbox },
];

export const types = [
	{ icon: DvIcon, name: 'Dịch vụ', type: 'service' },
	{ icon: DvIcon, name: 'Dịch vụ', type: 'booking' },
	{ icon: DvKIcon, name: 'Chỉnh sửa dịch vụ khám', type: 10 },
	{ icon: DvXNIcon, name: 'Chỉnh sửa dịch vụ xét nghiệm', type: 20 },
	{ icon: DvPTIcon, name: 'Chỉnh sửa dịch vụ phẫu thuật', type: 40 },
	{ icon: DvTDCNIcon, name: 'Chỉnh sửa dịch vụ thăm dò chức năng', type: 'TDCN-service' },
	{ icon: DvTTIcon, name: 'Chỉnh sửa dịch vụ thủ thuật', type: 'TT-service' },
	{ icon: DvCDHAIcon, name: 'Chỉnh sửa dịch vụ chuẩn đoán hình ảnh', type: 30 },
	{ icon: DvIcon, name: 'Chỉnh sửa số phiếu', type: 'sequence' },
];
