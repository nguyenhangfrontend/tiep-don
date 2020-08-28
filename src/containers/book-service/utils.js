
export const availableEditing = (status, currentStt) => !status.includes(currentStt);

export const getResource = (list, id) => {
	const item = list ? list.find(item => item.id === parseFloat(id)) : null;
	if (item) {
		return item.fullName || item.name;
	}

	return '';
};

export const findOneService = (list = [], id) => {
	const service = list.find(item => item.id === id);
	return service || {};
};

export const combineError = (errors, services) => {
	return errors.map(item => {
		let message = item.message || '';
		let index = message.indexOf(":");
		const service = services.find(s => s.id === item.serviceId) || {};
		let value = service.value || '';

		if (index !== -1) {
			value = message.substring(0, index);
			message = message.substring(index + 1);
		}

		return { value, message };
	});
};

export const objectToArray = (obj) => {
	return Object.keys(obj).map(key => parseFloat(key)).map(key => ({ keyPath: key, id: key, value: obj[key]}));
};
