export const structServices = (data) => {
	const groups = [];
	const services = data.map(item => ({
		...item,
		key: item.id,
		parent: item.serviceType,
	}));

	services.forEach(service => {
		if (!groups.find(item => item.type === service.serviceType)) {
			const group = { type: service.serviceType };
			groups.push(group);
		}
	});

	return groups.reduce((result, next) => {
		services.filter(service => service.parent === next.type)
			.forEach((service, index) => {
				result.push({
					...service,
					no: index + 1,
					firstRow: index === 0,
					rowSpan: services.filter((service => service.parent === next.type)).length,
				})
			});
		return result;
	}, []);
};