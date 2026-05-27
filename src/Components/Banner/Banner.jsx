import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MoveRight } from "lucide-react";
import { useTranslation } from "../../context/LanguageContext";

const Banner = () => {
  const { t } = useTranslation();

  const products = [
    {
      id: 1,
      titleKey: "banner.title",
      subTitleKey: "banner.subtitle",
      image: "/src/assets/Banner/banner_image.png",
    },
    {
      id: 2,
      titleKey: "banner.title",
      subTitleKey: "banner.subtitle",
      image: "/src/assets/Banner/banner_image.png",
    },
    {
      id: 3,
      titleKey: "banner.title",
      subTitleKey: "banner.subtitle",
      image: "/src/assets/Banner/banner_image.png",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => (
      <div style={{ bottom: "10px" }}>
        <ul className="m-0"> {dots} </ul>
      </div>
    ),
  };

  return (
    // 🚀 ប្តូរមកប្រើ w-full និងលុប bg color ជាន់គ្នា ចេញពីប្រអប់នេះ
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
      <div className="w-full overflow-hidden">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="outline-none">
              {/* 🚀 រៀបចំ Grid ឬ Flex ឱ្យមានកម្ពស់ច្បាស់លាស់ និងកំណត់ Padding (py-6 លើ Mobile, py-16 លើ Desktop) */}
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 py-8 sm:py-12 md:py-16 lg:py-24">
                {/* TEXT CONTAINER */}
                <div className="text-center md:text-left flex flex-col items-center md:items-start w-full md:w-1/2 px-2">
                  <p className="text-[11px] md:text-sm text-[#272343] uppercase tracking-wider font-medium mb-2">
                    {t(product.subTitleKey)}
                  </p>

                  {/* សម្រួលទំហំអក្សរធំ៖ text-xl លើ Mobile ការពារកុំឱ្យធ្លាក់រុញប្លង់បាត់រូប */}
                  <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-[#272343] leading-tight max-w-[500px] mb-4 md:mb-6">
                    {t(product.titleKey)}
                  </h3>

                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3.5 bg-[#029fae] hover:bg-[#028490] transition-colors rounded-lg text-white text-xs md:text-base font-medium cursor-pointer shadow-sm">
                    {t("banner.button")} <MoveRight size={16} />
                  </button>
                </div>

                {/* IMAGE CONTAINER */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
                  <img
                    src={product.image}
                    alt={t(product.titleKey)}
                    // 🚀 កំណត់ទំហំរូបភាពឱ្យសមសួនលើ Mobile (h-[180px]) និងធំឡើងលើ Desktop
                    className="w-auto h-[180px] sm:h-[260px] md:h-[350px] lg:h-[420px] object-contain max-w-full drop-shadow-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
