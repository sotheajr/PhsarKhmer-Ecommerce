import React, { useState } from "react";
import "./ProductGallery.css";

const ProductGallery = ({ images }) => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="product-gallery">
      <div className="main-image">
        <img src={images[selected]} alt="Product" />
      </div>
      <div className="thumbnails">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="thumb"
            className={selected === idx ? "active" : ""}
            onClick={() => setSelected(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
