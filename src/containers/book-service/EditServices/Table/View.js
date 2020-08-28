import React from 'react';
import T from 'prop-types';
import { Main } from './styled';
import DvKIcon from 'resources/svg/dv_kham.svg';
import DvPTIcon from 'resources/svg/dv_phauthuat.svg';
import DvXNIcon from 'resources/svg/dv_xetnghiem.svg';
import DvCDHAIcon from 'resources/svg/dv_chuandoanhinhanh.svg';

const getIcon = (type) => {
	switch (type) {
		case 10:
			return {
				icon: DvKIcon,
				name: 'Khám Bệnh',
			};
		case 20:

			return {
				icon: DvXNIcon,
				name: 'Xét nghiệm',
			};
		case 40:
			return {
				icon: DvPTIcon,
				name: 'Phẫu thuật/ Thủ thuật',
			};
		case 30:
			return {
				icon: DvCDHAIcon,
				name: 'Chuẩn đoán hình ảnh',
			};
		default:
			return {
				icon: DvKIcon,
				name: 'Khám Bệnh',
			};
	}
};

const TableView = ({ columns, header, footer, setData, rowData, sequences, group, common }) => {
	const obj = getIcon(group.type);

	return (
		<Main>
			{header && (
				<div className={'emr-table-header'}>
					{header}
				</div>
			)}

			<table>
				<thead>
				<tr>
					{columns.map(col => (
						<th key={col.key}>
							<div style={{ width: col.width }}>
								{col.title}
							</div>
						</th>
					))}
				</tr>
				</thead>

				<tbody>
					<tr className={'group-line'}>
						<td colSpan={columns.length}>
							<obj.icon /><span>{obj.name}</span>
						</td>
					</tr>
					{sequences.map(sequence => (
						<>
							<tr className={'numerical-order'}>
								<td colSpan={columns.length}>
									<span className={'td-code'}>{'Số phiếu: '}</span>
									{sequence.sequenceGroupNo || ''}
								</td>
							</tr>
							{rowData.filter(row => row.parent === sequence.sequenceGroupNo)
								.map((row, index) => (
								<tr key={row.key} className={index%2 === 0 ? 'color-row' : ''}>
									{columns.map(col => (
										<td key={col.key}>
											<div style={{ width: col.width }}>
												{col.component ? (
														<col.component
															data={row}
															value={row[col.value]}
															common={common}
															onChange={setData[`${row.key}_${col.value}`]}
															oneOf={common[col.oneOf]}
														/>
													) :
													row[col.value]
												}
											</div>
										</td>
									))}
								</tr>
							))}
						</>
					))}
				</tbody>
			</table>

			{footer && (
				<div className={'emr-table-footer'}>
					{footer}
				</div>
			)}
		</Main>
	);
};

TableView.defaultProps = {
	sequences: [],
	rowData: [],
	group: {},
};

TableView.propTypes = {
	sequences: T.arrayOf(T.shape({})),
	rowData: T.arrayOf(T.shape({})),
	setData: T.shape({}),
	group: T.shape({}),
};

export default TableView;
