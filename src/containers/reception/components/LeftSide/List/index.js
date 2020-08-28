import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import ArrowRightIcon from 'resources/svg/arrow-right.svg';
import { Main, Empty } from './styled';

const List = ({ columns, rows, selectRow, rowSelected, type }) => {
	if (rows.length < 1) {
		return <Empty>{'Không có người bệnh'}</Empty>
	}

	return (
		<Main>
			{rows.map(row => (
				<Link key={row.key} to={type === 'active' ? `/admin/tiep-don/${row.key}` : '/admin/tiep-don'} >
					<div
						onClick={selectRow(row)}
						className={`${rowSelected.key === row.key ? 'row-active' : ''} row-item`}
					>
						<ArrowRightIcon className={'selected-icon'} />
						{columns.map(col => (
							<div key={col.key} title={col.isTitle ? row[col.key]:''} className={`${col.className || ''} col-item`}>
								{row[col.key]}
							</div>
						))}
					</div>
				</Link>
			))}

		</Main>
	);
};

List.defaultProps = {
	type: '',
	columns: [],
	rows: []
};

List.propTypes = {
	type: T.string,
	columns: T.arrayOf(T.shape({})),
	rows: T.arrayOf(T.shape({})),
};

export default List;
