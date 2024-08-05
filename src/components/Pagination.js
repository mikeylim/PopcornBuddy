// components/Pagination.js
import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../styles/Pagination.module.css';

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-8">
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
