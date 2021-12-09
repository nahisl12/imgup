import React from "react";
import CardList from "../Cards/CardList";

const Paginate = ({
  searchResults,
  pageTotal,
  pageLimit,
  currentPage,
  setCurrentPage,
}) => {
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

      {pagesList().map((num, index) => {
        return (
          <button onClick={changePage} key={index}>
            {index + 1}
          </button>
        );
      })}

      <div>
        <button onClick={prevPage}>{"<"}</button>

        <button onClick={nextPage}>{">"}</button>
      </div>
    </div>
  );
};

// {Array.from(Array(25), (element, index) => {
//   return (
//     <button onClick={changePage} key={index}>
//       {index + 1}
//     </button>
//   );
// })}

// {pageNumbers().map((number, index) => {
//   return (
//     <button onClick={changePage} key={index}>
//       {number}
//     </button>
//   );
// })}

export default Paginate;
