import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
  const [images, setImages] = useState([]);

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

      let data = await reqImages.json();

      if (data) {
        setImages(data);
        console.log(data);
      } else {
        console.log("there was an error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Welcome to your dashboard {user.username}</h1>
      <section className="card-container">
        {images.map((image, index) => {
          return (
            <ImageCard link={image.url} author={image.author} key={index} />
          );
        })}
      </section>
    </div>
  );
};

export default Dashboard;
