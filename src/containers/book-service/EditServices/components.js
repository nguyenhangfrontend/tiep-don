import React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Checkbox, Select, Input, InputNumber } from 'components/Input';
import { specimenProperty } from 'containers/book-service/constants';
import { getResource, availableEditing } from 'containers/book-service/utils';

export const ServiceId = ({ data, common, onChange, ...other }) => {
	if (common.editFromBook || data.serviceType !== 10) {
		return (
			<div className={'value-row'} title={data.name || data.serviceName}>
				<span className={'service-code'}>{data.value}</span>
				<span>{' - '}{data.name || data.serviceName}</span>
			</div>
		);
	}

	return availableEditing([110, 120, 60, 130, 140, 300, 310], data.status) ? (
		<Select
			{...other}
			onSelect={onChange}
			value={data.serviceId}
			showSearch
			resources={common.technicalServices.filter(item => item.serviceType === 10)
				.map(item => ({ value: item.id, label: item.name }))}
		/>
	) : (
		<div className={'value-row'} title={data.name || data.serviceName}>
			<span className={'service-code'}>{data.value}</span>
			<span>{' - '}{data.name || data.serviceName}</span>
		</div>
	)
};

export const RoomId = ({ data, common, onChange, ...other }) => {
	const rooms = common.rooms[data.serviceId] || [];
	return (
		availableEditing([110, 80, 70, 120, 60, 130, 140, 300, 310, 90, 100, 150], data.status) ? (
			<Select
				{...other}
				onSelect={onChange}
				value={rooms.length === 1 ? rooms[0].value : data.roomId}
				showSearch
				resources={rooms.map(item => ({ value: item.id, label: item.name }))}
			/>
		) : (
			<span title={data.name}>{data.name}</span>
		)
	);
};

export const Quantity = ({ data, onChange }) => (
	(data.paid || !availableEditing([], data.status) || data.serviceType === 10) ? data.quantity : (
		<InputNumber defaultValue={data.quantity || 1} value={data.quantity} onChange={onChange} min={1} />
	)
);

export const NotCounted = ({ data, onChange }) => (
	<Checkbox disabled={data.paid} checked={data.notCounted} onChange={onChange} />
);

export const ServiceUsed = ({ data, onChange }) => (
	<Checkbox disabled={data.paid} checked={data.serviceUsed} onChange={onChange} />
);

export const PatientRequest = ({ data, onChange }) => (
	<Checkbox disabled={data.paid} checked={data.patientRequest} onChange={onChange} />
);

export const ServicePurpose = ({ data, onChange, ...other }) => {
	return (
		data.servicePurposes ? (
			<Select
				{...other}
				resources={data.servicePurposes.map(item => ({ value: item.id, label: item.name }))}
				value={data.servicePurposeId}
				onSelect={onChange}
			/>
		) : (
			<span />
		)
	);
};

export const Specimens = ({ data, onChange, ...other }) => (
	<Input value={data.specimens} onChange={onChange} {...other} />
);

export const Diagnostic = ({ data, onChange, ...other }) => (
	availableEditing([80, 60, 70, 90, 100, 110, 150, 300, 310], data.status) ? (
		<Input value={data.diagnostic} onChange={onChange} {...other} />
	) : (
		data.diagnostic
	)
);

export const BiopsyLocationId = ({ data, common, onChange, ...other }) => (
	availableEditing([80, 60, 70, 90, 100, 110, 150, 300, 310], data.status) ? (
		<Select
			{...other}
			onSelect={onChange}
			resources={common.biopsyLocations.map(item => ({ value: item.id, label: item.name }))}
			value={data.biopsyLocationId}
		/>
	) : (
		<span title={getResource(common.biopsyLocations, data.biopsyLocationId)}>
			{getResource(common.biopsyLocations, data.biopsyLocationId)}
		</span>
	)
);

export const SpecimenProperty = ({ data, onChange, ...other }) => (
	availableEditing([80, 60, 70, 90, 100, 110, 150, 300, 310], data.status) ? (
		<Select
			resources={specimenProperty}
			value={data.specimenProperty}
			onSelect={onChange}
			{...other} />
	) : (
		<span title={getResource(specimenProperty, data.specimenProperty)}>
			{getResource(specimenProperty, data.specimenProperty)}
		</span>
	)
);

export const DyeMethod = ({ data, common, onChange, ...other }) => (
	availableEditing([80, 60, 70, 90, 100, 110, 150, 300, 310], data.status) ? (
		<Select
			{...other}
			onSelect={onChange}
			value={data.dyeMethodId}
			resources={common.dyeMethods.map(item => ({ value: item.id, label: item.name }))}
		/>
	) : (
		<span title={getResource(common.dyeMethods, data.dyeMethodId)}>
			{getResource(common.dyeMethods, data.dyeMethodId)}
		</span>
	)
);

export const MainUser1Id = ({ data, oneOf, onChange, ...other }) => (
	<Select
		{...other}
		showSearch
		resources={oneOf.map(item => ({ value: item.id, label: item.fullName }))}
		value={data.mainUser1Id}
		onSelect={onChange}
	/>
);

export const Description = ({ data, onChange }) => (
	availableEditing([], data.status) ? (
		<Input onChange={onChange} value={data.description} />
	) : (
		<span title={data.description}>
			{data.description}
		</span>
	)
);

export const Option = ({ data, onChange }) => (
	<Checkbox disabled={data.paid} checked={data.option} onChange={onChange} />
);

export const DeferredPayment = ({ data, onChange }) => (
	<Checkbox disabled={data.paid} checked={data.deferredPayment} onChange={onChange} />
);

export const RenderDate = ({ value }) => (
	<span>{value ? moment(value).format('DD/MM/YYYY HH:mm:ss') : '--/--/----'}</span>
);

export const RenderValueOfArray = ({ value, oneOf }) => (
	<span title={getResource(oneOf, value)}>{getResource(oneOf, value)}</span>
);

export const RenderNumberFormat = ({ value }) => (
	<NumberFormat displayType={'text'} thousandSeparator value={value} />
);

export const RenderCheckbox = ({ value }) => (
	<Checkbox checked={value} disabled />
);
