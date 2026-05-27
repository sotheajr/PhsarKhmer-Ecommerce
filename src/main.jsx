// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import MainLayout from './MainLayout/MainLayout'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <MainLayout/>
//   </StrictMode>,
// )
// src/main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import MainLayout from "./MainLayout/MainLayout";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import { WishlistProvider } from "./context/WishlistContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider>
        <LanguageProvider>
          <MainLayout />
        </LanguageProvider>
      </WishlistProvider>
    </CartProvider>
  </StrictMode>,
);
