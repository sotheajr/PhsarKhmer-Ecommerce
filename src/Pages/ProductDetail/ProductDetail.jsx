import React from "react";
import { useLocation } from "react-router-dom";
import ProductGallery from "../../Components/ProductGallery/ProductGallery";
import ProductInfo from "../../Components/ProductInfo/ProductInfo";
import SimilarProducts from "../../Components/SimilarProducts/SimilarProducts";
import ProductReviewDiscussions from "../../Components/ProductReviewDiscussions/ProductReviewDiscussions";
import "./ProductDetail.css";

const defaultProduct = {
  id: 1,
  name: "Light Gray Top for Women",
  price: 40,
  oldPrice: 50,
  sizes: ["S", "M", "L", "XL", "XXL"],
  images: [
    "/src/assets/categories/categories_1.png",
    "/src/assets/categories/categories_2.png",
    "/src/assets/categories/categories_3.png",
    "/src/assets/categories/categories_4.png",
  ],
  details: "Light Gray solid Top, has a boat neck, 3/4 sleeves",
  material: ["Cotton", "Machine-wash"],
  store: "Wind & Store, Stillwater",
  similar: [
    // ... similar products data
  ],
};

const ProductDetail = () => {
  const location = useLocation();
  const state = location.state;
  let product = defaultProduct;

  if (state && state.title && state.image) {
    product = {
      ...defaultProduct,
      name: state.title,
      price: state.price || defaultProduct.price,
      oldPrice: state.currentPrice || defaultProduct.oldPrice,
      images: [state.image],
      status: state.status,
    };
  }

  return (
    // 🟢 បន្ថែម bg-white text-gray-900 ការពារការបាត់អក្សរលើ iOS
    <div className="product-detail-container bg-white text-gray-900">
      <div className="product-detail-main">
        {/* 🟢 បន្ថែម Wrapper ឱ្យសមាសភាគទាំងពីរដើម្បីគ្រប់គ្រងទំហំលើ iOS */}
        <div className="gallery-wrapper">
          <ProductGallery images={product.images} />
        </div>
        <div className="info-wrapper">
          <ProductInfo product={product} />
        </div>
      </div>
      <SimilarProducts products={product.similar} />
      <ProductReviewDiscussions productId={product.id} />
    </div>
  );
};

export default ProductDetail;
