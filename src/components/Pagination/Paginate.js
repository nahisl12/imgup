import React, { useEffect } from "react";
import CardList from "../Cards/CardList";
import "./Paginate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Paginate = ({
  searchResults,
  pageTotal,
  pageLimit,
  currentPage,
  setCurrentPage,
}) => {
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage !== pageTotal) {
      setCurrentPage(currentPage + 1);
      console.log("next" + currentPage);
    }
  };

  const prevPage = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
      console.log("prev" + currentPage);
    }
  };

  const changePage = (event) => {
    const pageNum = Number(event.target.textContent);
    setCurrentPage(pageNum);
    console.log(currentPage);
  };

  // const pageNumbers = () => {
  //   let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
  //   return new Array(pageLimit).fill().map((_, index) => start + index + 1);
  // };

  const pagesList = () => {
    return new Array(pageTotal).fill();
  };

  return (
    <div>
      <CardList results={searchResults} />

      <div className="button-container">
        <button className="page-button" onClick={prevPage}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {pagesList().map((num, index) => {
          return (
            <button className="page-button" onClick={changePage} key={index}>
              {index + 1}
            </button>
          );
        })}

        <button className="page-button" onClick={nextPage}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

// {pageNumbers().map((number, index) => {
//   return (
//     <button onClick={changePage} key={index}>
//       {number}
//     </button>
//   );
// })}

export default Paginate;
