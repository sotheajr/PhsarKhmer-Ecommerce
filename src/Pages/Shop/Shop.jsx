import React from "react";
import ShopSidebar from "../../Components/ShopSidebar/ShopSidebar";
import ProductCard from "../../Components/ProductCard/ProductCard";

import "./Shop.css";

const products = [
  {
    id: 1,
    nameKey: "shopProducts.monitor",
    categoryKey: "categories.toys",
    price: "120.00$",
    image: "/src/assets/categories/categories_1.png",
    rating: 0,
    discount: null,
  },
  {
    id: 2,
    nameKey: "shopProducts.chair",
    categoryKey: "categories.bathroom",
    price: "32.00$",
    image: "/src/assets/categories/categories_2.png",
    rating: 0,
    discount: null,
  },
  {
    id: 3,
    nameKey: "shopProducts.chair",
    categoryKey: "categories.Livingroom",
    price: "45.00$",
    image: "/src/assets/categories/categories_3.png",
    rating: 0,
    discount: null,
  },
  {
    id: 4,
    nameKey: "shopProducts.chair",
    categoryKey: "categories.Livingroom",
    price: "35.00$",
    image: "/src/assets/categories/categories_4.png",
    rating: 0,
    discount: null,
  },
  {
    id: 5,
    nameKey: "shopProducts.chair",
    categoryKey: "categories.bathroom",
    price: "70.00$",
    image: "/src/assets/features/product_1.png",
    rating: 0,
    discount: null,
  },
  {
    id: 6,
    nameKey: "shopProducts.chair",
    categoryKey: "categories.kitchen",
    price: "40.00$",
    image: "/src/assets/features/product_2.png",
    rating: 0,
    discount: null,
  },
  {
    id: 7,
    nameKey: "shopProducts.chair",
    categoryKey: "categories.Livingroom",
    price: "65.00$",
    image: "/src/assets/features/product_3.png",
    rating: 0,
    discount: null,
  },
  {
    id: 8,
    nameKey: "shopProducts.chair",
    categoryKey: "categories.kitchen",
    price: "75.00$",
    image: "/src/assets/features/product_4.png",
    rating: 0,
    discount: null,
  },
];

const Shop = () => {
  return (
    <div className="shop-container bg-white text-gray-900">
      <ShopSidebar />

      <div className="shop-products">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
