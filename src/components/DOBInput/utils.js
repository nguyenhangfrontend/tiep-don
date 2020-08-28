import moment from "moment";

export const checkFormat = (input) => {
	const text = input ? input.split('/').join('') : '';
	const formatTypes = ['DDMMYY', 'DDMMYYYY', 'YYYY', '*', '**', '***'];

	return formatTypes.find(item => {
		return item.length === text.length;
	});
};

export const objectConverter = (value, formatStr) => {
	const age = moment().diff(value, 'year');
	const ageStr = age < 3 ? moment().diff(value, 'month') : age;
	const ageUnit = age < 3 ? 'tháng' : 'tuổi';
	const strData = value ? value.format(formatStr) : '';

	return {
		date: value,
		str: `${strData} - ${ageStr} ${ageUnit}`,
		formatStr,
		strData,
	};
};

export const dateDefault = {
	date: {},
	str: '',
	formatStr: '',
	strData: '',
};
