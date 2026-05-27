import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ShoppingCart, Heart } from "lucide-react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTranslation } from "../../context/LanguageContext";

const Recent = () => {
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

  // 🚀 រៀបចំ Responsive Settings ឱ្យឆ្លាតវៃសម្រាប់កម្ចាត់បញ្ហាខ្ទាត Layout លើ Mobile
  const settings = {
    dots: false,
    infinite: features.length > 4, // បើផលិតផលតិចជាង ឬស្មើ ៤ មិនបាច់ឱ្យវាវិលជុំវិញទេ ការពារការគាំង Slider
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // លើ Tablet
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // លើ Mobile ធំ
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // 🚀 លើ Mobile តូច (ចេញ ២ ជួរក្បែរគ្នា ធំល្មមមើលច្បាស់ មិនហែកធ្លាយ)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false, // បិទព្រួញលើ mobile ដើម្បីសល់ផ្ទៃបង្ហាញកាតបានធំល្អ
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
      <SectionTitle
        title={t("recentSection.title") || "Recently Added"}
        mb="mb-6 md:mb-11"
      />

      <div className="slider-container recent_slider w-full">
        <Slider {...settings} className="-mx-2">
          {features.map((feature) => (
            <div key={feature.id} className="p-2">
              {/* 🚀 រចនាកាតផលិតផល (Card) ឱ្យមានលក្ខណៈ Premium ហាប់ណែនល្អ */}
              <div className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col justify-between h-full transition-all hover:shadow-sm">
                {/* IMAGE */}
                <div className="w-full h-[140px] sm:h-[180px] md:h-[240px] bg-[#f8f9fa] rounded-xl flex items-center justify-center relative overflow-hidden">
                  <Link
                    to={`/product/${feature.id}`}
                    className="w-full h-full flex items-center justify-center"
                    state={{
                      title: feature.title,
                      price: feature.price,
                      currentPrice: feature.currentPrice,
                      image: feature.image,
                      status: feature.statusKey ? t(feature.statusKey) : null,
                    }}
                  >
                    <img
                      className="w-full h-full object-contain p-2 transition-transform duration-300 hover:scale-105"
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
                    {/* ការពារអក្សរវែងធ្លាក់ជួរខូចទម្រង់កាតដោយប្រើ line-clamp-1 */}
                    <h4 className="text-xs md:text-base text-[#272343] font-semibold font-inter capitalize line-clamp-1">
                      {feature.title}
                    </h4>

                    {/* បង្ហាញតម្លៃនៅក្រោមចំណងជើងភ្លាមៗ ដូច UI ថ្មីរបស់អ្នក */}
                    <p className="text-sm md:text-lg flex items-center gap-2 text-[#007580] font-bold mt-1 font-inter">
                      ${feature.price}
                      {feature.currentPrice && (
                        <span className="text-xs md:text-sm text-[#9a9caa] font-normal line-through">
                          ${feature.currentPrice}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* 🚀 ប៊ូតុង Wishlist និង បន្ថែមទៅក្នុងរទេះ (Cart) រៀបចំនៅខាងក្រោមស្អាតបាត */}
                  <div className="flex items-center justify-end gap-1.5 mt-3 pt-2 border-t border-gray-50">
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
                        size={15}
                      />
                    </button>

                    <button
                      onClick={() => addToCart(feature)}
                      className="bg-[#007580] hover:bg-[#005f68] h-8 w-8 md:h-11 md:w-11 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <ShoppingCart
                        size="0.9rem"
                        className="text-white md:w-5 md:h-5"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Recent;
