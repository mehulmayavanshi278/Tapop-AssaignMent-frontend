import React, { useState } from "react";

const images = [
  "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  "https://thumbs.dreamstime.com/z/chameleon-sunflower-9927890.jpg",
  "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
  "https://media.istockphoto.com/id/813581282/photo/face-detection-and-recognition-of-man-computer-vision-and-machine-learning-concept.jpg?s=612x612&w=0&k=20&c=NoRoSp7n38vNPduP3KtvWWjwd0H7QMXQcT0hCSbVvwo=",
  "https://thumbs.dreamstime.com/z/chameleon-sunflower-9927890.jpg",
];

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseMove = (event) => {
    const { movementX, movementY } = event;
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - movementX / 50 + movementY / 50;
      return Math.min(Math.max(newIndex, 0), images.length - 1);
    });
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      onMouseMove={handleMouseMove}
    >
      <div className="overflow-hidden w-1/3 h-1/3">
        <img
          className=" w-full h-full object-cover overflow-hidden transition-transform duration-200 transform hover:scale-110"
          src={images[Math.floor(currentIndex)]}
          alt="Gallery"
        />
      </div>
    </div>
  );
}

export default Gallery;
