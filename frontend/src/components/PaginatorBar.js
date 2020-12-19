import React from "react";
import { Pagination } from "react-bootstrap";

const PaginatorBar = ({ placesPerPage, totalPlaces, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPlaces / placesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          onClick={() => paginate(number)}
          className="page-item">
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default PaginatorBar;
