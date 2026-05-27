import React, { useState } from "react";
import "./ProductInfo.css";
import { useCart } from "../../context/CartContext";

const ProductInfo = ({ product }) => {
  const [size, setSize] = useState(product.sizes[0]);

  // use cart context
  const { addToCart } = useCart();

  // handle add cart
  const handleAddToCart = () => {
    addToCart({
      ...product,
      size,
      quantity: 1,
    });

    alert("Product Added To Cart");
  };

  return (
    <div className="product-info">
      <h2>{product.name}</h2>

      <div className="product-price">
        <span className="current">${product.price}</span>

        {product.oldPrice && <span className="old">${product.oldPrice}</span>}
      </div>

      <div className="product-sizes">
        <span>Select Size:</span>

        {product.sizes.map((s) => (
          <button
            key={s}
            className={size === s ? "active" : ""}
            onClick={() => setSize(s)}
          >
            {s}
          </button>
        ))}

        <a href="#" className="size-chart">
          See Chart
        </a>
      </div>

      <div className="product-actions">
        <button className="wishlist">♡ Wishlist</button>

        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

      <div className="product-details">
        <h4>Product Details</h4>

        <p>{product.details}</p>

        <h4>Material & Care</h4>

        <ul>
          {product.material.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>

        <h4>Sold By</h4>

        <p>{product.store}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
