import React from 'react';

import View from './View';

class Table extends React.Component {
	constructor(props) {
		super(props);
		const { columns, rowData } = props;
		const colKeys = columns.map(item => item.key);
		const rowKeys = rowData.map(item => item.key);
		const tableFieldKeys = [];

		rowKeys.forEach(rowKey => {
			colKeys.forEach(colKey => {
				tableFieldKeys.push(`${rowKey}_${colKey}`)
			});
		});

		this.state = {
			rowData: rowData,
			tableFields: {},
		};

		this.setData = tableFieldKeys.reduce((result, nextKey) => ({
			...result,
			[nextKey]: this.handleKeyChange.bind(this, nextKey),
		}), {});
	}


	handleKeyChange(key, value) {
		const { rowData } = this.state;
		const rowKey = key.split('_')[0];
		const colKey = key.split('_')[1];

		const newRowData = rowData.map(row => row.key === parseInt(rowKey) ?  ({
			...row,
			serviceUsed: (colKey === 'patientRequest') ? value : row['serviceUsed'],
			[colKey]: value,
		}) : row);

		this.setState({ rowData: newRowData });
	};

	collect = () => {
		return this.state.rowData;
	};

	render() {
		const { header, footer, columns, group, sequences, common } = this.props;
		return (
			<View
				{...this.state}
				columns={columns}
				group={group}
				common={common}
				sequences={sequences}
				setData={this.setData}
				footer={footer}
				header={header}
			/>
		);
	}
}

export default Table;
