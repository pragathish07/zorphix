import { useState } from "react";

const LoginCarousel = ({ images }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="login-carousel">
      <div
        className="overflow-scroll"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className={`scrolling-images ${isPaused ? "paused" : ""}`}>
          {images.concat(images).map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Image ${index + 1}`}
              className={`image ${image.className}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginCarousel;
