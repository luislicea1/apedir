import React, { useEffect } from "react";
import { useState } from "react";
import "@smastrom/react-rating/style.css";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { addStars } from "../../api/starsRate";

export default function Stars(props) {
  
  async function handleChangeStars(rate) {
    console.log(rate);
    await addStars(rate, props.user, props.bussiness);
  }

  const itemStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#f59e0b",
    inactiveFillColor: "gray",
  };

  const width = props.w;

  return (
    <Rating
      style={{ maxWidth: width }}
      value={props.rating}
      onChange={(event) => {
        props.setRating((prevRating) => {
          const newRating = event;
          handleChangeStars(newRating);
          return newRating;
        });
      }}
      {...(props.readOnly ? { readOnly: true } : {})}
      itemStyles={itemStyles}
    />
  );
}

//**Para que salga las estrellas a la mitad debe de ser readOnly */
