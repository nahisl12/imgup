import React from "react";
import "./CardStyle.css";
import Card from "./Card";

const CardList = ({ results }) => {
  return (
    <div className="card-container">
      {results.map((image, index) => {
        return <Card link={image.url} user={image.author} imageId={image._id} key={index} />;
      })}
    </div>
  );
};

export default CardList;
