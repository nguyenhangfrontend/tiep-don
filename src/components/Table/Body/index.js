import React, {useEffect, useState} from 'react';
import T from 'prop-types';
import { Main } from './styled';

const List = ({
  columns,
  rows,
	onClick,
  onChange,
  showData,
  focus
}) => {
 
  const [selectedRow, setSelectedRow] = useState(0);

  useEffect(function() {
    window.addEventListener('keydown', selectRow);
  });

  
 

  const showDetailPatient = ( patientId ) => {
    
  }

  const selectRow = e => {
    if (e.keyCode === 40) {
      const index = selectedRow === rows.length ? rows.length - 1: selectedRow + 1
      setSelectedRow(index);
      window.removeEventListener('keydown', selectRow);
    }

    if (e.keyCode === 38) {
      const index = selectedRow < 0 ? 0: selectedRow - 1
    
      setSelectedRow(index);
      window.removeEventListener('keydown', selectRow);
    }
    if (e.keyCode === 13) {
      if(showData){
        showData(rows[selectedRow].id);
      }
      
    }
    
  };
  if (rows.length < 1) {
    return null;
  }
  return (
    <Main>
      {rows.map((row, index) => (
        <tr className={
          parseInt(selectedRow) === parseInt(index)
            ? 'tr-row active-item'
            : 'tr-row'
        }>
          <td>{index + 1}</td>
          {columns.map(col => (
            <td onClick={onClick}>
              <div style={{ width: col.width ? col.width: '' }}>
                {col.component ? (
                  <col.component
                    data={row}
                    value={row[col.value]}
                    id={row.id}
                  />
                ) : (
                  row[col.key]
                )}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </Main>
  );
};

List.defaultProps = {
  type: '',
  columns: [],
  rows: [],
};

List.propTypes = {
  type: T.string,
  columns: T.arrayOf(T.shape({})),
  rows: T.arrayOf(T.shape({})),
};

export default List;
