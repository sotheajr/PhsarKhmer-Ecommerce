import React from "react";
import { Link } from "react-router-dom";
import Banner from "../../Components/Banner/Banner";
import Features from "../../Components/Features/Features";
import "./Product.css";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Heart } from "lucide-react";

import product1 from "../../assets/features/product_1.png";
import product2 from "../../assets/features/product_2.png";
import product3 from "../../assets/features/product_3.png";
import product4 from "../../assets/features/product_4.png";

const popularProducts = [
  {
    id: 1,
    title: "Modern Wooden Chair",
    category: "Chair",
    price: 120,
    image: product1,
  },
  {
    id: 2,
    title: "Comfort Sofa",
    category: "Sofa",
    price: 250,
    image: product2,
  },
  {
    id: 3,
    title: "Minimal Lamp",
    category: "Lighting",
    price: 80,
    image: product3,
  },
  {
    id: 4,
    title: "Classic Table",
    category: "Table",
    price: 190,
    image: product4,
  },
];

const Product = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div className="product-page">
      {/* Banner */}
      <div className="banner-section">
        <Banner />
      </div>

      {/* Features */}
      <Features />

      {/* Popular Products */}
      {/* 🚀 ដំណោះស្រាយ៖ ដក container ចេញលើ Mobile ដើម្បីឱ្យវាពង្រីកធំពេញអេក្រង់ ហើយប្រើ px-4 សម្រាប់គម្លាតសងខាងសមល្មម */}
      <section className="popular-section w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="section-header text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#272343]">
            Popular Products
          </h2>
          <p className="text-sm text-gray-500">
            Explore our most popular furniture collection
          </p>
        </div>

        {/* 🚀 ប្តូរ gap មកត្រឹម gap-3.5 ដើម្បីកុំឱ្យចន្លោះកណ្តាលធំពេក រុញ Card ឱ្យរីកធំទៅសងខាង */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-6">
          {popularProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-3.5 flex flex-col justify-between min-h-[320px] md:min-h-[auto]"
            >
              <Link to={`/product/${item.id}`}>
                {/* 🚀 រូបភាពពង្រីកពេញទទឹង Card (w-full) និងកំណត់កម្ពស់សមស្រប */}
                <div className="w-full h-[150px] sm:h-[180px] md:h-[220px] flex items-center justify-center bg-[#f8f9fa] rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </Link>

              {/* ផ្នែកព័ត៌មានខាងក្រោមរូបភាព */}
              <div className="mt-3 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-medium">
                    {item.category}
                  </span>
                  <h3 className="text-sm md:text-base font-semibold text-[#272343] line-clamp-2 mt-0.5 leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* ផ្នែកតម្លៃ និង ប៊ូតុង */}
                <div className="flex items-center justify-between mt-4 pt-2.5 border-t border-gray-100">
                  <h4 className="text-sm md:text-lg font-bold text-gray-900">
                    ${item.price}
                  </h4>

                  <div className="flex items-center gap-2">
                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition"
                    >
                      <Heart
                        size={18}
                        color={isInWishlist(item.id) ? "#dc2626" : "#666"}
                        fill={isInWishlist(item.id) ? "#dc2626" : "none"}
                      />
                    </button>

                    {/* Add to Cart */}
                    <button
                      onClick={() => addToCart(item)}
                      className="text-xs md:text-sm bg-[#029fae] hover:bg-[#028490] text-white px-3 py-1.5 rounded-md font-medium transition shadow-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sale Banner */}
      <section className="sale-banner bg-[#f0f2f3] py-10 text-center mt-10">
        <div className="sale-content">
          <h1 className="text-xl md:text-3xl font-bold mb-3">
            Best Furniture Collection 2025
          </h1>

          <p className="text-sm md:text-base text-gray-600 mb-4">
            Discover modern and elegant furniture for your dream home.
          </p>

          <button className="bg-[#029fae] text-white px-5 py-2 rounded">
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Product;
