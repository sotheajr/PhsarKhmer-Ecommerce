import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionTitle from "./../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import { useTranslation } from "../../context/LanguageContext";
import categoriesImg1 from "../../assets/categories/categories_1.png";
import categoriesImg2 from "../../assets/categories/categories_2.png";
import categoriesImg3 from "../../assets/categories/categories_3.png";
import categoriesImg4 from "../../assets/categories/categories_4.png";

const Categories = () => {
  const { t } = useTranslation();

  const categories = [
    {
      titleKey: "categories.wingChair",
      count: 3584,
      image: categoriesImg1,
    },
    {
      titleKey: "categories.woodenChair",
      count: 157,
      image: categoriesImg2,
    },
    {
      titleKey: "categories.deskChair",
      count: 154,
      image: categoriesImg3,
    },
    {
      titleKey: "categories.parkBench",
      count: 154,
      image: categoriesImg4,
    },
  ];

  // 🚀 រៀបចំ Responsive Settings ឱ្យត្រូវតាមស្តង់ដារអេក្រង់ទូរស័ព្ទ
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px", // កាត់បន្ថយការហែកសងខាងលើ Desktop ឱ្យសមល្មម
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024, // លើ Tablet
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 640, // លើ Mobile: បង្ហាញ ១ កាតចំកណ្តាលពេញភ្នែក និងលៀនកាតសងខាង ២០px ឱ្យដឹងថាអាច Scroll បាន
        settings: {
          slidesToShow: 1,
          centerPadding: "24px",
          arrows: false, // បិទព្រួញឆ្វេងស្តាំលើ Mobile កុំឱ្យចង្អៀត
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
      {/* កែសម្រួលចំណងជើងឱ្យមាន Padding ខ្លះលើ Mobile */}
      <SectionTitle title={t("homeSection.topCategories")} mb="mb-6 md:mb-11" />

      <div className="slider-container categories_slider w-full">
        <Slider {...settings} className="-mx-2">
          {categories?.map((category, index) => (
            <div key={index} className="p-2">
              {/* 🚀 រៀបចំប្រអប់ Card: កំណត់កម្ពស់ h-[280px] លើ Mobile និង h-[400px] លើ Desktop */}
              <div className="w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden relative group shadow-sm border border-gray-100 bg-gray-50">
                <Link
                  to={`/product/${category.id || index}`}
                  className="w-full h-full block"
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={category?.image}
                    alt={t(category.titleKey)}
                  />
                </Link>

                {/* 🚀 របារព័ត៌មានខាងក្រោម: សម្រួលទំហំអក្សរឱ្យតូចសមសួនលើ Mobile ការពារការគរជង់គ្នា */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/60 to-transparent flex flex-col justify-end p-4 pt-10">
                  <h4 className="text-base md:text-xl text-white font-bold font-inter mb-0.5 capitalize truncate">
                    {t(category.titleKey)}
                  </h4>
                  <p className="text-[11px] md:text-sm text-gray-200 capitalize font-medium font-inter">
                    {t("categoriesSection.products", {
                      count: category.count,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Categories;
