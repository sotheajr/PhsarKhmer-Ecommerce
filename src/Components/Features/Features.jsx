import SectionTitle from "../SectionTitle/SectionTitle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Features.module.css";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTranslation } from "../../context/LanguageContext";

const Features = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t } = useTranslation();

  const features = [
    {
      id: 1,
      title: "library stool",
      statusKey: "features.statusNew",
      price: 250,
      image: "/src/assets/features/product_1.png",
      currentPrice: 200,
    },
    {
      id: 2,
      title: "library stool Chair",
      statusKey: "features.statusSales",
      price: 250,
      image: "/src/assets/features/product_2.png",
    },
    {
      id: 3,
      title: "library stool Chair",
      price: 250,
      image: "/src/assets/features/product_3.png",
    },
    {
      id: 4,
      title: "library stool Chair",
      statusKey: "features.statusNew",
      price: 250,
      image: "/src/assets/features/product_4.png",
      currentPrice: 200,
    },
  ];

  // 🚀 កែសម្រួល settings ត្រង់នេះដើម្បីឱ្យ Responsive ចេញ ២ Items លើ Mobile យ៉ាងស្រស់ស្អាត
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // អេក្រង់ធំ (Desktop) បង្ហាញ ៤
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // អេក្រង់ Tablet បង្ហាញ ៣
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // អេក្រង់ Mobile បង្ហាញ ២ ស្អាតពេញលេញ
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false, // បិទព្រួញលើ Mobile ដើម្បីកុំឱ្យចង្អៀតកៀន
        },
      },
    ],
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const [priceAnim, setPriceAnim] = useState(false);

  const handleImageClick = (idx) => {
    setActiveIndex(idx);
    setPriceAnim(true);
    setTimeout(() => setPriceAnim(false), 350);
  };

  return (
    // 🚀 ប្រើ w-full និង px-4 ដើម្បីឱ្យរីកធំទៅកៀកគែមសងខាង មិនសល់ Space ទំនេរច្រើនពេក
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
      <SectionTitle title={t("features.title")} mb="mb-6 md:mb-11" />

      <Slider {...settings} className="-mx-2">
        {features.map((feature, index) => (
          <div key={feature.id} className="p-2 md:p-3">
            {/* 🚀 រៀបចំ Card ឱ្យមាន Background ពណ៌ស និងស្រមោលស្អាត (Clean Card UI) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex flex-col justify-between h-full min-h-[300px] md:min-h-[380px]">
              {/* IMAGE */}
              <div className="w-full h-[140px] sm:h-[180px] md:h-[220px] flex items-center justify-center bg-[#f8f9fa] rounded-xl overflow-hidden relative">
                <Link to={`/product/${feature.id}`} className="w-full h-full">
                  <img
                    onClick={() => handleImageClick(index)}
                    className={`w-full h-full object-contain p-2 transition-transform duration-300 ${
                      activeIndex === index ? "scale-105" : ""
                    }`}
                    src={feature.image}
                    alt={feature.title}
                  />
                </Link>

                {feature.statusKey && (
                  <div className="absolute top-2 left-2 bg-[#007580] text-white px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium">
                    {t(feature.statusKey)}
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="mt-3 flex flex-col flex-grow justify-between">
                <div>
                  <h4 className="text-xs md:text-base text-[#272343] capitalize font-inter font-semibold line-clamp-1 md:line-clamp-2">
                    {feature.title}
                  </h4>

                  {/* បង្ហាញតម្លៃនៅខាងក្រោមចំណងជើង */}
                  <p className="text-sm md:text-lg flex items-center gap-2 text-[#007580] font-bold mt-1">
                    <span
                      className={`${styles.priceChange} ${
                        priceAnim && activeIndex === index
                          ? styles.animated
                          : ""
                      }`}
                    >
                      ${feature.price}
                    </span>
                    {feature.currentPrice && (
                      <span className="text-xs md:text-sm text-[#9a9caa] line-through font-normal">
                        ${feature.currentPrice}
                      </span>
                    )}
                  </p>
                </div>

                {/* 🚀 ប៊ូតុងសកម្មភាព (រុញមកនៅជួរខាងក្រោមបង្អស់ស្មើគ្នា) */}
                <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-gray-50">
                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(feature)}
                    className="h-8 w-8 md:h-11 md:w-11 rounded-lg flex items-center justify-center border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
                    title={
                      isInWishlist(feature.id)
                        ? t("removeFromWishlist")
                        : t("addToWishlist")
                    }
                  >
                    <Heart
                      color={isInWishlist(feature.id) ? "#dc2626" : "#666"}
                      fill={isInWishlist(feature.id) ? "#dc2626" : "none"}
                      size={16}
                    />
                  </button>

                  {/* Add To Cart Button */}
                  <button
                    onClick={() => addToCart(feature)}
                    className="bg-[#007580] hover:bg-[#005f68] h-8 w-8 md:h-11 md:w-11 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                    title={t("features.addToCart")}
                  >
                    <ShoppingCart
                      size="1rem"
                      color="#fff"
                      className="md:w-5 md:h-5"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Features;
