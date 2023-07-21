import { useState } from "react";
import Star from "./Star";

const StarRating = ({ maxRating = 5,color,onSetRating }) => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const container = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  };

  const stars = {
    display: "flex",
    cursor: "pointer",
  };

  const ratingStyle = {
    lineHeight: "1",
    margin: "0",
  };

  const handleRating = (i) => {
    setRating(i + 1);
    onSetRating(i + 1)
  };

  const handleMouseHover = (i) => {
    setTempRating(i + 1);
  };

  const handleLeave = () => {
    setTempRating(0);
  };

  return (
    <div style={container}>
      <div style={stars}>
        {Array.from({ length: maxRating }, (_, i) => {
          return (
            <Star
              key={i}
              onHandleRating={() => handleRating(i)}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              onHandleLeave={handleLeave}
              onHandleMouseHover={() => handleMouseHover(i)}
              color={color}
            />
          );
        })}
      </div>
      <p style={ratingStyle}>{tempRating || rating || ""}</p>
    </div>
  );
};

export default StarRating;
