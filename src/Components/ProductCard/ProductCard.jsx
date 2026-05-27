import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTranslation } from "../../context/LanguageContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t } = useTranslation();

  // ទាញយកអត្ថបទដែលបានបកប្រែរួច
  const translatedName = t(product.nameKey);
  const translatedCategory = t(product.categoryKey);
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="product-card">
      {/* IMAGE + GO TO DETAIL */}
      <Link
        to={`/product/${product.id}`}
        state={{
          id: product.id,
          title: translatedName, // ប្រើប្រាស់ឈ្មោះបកប្រែរួចសម្រាប់ទៅទំព័រ Detail
          image: product.image,
          price: product.price,
        }}
      >
        <img
          src={product.image}
          alt={translatedName}
          className="product-image"
        />
      </Link>

      {/* WISHLIST BUTTON */}
      <button
        onClick={() => toggleWishlist(product)}
        className="wishlist-button"
        title={isWishlisted ? t("removeFromWishlist") : t("addToWishlist")}
      >
        <Heart
          color={isWishlisted ? "#dc2626" : "#999"}
          fill={isWishlisted ? "#dc2626" : "none"}
          size={20}
        />
      </button>

      {/* 🟢 CATEGORY បកប្រែរួច */}
      <div className="product-category">{translatedCategory}</div>

      {/* 🟢 NAME បកប្រែរួច */}
      <div className="product-name">{translatedName}</div>

      {/* RATING */}
      <div className="product-rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < product.rating ? "star filled" : "star"}>
            ★
          </span>
        ))}
        <span className="product-rating-count">(0)</span>
      </div>

      {/* PRICE + CART BUTTON */}
      <div className="flex items-center justify-between mt-2">
        <div className="product-price">{product.price}</div>

        <button
          onClick={() => addToCart(product)}
          className="w-[40px] h-[40px] bg-[#007580] rounded-md flex items-center justify-center hover:bg-[#029fae] duration-300 cursor-pointer"
        >
          <ShoppingCart color="#fff" size={18} />
        </button>
      </div>

      {/* DISCOUNT */}
      {product.discount && (
        <span className="product-discount">{product.discount}</span>
      )}
    </div>
  );
};

export default ProductCard;
