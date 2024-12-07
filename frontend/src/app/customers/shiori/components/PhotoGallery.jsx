import React, { useState } from "react";

const PhotoGallery = ({ photos, apiUrl }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPhoto, setModalPhoto] = useState(null);
  
    const openModal = (photo) => {
      setModalPhoto(photo);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setModalPhoto(null);
      setIsModalOpen(false);
    };
  
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-center mb-4">アップロード済みの写真</h2>
        <div className="grid grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={`${apiUrl}${photo}`}
              alt={`Uploaded ${index + 1}`}
              className="w-32 h-32 object-cover rounded-lg shadow-md cursor-pointer"
              onClick={() => openModal(`${apiUrl}${photo}`)}
            />
          ))}
        </div>
  
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 shadow-lg max-w-3xl">
              <img
                src={modalPhoto}
                alt="Modal"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mx-auto block"
              >
                閉じる
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default PhotoGallery;
  