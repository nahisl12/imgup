import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserImages } from "../../../Helpers/Requests";
import "../Dashboard.css";
import ImageCard from "./ImageCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ImageList = ({ user, setMessage }) => {
  const [images, setImages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { folderName } = location.state;

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const data = await getUserImages(user);

      if (data) {
        console.log(data);
        setImages(data);
      } else {
        setMessage("An error occured");
      }
    } catch (error) {
      setMessage("An error occured");
    }
  };

  return (
    <div>
      <h1>{folderName.toUpperCase()} Gallery</h1>
      <button
        className="button-blue"
        id="back-button"
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="card-container">
        {images
          .filter(
            (image) => image.folder.toLowerCase() === folderName.toLowerCase()
          )
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
    </div>
  );
};

export default ImageList;
