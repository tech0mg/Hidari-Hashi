"use client";
import React, { useEffect, useState } from "react";

const ImageGrid = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/images")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setImages(data.images))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

 return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
      <div className="grid grid-cols-3 gap-4">
        {images.map((src, index) => (
          <div key={index} className="relative group">
            <img
              src={`http://127.0.0.1:5000${src}`}
              alt={`Image ${index + 1}`}
              className="rounded-lg shadow-lg transition-transform transform hover:scale-105"
            />
            <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
              <button className="text-pink-500 hover:text-pink-700">♥</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;