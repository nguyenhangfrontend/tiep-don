import React from 'react';
import T from 'prop-types';
import { Main } from './styled';
import Row from '../Row';

const Header = (props) => {
	const { rows,  CustomRow, ...other } = props;

	return (
		<Main>
			<tbody>
				{rows.map((row,index)  => CustomRow ? (
						<CustomRow
							key={row.key}
							index={index}
							row={row}
							{...other}
						/>
					) : (
						<Row
							key={row.key}
							row={row}
							index={index}
							{...other}
						/>
				))}
			</tbody>
		</Main>
	)
};

Header.defaultProps = {
	columns: [],
	rows: [],
	selected: [],
	name: '',
	handleChangeSelected: () => {}
};

Header.propTypes = {
	columns: T.arrayOf(T.shape({})),
	rows: T.arrayOf(T.shape({})),
	selected: T.array,
	name: T.string,
	handleChangeSelected: T.func,
	CustomRow: T.oneOfType([T.func, T.object])
};

export default Header;
