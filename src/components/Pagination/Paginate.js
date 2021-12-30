import React, { useState, useEffect } from "react";
import CardList from "../Cards/CardList";
import Dashboard from "../Dashboard/Dashboard";
import "./Paginate.css";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Paginate = ({ searchResults, itemsPerPage, type, user, setFolders, setMessage, getImages }) => {
  const [currentItems, setCurrentItems] = useState([]); // the data spliced for paginating is store here
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageType] = useState(type); // used to determine which page to render/paginate

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(searchResults.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(searchResults.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, searchResults]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % searchResults.length;
    setItemOffset(newOffset);
    console.log(currentItems);
  };

  if (pageType === "homepage") {
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
  } else if (pageType === "dashboard") {
    return (
      <div>
        <Dashboard
          user={user}
          folders={currentItems}
          setFolders={setFolders}
          setMessage={setMessage}
          getImages={getImages}
        />

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
  }

  return <div></div>;
};

export default Paginate;
