import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Dashboard.css";
import ImageCard from "./ImageCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ImageList = ({ user }) => {
  const [images, setImages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { folderName } = location.state;

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const reqImages = await fetch(
        "http://localhost:3001/api/image/userImages",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${user.accessToken}`,
          },
        }
      );

      const data = await reqImages.json();

      if (data) {
        console.log(data);
        setImages(data);
      } else {
        console.log("there was an error");
      }
    } catch (error) {
      console.log(error);
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
