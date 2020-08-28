import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import CheckBox from 'components/CheckBox';
import { getStatusClass } from '../Table/utils';
import WrapperContent from 'containers/book-service/Table/WrapperContent';
import Row from 'containers/book-service/Table/Row';
import EditIcon from 'resources/svg/edit.svg';
import TrashIcon from 'resources/svg/trash.svg';
import PrintGrayIcon from 'resources/svg/print-gray.svg';
import CheckedDarkIcon from 'resources/svg/checked-dark.svg';
import { getResource } from 'containers/book-service/utils';
import { createStructuredSelector } from 'reselect';
import { selectDepartments, selectUsers, selectUom,
	selectBiopsyLocations, selectDyeMethods } from 'containers/book-service/selectors';
import { selectRooms } from 'containers/reception/selectors';
import { serviceTypes, status, specimenProperty } from 'containers/book-service/constants';

const formatDate = 'DD/MM/YYYY HH:mm:ss';

export const CheckAllHeader = ({ selectAll, allSelected }) => {
	return (
		<div >
			<CheckBox type={'pink'} onChange={selectAll} checked={allSelected}>{' Tất cả'}</CheckBox>
		</div>
	)
};

export const CheckAll = ({ actions, row, index, selected }) => {
	const type = serviceTypes.find(item => item.key === row.value);
	const allChild = row.groupChild &&
		row.groupChild
			.map(key => selected.find(item => item === key))
			.filter(item => !item).length === 0;
	return (
		<div className={'select-all-col'}>
			<CheckBox
				onChange={actions.handleChangeSelected(index, row.parent, row.groupChild)}
				type={'pink'}
				checked={allChild}
				value={row.key}
			/>
			{type &&
				<div onClick={actions.edit(row.parent, false, null)}>
					<type.icon className={'group-service-icon'} />
				</div>
			}
		</div>
	)
};

export const CheckOne = ({ actions, row, index, selected }) => {
	const allChild = row.child &&
		row.child
			.map(key => selected.find(item => item === key))
			.filter(item => !item).length === 0;

	return (
		<CheckBox
			onChange={actions.handleChangeSelected(index, row.key, row.child)}
			valueExport
			type={row.child ? 'pink' : 'dark'}
			checked={row.child ? allChild : selected.includes(row.key)}
			value={row.key}
		/>
	)
};

export const CustomRow = (props) => {
	const { selected, row, name, index, columns, indexFocus, actions, columnProps } = props;
	if (row.colSpan) {
		return (
			<tr
				id={`${name}_${index}`}
				key={row.key}
				className={getStatusClass(index, indexFocus, selected, row.key)}
				onDoubleClick={actions.edit(row.key, false, 'sequence')}
			>
				{columns
					.filter(item => item.fixed === 'left' || columns.key === 'no')
					.map(col => col.key === 'checkAll' || col.key === 'value' ? (
						null
					) : (
						<td
							key={col.key}
							colSpan={col.key === 'no' ? row.colSpan + 2 : ''}
							className={col.key === 'no' ? 'sequence-group-no' : ''}
						>
							<WrapperContent
								onDoubleClick={actions.edit(row.key, false, 'sequence')}
								width={col.key === 'no' ? '100%' : col.width}
							>
								{col.component ?
										<col.component
											actions={actions}
											row={row}
											selected={selected}
											index={index}
											data={row[col.value]}
										/>
									: ''}
							</WrapperContent>
						</td>
					)
				)}
			</tr>
		)
	}

	return (
		<Row {...props} />
	)
};

export const CustomFixedRow = (props) => {
	const { selected, row, name, index, columns, indexFocus, actions} = props;

	return (
		<tr
			id={`${name}_${index}`}
			key={row.key}
			className={getStatusClass(index, indexFocus, selected, row.key)}
		>
			{columns.map(col => {
				if (col.key === 'checkAll') {
					return row.firstRow ? (
						<td key={col.key} rowSpan={row.rowSpan} style={{ backgroundColor: 'white' }}>
							<WrapperContent width={col.width}>
								{col.component ?
									<col.component
										actions={actions}
										selected={selected}
										row={row}
										index={index}
										data={row[col.value]}
									/>
									: (row[col.value] || '')}
							</WrapperContent>
						</td>
					) : null;
				} else {
					if (col.key === 'value' && row.sequenceGroupNo) {
						return null;
					}

					if (col.key === 'no' && row.sequenceGroupNo) {
						return (
							<td
								key={col.key}
								colSpan={col.key === 'no' && row.sequenceGroupNo ? 2 : ''}
								className={'sequence-group-no'}
								style={{ cursor: 'pointer' }}
								onDoubleClick={actions.edit(row.key, false, 'sequence')}
							>
								<WrapperContent
									width={col.width + columns.find(item => item.key === 'value').width}
								>
									{col.component ?
										<col.component
											actions={actions}
											selected={selected}
											row={row}
											index={index}
											data={row[col.value]}
										/> : (row[col.value] || '')}
									{' '}
									<PrintGrayIcon />
								</WrapperContent>
							</td>
						)
					}

					return (
						<td
							key={col.key}
							onDoubleClick={actions.edit(row.key, false, 'service')}
						>
							<WrapperContent width={col.width}>
								{col.component ?
									<col.component
										actions={actions}
										selected={selected}
										row={row}
										index={index}
										data={row[col.value]}
									/> : (row[col.value] || '')}
							</WrapperContent>
						</td>
					)
				}
			})}
		</tr>
	)
};

export const Actions = ({ actions, row }) => {
	return (
		<div className={'service-action-col'}>
			<button onClick={actions.edit(row.key, false, 'service')} className={'icon-btn'}>
				<EditIcon />
			</button>

			<button onClick={actions.removeService(row.key)} className={'icon-btn'}>
				<TrashIcon />
			</button>
		</div>
	);
};

export const RenderDate = ({ row, data }) => {
	const value = data ? moment(data).format(formatDate) : '--/--/----';
	return (
		<div title={value}>{value}</div>
	)
};

const RenderFromList = (props) => {
	const { oneOf, data, users, departments, biopsyLocations, dyeMethods, rooms, uom, row } = props;
	const list = {
		users,
		departments,
		biopsyLocations,
		dyeMethods,
		rooms,
		status,
		specimenProperty: specimenProperty.map(item => ({ id: item.value, name: item.label })),
		servicePurposes: row.servicePurposes,
		uom: Object.keys(uom).map(key => uom[key]),
	};

	const value = getResource(list[oneOf], data);
	return <div title={value} className={'limit-size'}>{value}</div>
};

export const RenderBoolean = ({ data }) => {
	return data ? <CheckedDarkIcon /> : '-';
};

export const RenderNumber = ({ data }) => {
	const value = <NumberFormat thousandSeparator value={data} displayType={'text'} />;
	return <div title={value}>{value}</div>
};

export const RenderData = ({ data }) => {
	return <div title={data} className={'limit-size'}>{data}</div>
};

const mapState = createStructuredSelector({
	users: selectUsers(),
	departments: selectDepartments(),
	biopsyLocations: selectBiopsyLocations(),
	dyeMethods: selectDyeMethods(),
	rooms: selectRooms(),
	uom: selectUom(),
});

export const RenderOneOf = connect(mapState)(RenderFromList);
