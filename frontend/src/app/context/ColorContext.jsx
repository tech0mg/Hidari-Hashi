// 画面の色の変更
"use client";
import React, { createContext, useState, useContext } from "react";

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [shioriColor, setShioriColor] = useState("bg-white"); // 初期色

  const changeColor = (color) => {
    setShioriColor(color); // 新しい色を設定
  };

  return (
    <ColorContext.Provider value={{ shioriColor, setColor: setShioriColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
