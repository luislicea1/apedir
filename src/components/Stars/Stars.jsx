import React from "react";
import "@smastrom/react-rating/style.css";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { addStars } from "../../api/starsRate";

export default function Stars(props) {
  const handleChangeStars = async (rate) => {
    console.log(rate);
    try {
      await addStars(rate, props.user, props.bussiness);
    } catch (error) {
      console.error("Error adding stars:", error);
    }
  };

  const itemStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#f59e0b",
    inactiveFillColor: "gray",
  };

  const width = props.w;

  return (
    <Rating
      style={{ maxWidth: width }}
      value={props.rate}
      onChange={(event) => {
        const newRating = event;
        handleChangeStars(newRating).then(() => {
          props.setRate(newRating);
        });
      }}
      {...(props.readOnly ? { readOnly: true } : {})}
      itemStyles={itemStyles}
    />
  );
}
