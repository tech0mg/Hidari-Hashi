// components/ImageSwiper.jsx
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const ImageSwiper = () => {
  const images = [
    'http://127.0.0.1:8080/static/images/image1.jpg',
    'http://127.0.0.1:8080/static/images/image2.jpg',
    'http://127.0.0.1:8080/static/images/image3.jpg',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  // スワイプ操作の設定
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
  });

  // 次の画像へ
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 前の画像へ
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div {...handlers} className="relative w-full max-w-md mx-auto">
      {/* 画像の表示 */}
      <div className="overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-auto"
        />
      </div>

      {/* インジケーター */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>

      {/* ボタン操作 */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between w-full px-4">
        {/* 前へボタン */}
        <button
          onClick={handlePrev}
          className="bg-gray-800 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-600"
        >
          前へ
        </button>

        {/* 次へボタン */}
        <button
          onClick={handleNext}
          className="bg-gray-800 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-600"
        >
          次へ
        </button>
      </div>
    </div>
  );
};

export default ImageSwiper;