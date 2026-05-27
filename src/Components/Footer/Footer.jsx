import {
  Armchair,
  Banknote,
  CreditCard,
  Facebook,
  Instagram,
  Linkedin, // 🟢 ប្ដូរពី Twitter មក Linkedin
  Send, // 🟢 យក Icon នេះមកប្រើតំណាងឱ្យ Telegram
  Youtube,
} from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "../../context/LanguageContext";

const Footer = () => {
  const { t } = useTranslation();

  const footerCategories = [
    { to: "/category/chair", labelKey: "categories.chair" },
    { to: "/category/vegetable", labelKey: "categories.vegetable" },
    { to: "/category/clothes", labelKey: "categories.clothes" },
    { to: "/category/beauty", labelKey: "categories.beauty" },
  ];

  return (
    <footer className="bg-white text-gray-800">
      {/* footer top */}
      <div className="footer_top w-full border-t border-b border-[#e1e3e5] pt-12 pb-8 bg-white">
        <div className="lg:container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* BRAND LOGO & SOCIAL SECTION */}
            <div className="order-1">
              <div className="logo_wrapper mb-4">
                <Link
                  to="/"
                  className="flex items-center gap-3 group select-none w-fit"
                >
                  <div className="p-2 bg-stone-50 rounded-xl border border-[#029fae]/20 shadow-sm transition-all group-hover:bg-[#029fae]/10">
                    <Armchair
                      size="2rem"
                      color="#029fae"
                      className="transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl sm:text-2xl font-black text-[#272343] font-inter tracking-tight">
                        Phsar<span className="text-[#029fae]">Khmer</span>
                      </span>
                      <span className="text-[10px] font-black bg-[#029fae] text-white px-1 py-0.5 rounded-md font-mono tracking-wider hidden sm:inline-block">
                        KH
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-stone-500 tracking-wide font-sans -mt-0.5">
                      ផ្សារខ្មែរ អនឡាញ
                    </p>
                  </div>
                </Link>
              </div>

              <p className="text-sm text-stone-500 font-inter font-normal mb-4 leading-relaxed">
                {t("footer.description") ||
                  "ពិសោធន៍ការទិញទំនិញអនឡាញដ៏សម្បូរបែប ងាយស្រួល រហ័សទាន់ចិត្ត និងមានទំនុកចិត្តខ្ពស់ជាមួយទំនិញគ្រប់តម្រូវការរបស់អ្នក។"}
              </p>

              {/* Social Icons */}
              <div className="footer_social flex items-center gap-2.5">
                <Link
                  to="https://www.facebook.com/share/18HzY978mV/?mibextid=wwXIfr"
                  className="p-2 rounded-full inline-flex items-center justify-center border border-[#e6eef0] hover:bg-[#007580]/5 transition-colors"
                >
                  <Facebook size="1.25rem" color="#007580" />
                </Link>

                <Link
                  to="https://www.linkedin.com/in/sothea-chhum-1938023a8/"
                  className="p-2 rounded-full inline-flex items-center justify-center border border-[#e6eef0] hover:bg-[#007580]/5 transition-colors"
                >
                  <Linkedin size="1.25rem" color="#007580" />
                </Link>

                <Link
                  to="https://t.me/sotheajr"
                  className="p-2 rounded-full inline-flex items-center justify-center border border-[#e6eef0] hover:bg-[#007580]/5 transition-colors"
                >
                  <Send
                    size="1.25rem"
                    color="#007580"
                    className="-translate-x-0.5 translate-y-0.5 rotate-[315deg]"
                  />
                </Link>

                <Link
                  to="https://www.instagram.com/sotheajr20?igsh=bGlzM29teXZncTFv&utm_source=qr"
                  className="p-2 rounded-full inline-flex items-center justify-center border border-[#e6eef0] hover:bg-[#007580]/5 transition-colors"
                >
                  <Instagram size="1.25rem" color="#007580" />
                </Link>

                <Link
                  to="https://www.youtube.com/@Sokthea.ProgrammingIT"
                  className="p-2 rounded-full inline-flex items-center justify-center border border-[#e6eef0] hover:bg-[#007580]/5 transition-colors"
                >
                  <Youtube size="1.25rem" color="#007580" />
                </Link>
              </div>
            </div>

            {/* DYNAMIC CATEGORY LINKS */}
            <div className="footer_wrapper order-3 sm:order-2">
              <h3 className="text-sm text-[#9a9caa] font-inter font-bold uppercase tracking-wider">
                {t("footer.categoriesTitle") || "Categories"}
              </h3>
              <ul className="space-y-2.5 mt-4">
                {footerCategories.map((cat, idx) => (
                  <li key={idx}>
                    <Link
                      to={cat.to}
                      className="text-base text-[#272343] hover:text-[#029fae] transition-colors font-inter font-normal"
                    >
                      {t(cat.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SUPPORT LINKS */}
            <div className="footer_wrapper order-4 sm:order-3">
              <h3 className="text-sm text-[#9a9caa] font-inter font-bold uppercase tracking-wider">
                {t("footer.support")}
              </h3>
              <ul className="space-y-2.5 mt-4">
                <li>
                  <Link className="text-base text-[#272343] hover:text-[#029fae] transition-colors font-inter font-normal capitalize">
                    {t("footer.helpSupport")}
                  </Link>
                </li>
                <li>
                  <Link className="text-base text-[#272343] hover:text-[#029fae] transition-colors font-inter font-normal capitalize">
                    {t("footer.terms")}
                  </Link>
                </li>
                <li>
                  <Link className="text-base text-[#272343] hover:text-[#029fae] transition-colors font-inter font-normal capitalize">
                    {t("footer.privacy")}
                  </Link>
                </li>
                <li>
                  <Link className="text-base text-[#272343] hover:text-[#029fae] transition-colors font-inter font-normal capitalize">
                    {t("footer.faqs")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* NEWSLETTER */}
            <div className="newsletter order-2 sm:order-4">
              <h3 className="text-sm text-[#9a9caa] font-inter font-bold uppercase tracking-wider">
                {t("footer.newsletter")}
              </h3>
              <p className="text-sm text-stone-500 mt-3 mb-4">
                {t("footer.subscribeText")}
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full flex flex-col sm:flex-row items-stretch gap-2"
              >
                {/* 🟢 កែប្រែ៖ ដក h-[44px] ចេញ ជំនួសដោយ block, py-2.5, px-3, bg-white និង text-gray-900 
                    ដើម្បីដោះស្រាយបញ្ហាបាំងអក្សរពេលវាយបញ្ចូលនៅលើ iOS Safari */}
                <input
                  type="email"
                  placeholder={t("auth.emailPlaceholder")}
                  className="block w-full sm:flex-1 py-2.5 px-3 bg-white border border-[#e1e3e5] rounded-lg text-gray-900 text-sm outline-none focus:border-[#029fae] placeholder-gray-400 font-inter leading-normal"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center text-sm md:text-base text-white font-semibold capitalize px-5 py-2.5 bg-[#007580] hover:bg-[#029fae] rounded-lg cursor-pointer transition-colors w-full sm:w-auto shadow-sm"
                >
                  {t("footer.subscribe")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* footer bottom */}
      <div className="footer_bottom w-full py-5 flex items-center justify-center bg-stone-50">
        <div className="lg:container mx-auto px-4 w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[#9a9caa] font-normal font-inter text-center sm:text-left">
                &copy; {new Date().getFullYear()} PhsarKhmer -{" "}
                {t("footer.designedBy")}{" "}
                <span className="text-[#272343] font-semibold">
                  Lifeonthecode
                </span>
              </p>
            </div>
            <div className="flex items-center gap-5">
              <p className="flex items-center gap-2 text-[#9a9caa] text-sm font-medium">
                Bank Note <Banknote size="1.5rem" className="text-stone-400" />
              </p>
              <p className="flex items-center gap-2 text-[#9a9caa] text-sm font-medium">
                Credit Card{" "}
                <CreditCard size="1.5rem" className="text-stone-400" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
