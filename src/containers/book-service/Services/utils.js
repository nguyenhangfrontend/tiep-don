import { columns } from './constants';

const colSpan = columns.filter(item => item.fixed !== 'left').length + 1;

export const structServices = (data, groupLv1) => {
	const sequences = [];
	const groups = [];
	const services = data.map(item => ({
		...item,
		key: item.id,
		parent: item.sequenceNo || item.patientServiceGroupId
	}));

	services.forEach(service => {
		if (!groups.find(item => item.type === service.serviceType)) {
			const group = { type: service.serviceType, ...groupLv1[service.serviceGroupLevel1Id] };
			groups.push(group);
		}

		if (!sequences.find(item => item.sequenceGroupNo === service.sequenceNo
			|| item.sequenceGroupNo === service.patientServiceGroupId)
		) {
			const sequence = {
				sequenceGroupNo: service.sequenceNo || service.patientServiceGroupId,
				parent: service.serviceType,
				patientServiceGroupId: service.patientServiceGroupId,
			};

			sequences.push(sequence);
		}
	});

	return  {
		sequences,
		groups,
		rowData: groups.reduce((result, next) => {
			sequences.filter(item => item.parent === next.type).forEach((sequence, index) => {
				const row = {
					...sequence,
					colSpan,
					child: services.filter(service => service.parent === sequence.sequenceGroupNo).map(service => service.key),
					key: sequence.sequenceGroupNo,
					no: `Số phiếu: ${sequence.sequenceGroupNo}`,
					firstRow: index === 0,
					groupChild: index === 0 ?
						services.filter(service => service.serviceType === next.type).map(service => service.key)
						: null,
					rowSpan: sequences.filter(sequence => sequence.parent === next.type).length +
						services.filter(service => service.serviceType === next.type).length,
					...next,
				};

				result.push(row);

				services.filter(service => service.parent === sequence.sequenceGroupNo)
					.forEach((service, index) => {
						result.push({ ...service, no: index + 1 })
					});
			});

			return result;
		}, []),
	};
};

export const keysToServices = (keys, services) => {
	return keys.map(key => services.find(service => service.id === key) || null).filter(item => item !== null);
};

const handleSort = (data, type) => {

};
