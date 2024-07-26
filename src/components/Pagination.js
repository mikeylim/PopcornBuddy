// components/Pagination.js
import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../styles/Pagination.module.css';

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
    />
  );
};

export default Pagination;
