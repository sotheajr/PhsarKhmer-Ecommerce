import bannerImg1 from "../../assets/brands/brand_1.png";
import bannerImg2 from "../../assets/brands/brand_2.png";
import bannerImg3 from "../../assets/brands/brand_3.png";
import bannerImg4 from "../../assets/brands/brand_4.png";
import bannerImg5 from "../../assets/brands/brand_5.png";
import bannerImg6 from "../../assets/brands/brand_6.png";
import bannerImg7 from "../../assets/brands/brand_7.png";
const Brand = () => {
  const brands = [
    {
      id: 1,
      image: bannerImg1,
    },
    {
      id: 2,
      image: bannerImg2,
    },
    {
      id: 3,
      image: bannerImg3,
    },
    {
      id: 4,
      image: bannerImg4,
    },
    {
      id: 5,
      image: bannerImg5,
    },
    {
      id: 6,
      image: bannerImg6,
    },
    {
      id: 7,
      image: bannerImg7,
    },
  ];

  return (
    <div className="lg:container mx-auto">
      <div className="grid grid-cols-7 items-center justify-center gap-5">
        {brands?.map((brand) => (
          <div key={brand?.id} className="brand_item">
            <img className="w-auto h-auto" src={brand?.image} alt="brand" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;
