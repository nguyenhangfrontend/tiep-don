import React from 'react';
import T from 'prop-types';
import WrapperContent from '../WrapperContent';
import Resizeable from './Resizeable';
import Sort from './Sort';
import { Main } from './styled';

const Header = (props) => {
	const { columns, resizeable, columnProps, setCurrentProps, selectAll, allSelected } = props;
	return (
		<Main className={'t-fixed-head'}>
			<thead>
				<tr>
					{columns.map((col, index) => (
						<th key={col.key}>
							<WrapperContent width={columnProps[index].width}>
								{col.titleCom ? <col.titleCom selectAll={selectAll} allSelected={allSelected} /> : col.title || ''}
							</WrapperContent>
							{col.sortFunc && <Sort handleSort={col.sortFunc} />}
							{col.resize && (
								<Resizeable
									col={col}
									currentColProps={columnProps[index]}
									nextColProps={columnProps[index + 1]}
									resizeable={resizeable}
									setCurrentProps={setCurrentProps}
								/>
							)}
						</th>
					))}
				</tr>
			</thead>
		</Main>
	)
};

Header.defaultProps = {
	columns: [],
};

Header.propTypes = {
	resizeCol: T.func,
	columns: T.arrayOf(T.shape({}))
};

export default Header;
