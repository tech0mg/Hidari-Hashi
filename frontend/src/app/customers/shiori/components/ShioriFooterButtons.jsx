"use client";
import React,{ useState } from "react";
import SaveToPDF from "./SaveToPDF";
import PaintIcon from "../../../components/icon/icon_paint"; 
import CrownIcon from "../../../components/icon/icon_crown"; 
import SaveIcon from "../../../components/icon/icon_save"; 
import CloseIcon from "../../../components/icon/icon_close"; 
import StarIcon from "../../../components/icon/icon_star"; 
import KirokuIcon from "../../../components/icon/icon_kiroku"; 
import ColorModal from "../components/ColorModal";
import IllustrationSelector from "./IllustrationSelector";

const ShioriFooterButtons = ({ handleNavigation, onIllustrationChange }) => {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const pagesToSave = ["page1", "page2", "page3", "page4", "page5"]; // 保存対象のページID
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const toggleColorModal = () => {
    setIsColorModalOpen(!isColorModalOpen);
  };

  return (
    <>
      <div className="bg-[#EDEAE7]  w-full shadow-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          {/* いろをえらぶ */}
          <button
            onClick={toggleColorModal}
            className="flex flex-col items-center"
            aria-label="いろをえらぶ"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300"
              style={{ transition: "background-color 0.2s ease" }}
            >
              <PaintIcon size={24} />
            </div>
            <span className="text-sm mt-2 text-gray-700 hover:text-gray-900">
              いろをえらぶ
            </span>
          </button>

          {/* イラストを選ぶ */}
          <button
            onClick={toggleModal}
            className="flex flex-col items-center"
            aria-label="イラストを選ぶ"
          >
            <div className="w-12 h-12  rounded-full flex items-center justify-center">
              <CrownIcon size={24} />
            </div>
            <span className="text-sm mt-2 text-gray-700 hover:text-gray-900">
              イラストをえらぶ
            </span>
          </button>
          
          {/* 保存するボタン */}
          <SaveToPDF
            pages={pagesToSave} // PDF出力対象のページを指定
            fileName="ShioriContent.pdf" // 保存するPDFの名前
            customButton={(
              <button
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <SaveIcon size={24} />
                </div>
                <span className="text-sm mt-2">ほぞんする</span>
              </button>
            )}
          />

          {/* やめる */}
          <button
            onClick={() => handleNavigation("list-detail")}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <CloseIcon size={24} />
            </div>
            <span className="text-sm mt-2">やめる</span>
          </button>

          {/* リストに戻る */}
          <button
            onClick={() => handleNavigation("list")}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <StarIcon size={24} />
            </div>
            <span className="text-sm mt-2">リストにもどる</span>
          </button>

          {/* 記録を見る */}
          <button
            onClick={() => alert("きろくをみるボタンが押されました")}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <KirokuIcon size={24} />
            </div>
            <span className="text-sm mt-2">きろくをみる</span>
          </button>
        </div>
      </div>

      {/* モーダル */}
      {isColorModalOpen && <ColorModal onClose={toggleColorModal} />}

      {/* イラストモーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">イラストを選択</h2>
            <IllustrationSelector onIllustrationChange={onIllustrationChange} />
            <button
              className="mt-4 p-2 bg-gray-500 text-white rounded-md"
              onClick={toggleModal}
            >
              イラストをえらぶ
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShioriFooterButtons;
