import React, { useRef } from "react";
import "./SimilarProducts.css";
import { useCart } from "../../context/CartContext";

const SimilarProducts = ({ products = [] }) => {
  const { addToCart } = useCart();
  const listRef = useRef(null);

  if (products.length === 0) {
    products = [
      {
        id: 2,
        name: "Navy Blue Dots Basic Top",
        price: 39,
        image: "/src/assets/features/product_1.png",
      },
      {
        id: 3,
        name: "Minimal Black Top",
        price: 35,
        image: "/src/assets/features/product_2.png",
      },
      {
        id: 4,
        name: "Blue Nautical Top",
        price: 32,
        image: "/src/assets/features/product_3.png",
      },
      {
        id: 5,
        name: "Navy Blue Checked Top",
        price: 42,
        image: "/src/assets/features/product_4.png",
      },
      {
        id: 6,
        name: "Navy Blue Checked Top",
        price: 42,
        image: "/src/assets/products/product_8.png",
      },
      {
        id: 7,
        name: "Navy Blue Checked Top",
        price: 42,
        image: "/src/assets/products/product_7.png",
      },
      {
        id: 8,
        name: "Navy Blue Checked Top",
        price: 42,
        image: "/src/assets/products/product_6.png",
      },
      {
        id: 9,
        name: "Navy Blue Checked Top",
        price: 42,
        image: "/src/assets/products/product_5.png",
      },
      {
        id: 10,
        name: "Navy Blue Checked Top",
        price: 42,
        image: "/src/assets/products/product_4.png",
      },
    ];
  }

  const scroll = (direction) => {
    if (listRef.current) {
      const scrollAmount = 250;
      listRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // ✅ ADD TO CART FUNCTION
  const handleAdd = (p) => {
    addToCart({
      id: p.id,
      title: p.name,
      price: p.price,
      image: p.image,
    });
  };

  return (
    <div className="similar-products">
      <h3>Similar Products</h3>

      <div className="similar-nav">
        <button className="nav-btn left" onClick={() => scroll("left")}>
          &lt;
        </button>

        <div
          className="similar-list"
          ref={listRef}
          style={{
            overflowX: "auto",
            display: "flex",
            scrollBehavior: "smooth",
            gap: "15px",
          }}
        >
          {products.map((p) => (
            <div className="similar-card" key={p.id}>
              <img src={p.image} alt={p.name} />

              <div className="similar-name">{p.name}</div>
              <div className="similar-price">${p.price}</div>

              {/* 🔥 ADD TO CART BUTTON */}
              <button
                onClick={() => handleAdd(p)}
                style={{
                  marginTop: "10px",
                  padding: "6px 10px",
                  background: "#007580",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <button className="nav-btn right" onClick={() => scroll("right")}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default SimilarProducts;
