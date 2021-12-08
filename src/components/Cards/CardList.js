import React from "react";
import Card from "./Card";

const CardList = ({ results }) => {
  return (
    <div>
      {results.hits.map((image, index) => {
        return <Card link={image.largeImageURL} key={index} />;
      })}
    </div>
  );
};

export default CardList;
