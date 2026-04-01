import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = ({ rating, onChange, size = 24, disabled = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hover || rating);
        return (
          <FaStar
            key={star}
            size={size}
            onClick={() => onChange(star)}
            onMouseEnter={() => !disabled && setHover(star)}
            onMouseLeave={() => !disabled && setHover(0)}
            style={{
              color: isActive ? " #ffc107 " : " #ddd",
              cursor: disabled ? "default" : "pointer",
              transition: "color 0.15s",
            }}
          />
        );
      })}
    </div>
  );
};

export default Rating;
