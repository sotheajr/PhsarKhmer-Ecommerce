import { Clock3, Percent, ShieldCheck, Truck } from "lucide-react";

const Delivery = () => {
  return (
    // 🚀 កែសម្រួល padding (p-4 លើ mobile, p-7 លើ desktop) និងដក lg:container ចេញដើម្បីឱ្យវាលាតសន្ធឹងស្អាត
    <div className="w-full max-w-7xl mx-auto bg-white shadow-sm border border-gray-100 p-5 md:p-7 rounded-2xl my-6">
      {/* 🚀 ដំណោះស្រាយ Grid: 
          - grid-cols-1 (Mobile: ចេញ ១ ជួរធំៗចុះក្រោម ឬអាចដូរជា grid-cols-2 បើចង់បាន ២ ជួរ)
          - sm:grid-cols-2 (Tablet: ចេញ ២ ជួរដេក)
          - lg:grid-cols-4 (Desktop: ចេញ ៤ ជួរដេកស្របគ្នា) 
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
        {/* Item 1: Discount */}
        <div className="delivery_wrapper p-2 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="flex items-center gap-4">
            {/* 🚀 ប្តូរពណ៌ Icon និងបន្ថយទំហំមក 2.5rem នៅលើ Mobile ដើម្បីឱ្យសមសួន */}
            <div className="text-[#007580] bg-[#f0f9fa] p-3 rounded-xl flex items-center justify-center">
              <Percent size="2.2rem" className="md:w-10 md:h-10" />
            </div>
            <div>
              <h4 className="text-sm md:text-base text-[#272343] capitalize font-inter font-semibold mb-1">
                Discount
              </h4>
              <p className="text-xs md:text-sm text-[#9a9caa] font-inter font-normal">
                Every week new sales
              </p>
            </div>
          </div>
        </div>

        {/* Item 2: Free Delivery */}
        <div className="delivery_wrapper p-2 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="flex items-center gap-4">
            <div className="text-[#007580] bg-[#f0f9fa] p-3 rounded-xl flex items-center justify-center">
              <Truck size="2.2rem" className="md:w-10 md:h-10" />
            </div>
            <div>
              <h4 className="text-sm md:text-base text-[#272343] capitalize font-inter font-semibold mb-1">
                Free Delivery
              </h4>
              <p className="text-xs md:text-sm text-[#9a9caa] font-inter font-normal">
                100% Free for all orders
              </p>
            </div>
          </div>
        </div>

        {/* Item 3: Great Support */}
        <div className="delivery_wrapper p-2 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="flex items-center gap-4">
            <div className="text-[#007580] bg-[#f0f9fa] p-3 rounded-xl flex items-center justify-center">
              <Clock3 size="2.2rem" className="md:w-10 md:h-10" />
            </div>
            <div>
              <h4 className="text-sm md:text-base text-[#272343] capitalize font-inter font-semibold mb-1">
                Great Support 24/7
              </h4>
              <p className="text-xs md:text-sm text-[#9a9caa] font-inter font-normal">
                We care your experiences
              </p>
            </div>
          </div>
        </div>

        {/* Item 4: Secure Payment */}
        <div className="delivery_wrapper p-2 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="flex items-center gap-4">
            <div className="text-[#007580] bg-[#f0f9fa] p-3 rounded-xl flex items-center justify-center">
              <ShieldCheck size="2.2rem" className="md:w-10 md:h-10" />
            </div>
            <div>
              <h4 className="text-sm md:text-base text-[#272343] capitalize font-inter font-semibold mb-1">
                Secure Payment
              </h4>
              <p className="text-xs md:text-sm text-[#9a9caa] font-inter font-normal">
                100% Secure Payment Method
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
