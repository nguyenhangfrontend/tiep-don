export const search = (resource, value) => {
	if (value[0] !== '%') {
		return resource.includes(value);
	} else {
		const sizeCheck = value.length - 1;
		if (sizeCheck > 0) {
			return resource[sizeCheck] === value;
		}
	}
};
