import SectionTitle from "../SectionTitle/SectionTitle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { User, Quote } from "lucide-react"; // នាំចូល Quote ដើម្បីធ្វើឱ្យ Card មើលទៅកាន់តែស្អាត

const Client = () => {
  // 🚀 ជំនួសដោយព័ត៌មានពិតៗ ទាក់ទងនឹងហាងលក់គ្រឿងសង្ហារឹម (Furniture Store)
  const clientSays = [
    {
      id: 1,
      description:
        "ខ្ញុំពិតជាពេញចិត្តនឹងគុណភាពកៅអី sofa នៅទីនេះណាស់។ ការរចនាម៉ូដទាន់សម័យ អង្គុយទៅមានផាសុកភាពខ្ពស់ ហើយសេវាកម្មដឹកជញ្ជូនលឿនរហ័សទាន់ចិត្តទៀតផង។ ពិតជាមិនខកបំណងឡើយ!",
      name: "សុខ ចាន់ដារ៉ា",
      position: "អតិថិជនមកពី ភ្នំពេញ",
    },
    {
      id: 2,
      description:
        "គ្រឿងសង្ហារឹមមានគុណភាពរឹងមាំល្អណាស់ តម្លៃក៏សមរម្យធៀបនឹងទីផ្សារ។ ក្រុមការងារជួយរៀបចំ និងផ្តល់ប្រឹក្សាយ៉ាងច្បាស់លាស់។ ខ្ញុំនឹងបន្តគាំទ្រ និងទិញបន្ថែមសម្រាប់វីឡាថ្មីរបស់ខ្ញុំ។",
      name: "លី ម៉េងហួរ",
      position: "ម្ចាស់ហាងកាហ្វេ Space Coffee",
    },
    {
      id: 3,
      description:
        "កៅអីធ្វើការ (Office Chair) អង្គុយស្រួល មិនឈឺចង្កេះសោះ ទោះបីជាអង្គុយធ្វើការពេញមួយថ្ងៃក៏ដោយ។ សម្ភារៈស្វិត រឹងមាំ និងមានការធានាត្រឹមត្រូវ ចំណែកឯសេវាកម្មអតិថិជនវិញគឺល្អខ្លាំង។",
      name: "គីម ស៊ាងហៃ",
      position: "ប្រធានផ្នែកអភិវឌ្ឍន៍កម្មវិធី (IT)",
    },
    {
      id: 4,
      description:
        "ស្វែងរកតុ និងកៅអីអាហារញ៉ាំបាយជាច្រើនកន្លែង តែមកពេញចិត្តនៅទីនេះខ្លាំងជាងគេ។ ម៉ូដសាមញ្ញតែមើលទៅប្រណិត (Minimalist) ត្រូវចិត្តខ្លាំងតែម្តង។ ណែនាំឱ្យមកទិញនៅទីនេះមិនខុសទេ។",
      name: "ចាន់ ស្រីនីត",
      position: "អ្នករចនាប្លង់ខាងក្នុង (Interior Designer)",
    },
  ];

  // 🚀 រៀបចំ Responsive settings កម្ចាត់ Layout ធ្លាយលើ Mobile ដាច់ខាត
  const settings = {
    dots: true, // បើក dots ពីក្រោមដើម្បីឱ្យអ្នកប្រើដឹងថាអាចអូសបាន
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768, // 🚀 លើអេក្រង់ Mobile (បង្ហាញម្តងតែ ១ ប្រអប់ពេញៗកុំឱ្យចង្អៀត)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
      <SectionTitle title="What client says about us" mb="mb-6 md:mb-11" />

      <div className="slider-container client_slider w-full">
        <Slider {...settings} className="-mx-2">
          {clientSays?.map((client, index) => (
            <div key={index} className="p-2">
              {/* 🚀 ប្រអប់ Card: កំណត់គម្លាត (Padding) ឱ្យតូចល្មមលើ Mobile (p-5) និងធំលើ Desktop (md:p-8) */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-8 shadow-sm flex flex-col justify-between min-h-[220px] md:min-h-[260px] relative overflow-hidden group">
                {/* រូប آئកូន Quote ព្រាលៗនៅខាងក្រោយ បង្កើនភាពទាក់ទាញ */}
                <div className="absolute right-4 top-4 text-gray-100 group-hover:text-[#007580]/10 transition-colors">
                  <Quote size={40} />
                </div>

                <div>
                  {/* សម្រួលទំហំអក្សរការពិពណ៌នា៖ text-sm លើ Mobile និង text-base លើ Desktop */}
                  <p className="text-sm md:text-base text-[#636270] font-inter font-normal leading-relaxed mb-6 italic">
                    "{client?.description}"
                  </p>
                </div>

                {/* ផ្នែកព័ត៌មានអតិថិជនខាងក្រោម */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#f0f2f3] flex items-center justify-center text-[#007580]">
                    <User size={20} md:size={24} />
                  </div>
                  <div>
                    {/* សម្រួលទំហំឈ្មោះ៖ text-base លើ Mobile និង text-lg លើ Desktop */}
                    <h4 className="text-base md:text-lg text-[#272343] font-inter font-semibold capitalize">
                      {client?.name}
                    </h4>
                    {/* សម្រួលទំហំតួនាទី៖ text-[11px] លើ Mobile និង text-sm លើ Desktop */}
                    <p className="text-[11px] md:text-sm text-[#9a9caa] font-inter font-normal">
                      {client?.position}
                    </p>
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

export default Client;
