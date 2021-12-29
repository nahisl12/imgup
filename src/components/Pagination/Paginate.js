import React, { useState, useEffect } from "react";
import CardList from "../Cards/CardList";
import "./Paginate.css";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Paginate = ({ searchResults, itemsPerPage }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(searchResults.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(searchResults.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % searchResults.length;
    setItemOffset(newOffset);
  };
  return (
    <div>
      <CardList results={currentItems} />

      <div className="button-container">
        <ReactPaginate
          className="paginate"
          breakLabel="..."
          nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default Paginate;
