import { useState } from "react";
import { MoveRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "../../../context/LanguageContext";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandle = (event) => {
    event.preventDefault();

    const role = email.toLowerCase().includes("admin") ? "admin" : "user";

    const userData = {
      name: name,
      email: email,
      phone: "",
      address: "",
      image: "https://i.pravatar.cc/150?img=3",
      password: password,
    };

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(userData));

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
    <div className="lg:container mx-auto p-6 md:p-[80px] bg-white text-gray-800">
      <div className="max-w-[648px] w-full min-h-[382px] p-6 md:p-[31px] mx-auto flex items-center justify-center flex-col rounded-xl border border-gray-300 bg-white shadow-sm">
        <h3 className="text-2xl md:text-3xl text-[#272343] font-semibold font-inter mb-6 capitalize text-center">
          {t("auth.registerTitle")}
        </h3>

        <form
          onSubmit={submitHandle}
          className="flex flex-col items-center w-full space-y-4"
        >
          {/* 🟢 បានកែប្រែត្រង់នេះ៖ ដក h-[50px] ចេញ រួចជំនួសដោយ py-3.5 និងសរសេរលក្សខណ្ឌ block, w-full, text-base 
              ដើម្បីកុំឱ្យប្រព័ន្ធ iOS បាំងអក្សរ ឬរុញអក្សរធ្លាក់បាត់ */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("auth.namePlaceholder")}
            className="block w-full py-3 px-4 bg-white border border-gray-300 text-gray-900 rounded-lg text-base outline-none focus:border-[#007580] focus:ring-1 focus:ring-[#007580]/20 transition-all placeholder-gray-400 font-inter leading-normal"
            required
          />

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
            {t("auth.registerTitle")} <MoveRight />
          </button>
        </form>

        <p className="text-sm md:text-base text-[#272343] font-normal font-inter flex flex-wrap items-center justify-center gap-2 mt-4">
          {t("auth.haveAccount")}{" "}
          <Link
            to={"/auth/login"}
            className="text-[#007580] font-medium hover:underline"
          >
            {t("auth.loginTitle")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
