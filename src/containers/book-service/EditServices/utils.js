export const getTechnicalService = (services, technicalServices, rooms) => {
	return services.map(service => {
		const technicalService = technicalServices.find(item => item.id === service.serviceId);
		return {
			...technicalService,
			...service,
			id: service.id ? service.id : null,
		}
	});
};
