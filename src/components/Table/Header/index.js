import React, { memo } from 'react';
import { Main } from './styled';
const Header = ({ columns }) => {
  if (!columns) return null;
  return (
    <Main>
      <tr>
				<th>STT</th>
        {columns.map(col => (
          <th key={col.key}>{col.title}</th>
        ))}
      </tr>
    </Main>
  );
};
export default memo(Header);
