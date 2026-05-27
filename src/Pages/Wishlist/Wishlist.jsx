import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useTranslation } from "../../context/LanguageContext";
import { useCart } from "../../context/CartContext";
import { Trash2, Eye } from "lucide-react";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { t, language } = useTranslation();
  const [quantities, setQuantities] = useState({});

  const translatedName = (product) => {
    if (
      product.name &&
      product.name.trim() &&
      !product.name.includes("shop.")
    ) {
      return product.name;
    }
    if (product.title && product.title.trim()) {
      return product.title;
    }
    if (product.nameKey) {
      const translated = t(product.nameKey);
      if (translated !== product.nameKey) {
        return translated;
      }
    }
    return "Unnamed Product";
  };

  const translatedCategory = (product) => {
    if (
      product.category &&
      product.category.trim() &&
      !product.category.includes("categories.")
    ) {
      return product.category;
    }
    if (product.categoryKey) {
      const translated = t(product.categoryKey);
      if (translated !== product.categoryKey) {
        return translated;
      }
    }
    return "Uncategorized";
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, parseInt(value) || 1),
    }));
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    setQuantities((prev) => ({
      ...prev,
      [product.id]: 1,
    }));
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header-section">
          <h1 className="wishlist-title">
            <span className="heart-icon">♡</span>{" "}
            {t("wishlist") || t("favorites")}
          </h1>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <p>
              {language === "en"
                ? "Your wishlist is empty"
                : "បញ្ជីប្រាថ្នារបស់អ្នកគឺទទេ"}
            </p>
            <Link to="/shop" className="btn-continue-shopping">
              {t("shop")}
            </Link>
          </div>
        ) : (
          <div className="wishlist-table-wrapper">
            <table className="wishlist-table">
              <thead>
                <tr>
                  <th className="col-checkbox">
                    <input type="checkbox" />
                  </th>
                  <th className="col-product">{t("product") || "Product"}</th>
                  <th className="col-quantity">{t("qty") || "Quantity"}</th>
                  <th className="col-price">{t("price") || "Price"}</th>
                  <th className="col-stock">Stock Status</th>
                  <th className="col-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item) => (
                  <tr key={item.id} className="wishlist-row">
                    <td className="col-checkbox">
                      <input type="checkbox" />
                    </td>
                    <td className="col-product">
                      <div className="product-cell">
                        <img
                          src={item.image}
                          alt={translatedName(item)}
                          className="product-image"
                        />
                        <div className="product-details">
                          <h4 className="product-name">
                            {translatedName(item)}
                          </h4>
                          <p className="product-sku">
                            SKU: {item.sku || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="col-quantity">
                      <div className="quantity-selector">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              (quantities[item.id] || 1) - 1,
                            )
                          }
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={quantities[item.id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                          className="qty-input"
                        />
                        <button
                          className="qty-btn"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              (quantities[item.id] || 1) + 1,
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="col-price">
                      <div className="price-cell">
                        {item.originalPrice && (
                          <span className="original-price">
                            {item.originalPrice}
                          </span>
                        )}
                        <span className="final-price">{item.price}</span>
                      </div>
                    </td>
                    <td className="col-stock">
                      <div className="stock-status">
                        <span className="stock-check">✓</span>
                        <span className="stock-text">
                          {item.stock || 188} in stock
                        </span>
                      </div>
                    </td>
                    <td className="col-action">
                      <div className="action-buttons">
                        <Link
                          to={`/product/${item.id}`}
                          className="btn-view"
                          title={language === "en" ? "View" : "មើល"}
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="btn-add-to-cart"
                          title={t("addToCart")}
                        >
                          Add To Cart
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="btn-delete"
                          title={t("removeFromWishlist")}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="wishlist-footer">
              <p className="item-count">
                {language === "en"
                  ? `${wishlistItems.length} item${wishlistItems.length > 1 ? "s" : ""} in wishlist`
                  : `${wishlistItems.length} ទំនិញនៅក្នុងបញ្ជីប្រាថ្នា`}
              </p>
              <Link to="/shop" className="btn-continue-shopping">
                {t("continueShopping") ||
                  (language === "en" ? "Continue Shopping" : "បន្តទិញទំនិញ")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
