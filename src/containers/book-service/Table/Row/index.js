import React from 'react';
import WrapperContent from 'containers/book-service/Table/WrapperContent';
import { getStatusClass } from '../utils';

const Row = ({ selected, row, name, index, columns, indexFocus, actions, onDoubleClickRow, columnProps }) => (
	<tr
		id={`${name}_${index}`}
		key={row.key}
		className={getStatusClass(index, indexFocus, selected, row.key)}
		onDoubleClick={actions.edit(row.key, false, 'service')}
	>
		{columns.map((col, colI) => (
			<td key={col.key} colSpan={row.colSpan} rowSpan={col.rowSpan}>
				<WrapperContent width={columnProps[colI].width}>
					{col.component ?
						<col.component
							{...col}
							actions={actions}
							selected={selected}
							row={row}
							index={index}
							data={row[col.value]}
						/>
						: (row[col.value] || '')}
				</WrapperContent>
			</td>
		))}
	</tr>
);

export default Row;
