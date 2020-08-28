export const errors = [
	{
		message: 'Thông tin thẻ chính xác',
		code: '000',
		error: true,
	},
	{
		message: 'Thẻ do BHXH Bộ Quốc Phòng quản lý, đề nghị kiểm tra thẻ và thông tin giấy tờ tùy thân',
		code: '001',
		error: false,
	},
	{
		message: 'Thẻ do BHXH bộ Công An quản lý, đề nghị kiểm tra thẻ và thông tin giấy tờ tùy thân',
		code: '002',
		error: false,
	},
	{
		message: 'Thẻ cũ hết giá trị sử dụng, được cấp thẻ mới',
		code: '003',
		error: false,
	},
	{
		message: 'Thẻ cũ còn giá trị sử dụng, được cấp thẻ mới',
		code: '004',
		error: false,
	},
	{
		message: 'Thẻ hết giá trị sử dụng',
		code: '010',
	},
	{
		message: 'Mã thẻ không đúng',
		code: '051',
	},
	{
		message: 'Mã tỉnh cấp thẻ (ký tự thứ 4,5) của thẻ không đúng',
		code: '052',
	},
	{
		message: 'Mã quyền lợi (ký tự thứ 3) của thẻ không đúng',
		code: '053',
	},
	{
		message: 'Không có thông tin thẻ',
		code: '050',
	},
	{
		message: 'Thẻ sai họ tên',
		code: '060',
	},
	{
		message: 'Thẻ sai họ tên (đúng ký tự đầu)',
		code: '061',
	},
	{
		message: 'Thẻ sai ngày sinh',
		code: '070',
	},
	{
		message: 'Lỗi khi lấy dữ liệu sổ thẻ',
		code: '100',
	},
	{
		message: 'Lỗi server',
		code: '101',
		errorServer: true
	},
	{
		message: 'Thẻ đã thu hồi',
		code: '110',
	},
	{
		message: 'Thẻ đã báo giảm',
		code: '120',
	},
	{
		message: 'Thẻ đã báo giảm chuyển ngoại tỉnh',
		code: '121',
	},
	{
		message: 'Thẻ đã báo giảm chuyển nội tỉnh',
		code: '122',
	},
	{
		message: 'Thẻ đã báo giảm do tăng lại cùng đơn vị',
		code: '123',
	},{
		message: 'Thẻ đã báo giảm ngừng tham gia',
		code: '124',
	},{
		message: 'Trẻ em không xuất trình thẻ',
		code: '130',
	},{
		message: 'Lỗi sai định dạng tham số',
		code: '205',
	},{
		message: 'Lỗi xác thực tài khoản',
		code: '401',
		errorServer: true,
	},
];