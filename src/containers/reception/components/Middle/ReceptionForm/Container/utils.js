export const formToBody = (form, patient) => {
	const keys = Object.keys(form).filter(item => item !== 'birthday');
	return keys.reduce((result, key) => ({
		...result,
		[key]: patient[key] || form[key],
	}), {});
};
