import "./Stars.css";
import { useState } from "react";

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "grey";
const DEFAULT_COLOR = "hsl(47, 90%, 60%)";

export default function Stars({
  count,
  rating,
  setRating,
  icon,
  color,
  iconSize,
  isInteractive = true, // Add a prop to control interactivity
}) {
  const handleClick = (index) => {
    if (isInteractive && setRating) {
      setRating(index + 1);
    }
  };

  let stars = Array(count || DEFAULT_COUNT).fill(icon || DEFAULT_ICON);

  return (
    <div className="starsContainer">
      {stars.map((item, index) => {
        const isActiveColor = index < rating;

        let elementColor = "";

        if (isActiveColor) {
          elementColor = color || DEFAULT_COLOR;
        } else {
          elementColor = DEFAULT_UNSELECTED_COLOR;
        }

        return (
          <div
            className="star"
            key={index}
            style={{
              fontSize: iconSize ? `${iconSize}px` : "45px",
              color: elementColor,
              filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
              cursor: isInteractive ? "pointer" : "default",
            }}
            onClick={() => handleClick(index)}
          >
            {icon ? icon : DEFAULT_ICON}
          </div>
        );
      })}
    </div>
  );
}
