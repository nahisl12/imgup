import "../Dashboard.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserImages } from "../../../Helpers/Requests";

import ImageCard from "./ImageCard";
import ReactPaginate from "react-paginate";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ImageList = ({ user, setMessage, itemsPerPage }) => {
  const [images, setImages] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const { folderName } = location.state;

  useEffect(() => {
    getImages();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(images.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(images.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, images]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % images.length;
    setItemOffset(newOffset);
  };

  const getImages = async () => {
    try {
      const data = await getUserImages(user);

      if (data) {
        const imgData = data.reverse();
        setImages(imgData);
      } else {
        setMessage("An error occured");
      }
    } catch (error) {
      setMessage("An error occured");
    }
  };

  return (
    <div>
      <div className="dashboard-text">
        <h2>{folderName.toUpperCase()} Gallery</h2>
      </div>
      <button className="button-blue" id="back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div className="card-container">
        {currentItems
          .filter((image) => image.folder.toLowerCase() === folderName.toLowerCase())
          .map((image, index) => {
            return (
              <ImageCard
                link={image.url}
                author={image.author}
                key={index}
                imageId={image._id}
                imageStatus={image.status}
                imageFolder={image.folder}
              />
            );
          })}
      </div>

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

export default ImageList;
