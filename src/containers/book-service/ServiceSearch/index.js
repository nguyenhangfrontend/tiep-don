import React from 'react';
import TableControl from '../Table/TableControl';
import { columns } from './constants';
import { CustomFixedRow } from '../Services/components';
import { structServices } from './utils';

const ServiceSearch = (props) => {
	const { services } = props;

	return (
		<TableControl
			rows={structServices(services)}
			CustomFixedRow={CustomFixedRow}
			columns={columns}
			CustomRow={CustomFixedRow}
		/>
	)
};

export default ServiceSearch;
