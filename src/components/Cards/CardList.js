import React from "react";
import "./CardStyle.css";
import Card from "./Card";

const CardList = ({ results }) => {
  return (
    <div className="card-container">
      {results.hits.map((image, index) => {
        return <Card link={image.webformatURL} key={index} />;
      })}
    </div>
  );
};

export default CardList;