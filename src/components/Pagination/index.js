import React, { memo, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Main } from './styled';

const propTypes = {
  items: PropTypes.array,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
};

const Pagination = ({ items, pageSize, onChangePage, ...other }) => {
  const [currentPage, setPageItem] = useState(1);
  const [page, setPageDisplay] = useState(1);
  const [totalPages, settotalPage] = useState(0);

  useEffect(() => {
    setPage(currentPage);
  }, [items, currentPage]);

  const setpageInput = e => {
    if (e.keyCode === 13) {
      setPage(page);
    }
  };

  const handleChangePage = e => {
    setPageDisplay(e.target.value);
  };

  const setPage = currentPage => {
    const totalPages = Math.ceil(items && items.length / pageSize) || '';
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(
      parseInt(startIndex + pageSize - 1),
      items && items.length,
    );
    const pageOfItems = (items && items.length && items.slice(startIndex, endIndex + 1)) || [];
      onChangePage(pageOfItems);
      settotalPage(totalPages);
    
  };

  return (
    <Main className="pagination">
      <li>
        <span
          onClick={() => {
            if (currentPage > 1) {
              setPageItem(1);
            }
            
          }}
          className="next-all control-pagination"
        >
          <i className="fa fa-angle-double-left" aria-hidden="true"></i>
        </span>
      </li>

      <li>
        <span
          onClick={e => {
            if (currentPage > 1) {
              setPageItem(currentPage - 1);
              setPageDisplay(currentPage - 1);
            }
          }}
          className="next-page control-pagination"
        >
          <i className="fa fa-angle-left" aria-hidden="true"></i>
        </span>
      </li>
      <li className="input-page">
        <input
          className="form-control"
          value={page}
          onKeyDown={setpageInput}
          onChange={handleChangePage}
        />
        <span className="total-page">{totalPages}</span>
      </li>

      <li
        onClick={e => {
          if (currentPage < totalPages) {
            setPageItem(currentPage + 1);
            setPageDisplay(currentPage + 1);
          }
        }}
      >
        <span className="prev-page control-pagination">
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      </li>
      <li
        onClick={() => {
          if (currentPage < totalPages) {
            setPageItem(totalPages);
            setPageDisplay(totalPages);
          }
          
        }}
      >
        <span className="prev-all control-pagination">
          <i className="fa fa-angle-double-right" aria-hidden="true"></i>
        </span>
      </li>
    </Main>
  );
};

Pagination.propTypes = propTypes;
export default memo(Pagination);
