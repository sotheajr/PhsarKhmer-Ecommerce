import React from "react";
import "./ShopSidebar.css";
import { useTranslation } from "../../context/LanguageContext";

const ShopSidebar = () => {
  const { t } = useTranslation();

  // Array ពណ៌ដែលមាន Key សម្រាប់បកប្រែ
  const colors = [
    { id: "Blue", labelKey: "shopSidebar.blue" },
    { id: "Gigas", labelKey: "shopSidebar.gigas" },
    { id: "Gray", labelKey: "shopSidebar.gray" },
    { id: "Green", labelKey: "shopSidebar.green" },
    { id: "Horizon", labelKey: "shopSidebar.horizon" },
    { id: "Red", labelKey: "shopSidebar.red" },
    { id: "Wafer", labelKey: "shopSidebar.wafer" },
    { id: "Yellow", labelKey: "shopSidebar.yellow" },
  ];

  return (
    <aside className="shop-sidebar">
      {/* ផ្នែកចោះតម្លៃ */}
      <div className="sidebar-section">
        <h4>{t("shopSidebar.priceRange")}</h4>
        <input type="range" min="0" max="1000" />
        <button className="reset-btn">{t("shopSidebar.reset")}</button>
      </div>

      {/* ផ្នែកកម្រិតផ្កាយ */}
      <div className="sidebar-section">
        <h4>{t("shopSidebar.rating")}</h4>
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="rating-row">
            {Array.from({ length: star }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        ))}
      </div>

      {/* ផ្នែកពណ៌ផលិតផល */}
      <div className="sidebar-section">
        <h4>{t("shopSidebar.colors")}</h4>
        {colors.map((color) => (
          <div key={color.id}>
            <input type="checkbox" id={color.id} />
            <label htmlFor={color.id}>{t(color.labelKey)}</label>
          </div>
        ))}
      </div>

      {/* ផ្នែកប្រភេទផលិតផល */}
      <div className="sidebar-section">
        <h4>{t("shopSidebar.categories")}</h4>
        <div>
          <input type="checkbox" id="clothing" />
          <label htmlFor="clothing">{t("shopSidebar.clothing")}</label>
        </div>
      </div>
    </aside>
  );
};

export default ShopSidebar;
