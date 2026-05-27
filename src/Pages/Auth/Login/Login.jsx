import { useState } from "react";
import { MoveRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "../../../context/LanguageContext";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandle = (event) => {
    event.preventDefault();

    const role = email.toLowerCase().includes("admin") ? "admin" : "user";

    // 🟢 ពិនិត្យមើលថាតើមានទិន្នន័យ user ក្នុង LocalStorage ឬនៅ?
    const savedUser = localStorage.getItem("user");
    let userData = savedUser ? JSON.parse(savedUser) : null;

    // បើគ្មានទិន្នន័យ user ពីមុនមកទេ (ករណីគាត់មិនបានឆ្លងកាត់ការ Register) យើងបង្កើតជូនគាត់ស្វ័យប្រវត្ត
    if (!userData || userData.email !== email) {
      userData = {
        name: email.split("@")[0], // យកឈ្មោះមុខ @ ធ្វើជាឈ្មោះបណ្ដោះអាសន្ន
        email: email,
        phone: "+855 12 345 678",
        address: "Phnom Penh, Cambodia",
        image: "https://i.pravatar.cc/150?img=3",
        password: password,
      };
    }

    // រក្សាទុកស្ថានភាព Auth ឱ្យត្រូវទម្រង់ស្តង់ដារជាមួយទំព័រផ្សេងៗ
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ រក្សាទុកជា Object ធានាថាទំព័រ UserPage មិនបាត់អក្សរ

    if (from && from !== "/auth/login" && from !== "/auth/register") {
      navigate(from, { replace: true });
      return;
    }

    if (role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    // 🟢 បន្ថែម bg-white text-gray-800 ការពារការផ្លាស់ប្ដូរពណ៌អក្សរខុសប្រក្រតីលើ iOS
    <div className="lg:container mx-auto p-6 md:p-[80px] bg-white text-gray-800">
      <div className="max-w-[648px] w-full min-h-[382px] p-6 md:p-[31px] mx-auto flex items-center justify-center flex-col rounded-xl border border-gray-300 bg-white shadow-sm">
        <h3 className="text-2xl md:text-3xl text-[#272343] font-semibold font-inter mb-6 capitalize text-center">
          {t("auth.loginTitle")}
        </h3>

        <form
          onSubmit={submitHandle}
          className="flex flex-col items-center w-full space-y-4"
        >
          {/* 🟢 បានកែប្រែប្រអប់ Input ទាំងពីរ៖ ដក h-[50px] និង bg-[#f0f2f3] ចេញ 
              ជំនួសវិញដោយ block w-full py-3 px-4 bg-white border border-gray-300 text-gray-900 text-base leading-normal
              ធានាថាអក្សររត់ចំកណ្ដាលស្អាត មិនបាំង ទោះនៅលើ iPhone ម៉ូឌែលណាក៏ដោយ */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("auth.emailPlaceholder")}
            className="block w-full py-3 px-4 bg-white border border-gray-300 text-gray-900 rounded-lg text-base outline-none focus:border-[#007580] focus:ring-1 focus:ring-[#007580]/20 transition-all placeholder-gray-400 font-inter leading-normal"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("auth.passwordPlaceholder")}
            className="block w-full py-3 px-4 bg-white border border-gray-300 text-gray-900 rounded-lg text-base outline-none focus:border-[#007580] focus:ring-1 focus:ring-[#007580]/20 transition-all placeholder-gray-400 font-inter leading-normal"
            required
          />
          <button
            type="submit"
            className="w-full py-3.5 bg-[#007580] hover:bg-[#005f68] rounded-lg text-base text-white font-semibold font-inter capitalize flex items-center justify-center cursor-pointer gap-2.5 transition-colors shadow-sm mt-2"
          >
            {t("auth.loginTitle")} <MoveRight />
          </button>
        </form>

        <p className="text-sm md:text-base text-[#272343] font-normal font-inter flex flex-wrap items-center justify-center gap-2 mt-4">
          {t("auth.noAccount")}{" "}
          <Link
            to={"/auth/register"}
            className="text-[#007580] font-medium hover:underline"
          >
            {t("auth.registerTitle")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
