import Banner from "../../Components/Banner/Banner";
import Brand from "../../Components/Brand/Brand";
import Categories from "../../Components/Categories/Categories";
import Client from "../../Components/Client/Client";
import Product from "../../Components/Product/Product";
import Recent from "../../Components/Recent/Recent";
import Delivery from "./../../Components/Delivery/Delivery";
import Features from "./../../Components/Features/Features";

const Home = () => {
  return (
    // 🚀 ដំណោះស្រាយ៖ ប្រើ flex flex-col និង gap ជំនួសឱ្យការកំណត់ margin/padding ធំៗដាច់ដោយឡែកពីគ្នា
    <div className="w-full bg-white flex flex-col gap-y-8 md:gap-y-16 overflow-x-hidden">
      {/* 1. Banner Component */}
      <div className="w-full bg-[#f0f2f3] rounded-b-2xl md:rounded-b-3xl">
        <Banner />
      </div>
      {/* 2. Delivery Component */}
      <div className="w-full px-4 md:px-0">
        <Delivery />
      </div>

      {/* 3. Brand Component */}
      <div className="w-full px-4 md:px-0">
        <Brand />
      </div>

      {/* 4. Features Component */}
      <div className="w-full">
        <Features />
      </div>

      {/* 5. Categories Component */}
      <div className="w-full">
        <Categories />
      </div>

      {/* 6. Product Component */}
      <div className="w-full">
        <Product />
      </div>

      {/* 7. Client Say Component: កំណត់ទំហំ py (Padding លើ-ក្រោម) ឱ្យសមល្មមលើ Mobile */}
      <div className="w-full bg-[#f0f2f3] py-10 md:py-[80px]">
        <Client />
      </div>

      {/* 8. Recent Component */}
      <div className="w-full pb-10 md:pb-[80px]">
        <Recent />
      </div>
    </div>
  );
};

export default Home;
