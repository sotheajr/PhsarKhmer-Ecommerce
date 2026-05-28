import { useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTranslation } from "../../context/LanguageContext";
import productsImg1 from "../../assets/products/product_1.png";
import productsImg2 from "../../assets/products/product_2.png";
import productsImg3 from "../../assets/products/product_3.png";
import productsImg4 from "../../assets/products/product_4.png";
import productsImg5 from "../../assets/products/product_5.png";
import productsImg6 from "../../assets/products/product_6.png";
import productsImg7 from "../../assets/products/product_7.png";
import productsImg8 from "../../assets/products/product_8.png";
import productsImgI from "../../assets/products/product_1.png";
import productsImgII from "../../assets/products/product_2.png";
import productsImgIII from "../../assets/products/product_3.png";
import productsImgB from "../../assets/products/product_4.png";
const Product = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t } = useTranslation();

  const [active, setActive] = useState({
    id: 0,
    product: "all",
  });

  const productTitle = [
    { id: 0, titleKey: "allCategories", product: "all" },
    { id: 1, titleKey: "features.statusNew", product: "newest" },
    { id: 2, titleKey: "productPage.popularProducts", product: "trending" },
    { id: 3, titleKey: "productPage.bestSeller", product: "best_seller" },
  ];

  const products = [
    {
      title: "library stool",
      statusKey: "features.statusNew",
      price: "$250",
      image: productsImgI,
      currentPrice: "$200",
      product: "newest",
    },
    {
      title: "library stool Chair",
      statusKey: "features.statusSales",
      price: "$250",
      image: productsImgII,
      product: "newest",
    },
    {
      title: "library stool",
      statusKey: "features.statusNew",
      price: "$250",
      image: productsImgIII,
      currentPrice: "$200",
      product: "newest",
    },
    {
      title: "library stool Chair",
      statusKey: "features.statusSales",
      price: "$250",
      image: productsImgB,
      product: "newest",
    },
    {
      title: "library stool Chair",
      statusKey: "features.statusSales",
      price: "$250",
      image: productsImg1,
      product: "trending",
    },
    {
      title: "library stool",
      statusKey: "features.statusNew",
      price: "$250",
      image: productsImg6,
      currentPrice: "$200",
      product: "trending",
    },
    {
      title: "library stool Chair",
      statusKey: "features.statusSales",
      price: "$250",
      image: productsImg7,
      product: "trending",
    },
    {
      title: "library stool Chair",
      statusKey: "features.statusSales",
      price: "$250",
      image: "/assets/products/product_4.png",
      product: "trending",
    },
    {
      title: "library stool",
      statusKey: "features.statusNew",
      price: "$250",
      image: productsImg3,
      currentPrice: "$200",
      product: "best_seller",
    },
    {
      title: "library stool Chair",
      statusKey: "features.statusSales",
      price: "$250",
      image: productsImg4,
      product: "best_seller",
    },
    {
      title: "library stool Chair",
      statusKey: "features.statusSales",
      price: "$250",
      image: productsImg2,
      product: "best_seller",
    },
    {
      title: "library stool Chair",
      statusKey: "features.statusSales",
      price: "$250",
      image: productsImg5,
      product: "best_seller",
    },
  ];

  const productFilter =
    active?.product === "all"
      ? products
      : products.filter((product) => product.product === active?.product);

  return (
    // 🚀 បន្ថែម px-4 សងខាងដើម្បីកុំឱ្យជាប់គែមអេក្រង់ពេក
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 my-6">
      <div className="flex flex-col items-center justify-center">
        <SectionTitle
          title={t("shop") || "Our Product"}
          textAlign={"center"}
          mb={"mb-5"}
        />

        {/* 🚀 ប៊ូតុង Tabs: បន្ថែម overflow-x-auto ឱ្យវាអាចអូសឆ្វេងស្តាំបានលើ Mobile មិនឱ្យធ្លាក់ជួរ */}
        <div className="w-full flex items-center justify-start md:justify-center gap-4 md:gap-6 mb-8 overflow-x-auto no-scrollbar pb-2 whitespace-nowrap">
          {productTitle?.map((title, indx) => (
            <button
              key={title?.id}
              onClick={() =>
                setActive({
                  id: title?.id,
                  product: title?.product,
                })
              }
              className={`text-sm md:text-base font-bold uppercase font-inter cursor-pointer transition-colors px-2 py-1 ${
                active?.id === indx
                  ? "text-[#272343] border-b-2 border-[#007580]"
                  : "text-[#9a9caa]"
              }`}
            >
              {t(title.titleKey) || title.titleFallback}
            </button>
          ))}
        </div>
      </div>

      {/* 🚀 ដំណោះស្រាយសំខាន់៖ 
          - លើ Mobile: ប្រើ `flex overflow-x-auto` ដើម្បីឱ្យអូសឆ្វេងស្តាំបាន (Horizontal Scroll)
          - លើ Desktop (mdឡើងទៅ): ប្តូរទៅជា `grid grid-cols-3 lg:grid-cols-4` វិញដោយស្វ័យប្រវត្ត
      */}
      <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 items-stretch gap-4 md:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar">
        {productFilter?.map((product, index) => {
          const stableId = product.id || `product-${index}`;
          return (
            // 🚀 កំណត់ min-w-[180px] សម្រាប់ Mobile ដើម្បីឱ្យវាចេញមួយជួរមាន ២ Cards ធំល្មមមើលច្បាស់
            <div
              key={index}
              className="min-w-[185px] sm:min-w-[240px] md:min-w-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-3.5 flex flex-col justify-between snap-start transition-all hover:shadow-md"
            >
              {/* IMAGE */}
              <div className="w-full h-[150px] sm:h-[180px] md:h-[240px] bg-[#f8f9fa] rounded-xl flex items-center justify-center relative overflow-hidden">
                <Link
                  to={`/product/${stableId}`}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    className="w-full h-full object-contain p-2 transition-transform duration-300 hover:scale-105"
                    src={product?.image}
                    alt={product?.title}
                  />
                </Link>
                {product?.statusKey && (
                  <div className="absolute top-2 left-2 bg-[#007580] text-white px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium">
                    {t(product.statusKey)}
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="mt-3 flex flex-col flex-grow justify-between">
                <div>
                  {/* កំណត់ line-clamp-1 ការពារកុំឱ្យវែងធ្លាក់ជួរខូចរាង Card */}
                  <h4 className="text-xs md:text-base text-[#272343] font-semibold font-inter capitalize line-clamp-1 md:line-clamp-2 leading-snug">
                    {product?.title}
                  </h4>

                  {/* បង្ហាញតម្លៃឱ្យនៅជួរក្រោមចំណងជើង */}
                  <p className="text-sm md:text-lg flex items-center gap-2 text-[#007580] font-bold mt-1.5 font-inter">
                    {product?.price}
                    {product?.currentPrice && (
                      <span className="text-xs md:text-sm text-[#9a9caa] font-normal line-through">
                        {product?.currentPrice}
                      </span>
                    )}
                  </p>
                </div>

                {/* 🚀 ប៊ូតុងសកម្មភាព៖ រៀបចំឱ្យមានរបៀបរៀបរយស្អាតដូចរូបភាពទីមួយ */}
                <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-gray-50">
                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist({ ...product, id: stableId })}
                    className="h-8 w-8 md:h-11 md:w-11 rounded-lg flex items-center justify-center border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
                    title={
                      isInWishlist(stableId)
                        ? t("removeFromWishlist")
                        : t("addToWishlist")
                    }
                  >
                    <Heart
                      color={isInWishlist(stableId) ? "#dc2626" : "#666"}
                      fill={isInWishlist(stableId) ? "#dc2626" : "none"}
                      size={16}
                    />
                  </button>

                  {/* Add To Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-[#007580] hover:bg-[#005f68] h-8 w-8 md:h-11 md:w-11 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ShoppingCart
                      size="1rem"
                      className="text-white md:w-5 md:h-5"
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
