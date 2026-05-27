import {
  Armchair,
  Check,
  Heart,
  Home,
  Info,
  Menu,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link, NavLink, useNavigate, useLocation } from "react-router";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTranslation } from "../../context/LanguageContext";
import { useState } from "react";

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, locale, setLocale } = useTranslation();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const activePath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div>
      {/* navbar top */}
      <div className="navbar_top flex items-center justify-center bg-[#272343] h-[45px] w-full">
        <div className="lg:container flex justify-between items-center">
          <p className="flex items-center gap-2 text-sm font-inter font-normal text-white capitalize">
            <Check /> {t("freeShipping")}
          </p>

          <div className="navbar_top_right flex items-center gap-6">
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className="bg-none h-[30px] w-[110px] text-sm font-inter font-normal capitalize text-white"
            >
              <option value="en">English</option>
              <option value="km">ភាសាខ្មែរ</option>
            </select>

            <button>
              <Link className="text-sm text-white font-inter font-normal capitalize">
                {t("faqs")}
              </Link>
            </button>
            <button>
              <Link className="flex items-center text-sm text-white font-inter font-normal capitalize">
                <Info /> {t("needHelp")}
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* navbar middle */}
      <div className="navbar_middle flex items-center justify-center bg-[#f0f2f3] w-full h-[84px]">
        <div className="lg:container grid grid-cols-3 items-center">
          {/* LOGO SECTION */}
          <div className="logo_wrapper">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-2 mr-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
                onClick={() => setMobileMenuOpen((s) => !s)}
              >
                <Menu className="h-6 w-6 text-black" size={24} />
              </button>

              <Link
                to="/"
                className="flex items-center gap-3 group select-none"
              >
                <div className="p-2 bg-white rounded-xl border border-[#029fae]/20 shadow-sm transition-all group-hover:bg-[#029fae]/10">
                  <Armchair
                    size="2rem"
                    color="#029fae"
                    className="transition-transform group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl font-black text-[#272343] font-inter tracking-tight">
                      Phsar<span className="text-[#029fae]">Khmer</span>
                    </span>
                    <span className="text-[10px] font-black bg-[#029fae] text-white px-1.5 py-0.5 rounded-md font-mono tracking-wider">
                      KH
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-stone-500 tracking-wide font-sans -mt-0.5">
                    ផ្សារខ្មែរ អនឡាញ
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* 🔍 SEARCH BOX SECTION */}
          <div className="search_box">
            <form
              action="#"
              className="max-w-[443px] h-[46px] relative hidden md:block rounded-xl border border-gray-200 bg-white shadow-sm focus-within:border-[#029fae] focus-within:ring-2 focus-within:ring-[#029fae]/20 transition-all duration-300"
            >
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="w-full h-full bg-transparent rounded-xl pl-4 pr-14 text-sm text-gray-800 outline-none placeholder-gray-400 font-inter"
              />

              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-[38px] h-[38px] bg-[#029fae] hover:bg-[#028390] text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                aria-label="Search button"
              >
                <Search size="18px" color="#ffffff" />
              </button>
            </form>

            {/* mobile search icon */}
            <div className="hidden md:hidden flex items-center justify-end">
              <button
                aria-label="Search"
                onClick={() => setShowSearch((s) => !s)}
                className="p-2"
              >
                <Search />
              </button>
            </div>

            {/* mobile search overlay */}
            {showSearch && (
              <div className="fixed inset-0 z-50 bg-black/40 flex items-start p-4 md:hidden">
                <div className="w-full">
                  <form className="w-full bg-white rounded-xl p-2 flex items-center shadow-lg border border-gray-100">
                    <input
                      className="flex-1 px-3 py-2 border rounded-lg text-gray-900 bg-white outline-none focus:border-[#029fae]"
                      placeholder={t("searchPlaceholder")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSearch(false)}
                      className="ml-2 px-3 py-2 text-gray-600 font-medium text-sm"
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* navbar middle right */}
          <div className="navbar_middle_right flex items-center justify-end gap-4">
            {/* Wishlist */}
            {!(showSearch || activePath === "/search") && (
              <Link to="/wishlist" className="hidden md:flex">
                <button className="btn capitalize relative">
                  <Heart />
                  {t("wishlist") || t("favorites")}
                  {wishlistItems.length > 0 && (
                    <div className="badge badge-sm bg-[#dc2626] absolute -top-2 -right-2">
                      {wishlistItems.length}
                    </div>
                  )}
                </button>
              </Link>
            )}

            {/* Cart Link */}
            <Link
              to="/cart"
              className="hidden md:flex items-center gap-2 relative btn border border-gray-200"
            >
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#029fae] text-white text-[10px] rounded-full px-1.5 min-w-[18px] h-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
              <span>Cart</span>
            </Link>

            {/* User Section */}
            {isAuthenticated ? (
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">
                  <User />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <Link to="/pages/user">{t("account")}</Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>{t("logout")}</a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/auth/login" className="btn capitalize">
                  {t("login")}
                </Link>
                <Link to="/auth/register" className="btn capitalize">
                  {t("register")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* navbar bottom */}
      <div className="navbar_bottom hidden md:flex items-center justify-center w-full bg-white border-b-[1px] border-[#e1e3e5]">
        <div className="lg:container flex items-center justify-between py-3">
          <div className="navbar_bottom_left flex items-center gap-4">
            <div className="dropdown dropdown-start hidden md:block">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 flex items-center gap-5 capitalize"
              >
                <Menu /> {t("allCategories")}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <Link to="/category/chair">{t("categories.chair")}</Link>
                </li>
                <li>
                  <Link to="/category/vegetable">
                    {t("categories.vegetable")}
                  </Link>
                </li>
                <li>
                  <Link to="/category/clothes">{t("categories.clothes")}</Link>
                </li>
                <li>
                  <Link to="/category/beauty">{t("categories.beauty")}</Link>
                </li>
              </ul>
            </div>

            {/* 🟢 Desktop Navigation Links (បានរក្សាទុក និងបន្ថែមគ្រប់ Menu ទាំងអស់របស់អ្នកវិញ) */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-inter font-medium capitalize transition-colors ${
                    isActive
                      ? "text-[#029fae]"
                      : "text-[#636270] hover:text-[#029fae]"
                  }`
                }
              >
                {t("home")}
              </NavLink>

              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `text-sm font-inter font-medium capitalize transition-colors ${
                    isActive
                      ? "text-[#029fae]"
                      : "text-[#636270] hover:text-[#029fae]"
                  }`
                }
              >
                {t("navbar.shop") || "Shop"}
              </NavLink>

              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `text-sm font-inter font-medium capitalize transition-colors ${
                    isActive
                      ? "text-[#029fae]"
                      : "text-[#636270] hover:text-[#029fae]"
                  }`
                }
              >
                {t("navbar.product") || "Product"}
              </NavLink>

              {/* Pages Dropdown on Desktop */}
              <div className="dropdown dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className="text-sm font-inter font-medium capitalize text-[#636270] hover:text-[#029fae] cursor-pointer"
                >
                  Pages ▼
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[10] w-48 p-2 shadow"
                >
                  <li>
                    <Link to="/category/vegetable">Vegetable</Link>
                  </li>
                  <li>
                    <Link to="/category/chair">Chair</Link>
                  </li>
                  <li>
                    <Link to="/category/beauty">Beauty</Link>
                  </li>
                  <li>
                    <Link to="/category/clothes">Clothes</Link>
                  </li>
                </ul>
              </div>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-sm font-inter font-medium capitalize transition-colors ${
                    isActive
                      ? "text-[#029fae]"
                      : "text-[#636270] hover:text-[#029fae]"
                  }`
                }
              >
                {t("navbar.about") || "About"}
              </NavLink>
            </nav>
          </div>

          <div className="navbar_bottom_right hidden md:block">
            <p className="text-sm text-[#636270] font-inter font-normal capitalize">
              {t("contact")} :{" "}
              <span className="text-[#272343]">(+855)97 6261 739</span>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile bottom tabs */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e1e3e5] shadow-[0_-4px_18px_rgba(0,0,0,0.1)] md:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 text-xs ${
              activePath === "/" ? "text-[#029fae]" : "text-[#6b7280]"
            }`}
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <button
            type="button"
            onClick={() => setShowSearch((s) => !s)}
            className={`flex flex-col items-center gap-1 text-xs ${
              showSearch ? "text-[#029fae]" : "text-[#6b7280]"
            }`}
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>
          <Link
            to="/shop"
            className={`flex flex-col items-center gap-1 text-xs ${
              activePath === "/shop" ? "text-[#029fae]" : "text-[#6b7280]"
            }`}
          >
            <Armchair className="h-5 w-5" />
            <span>Shop</span>
          </Link>
          <Link
            to="/wishlist"
            className={`relative flex flex-col items-center gap-1 text-xs ${
              activePath === "/wishlist" ? "text-[#029fae]" : "text-[#6b7280]"
            }`}
          >
            <div className="relative">
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1.5 min-w-[16px] text-center leading-none">
                  {wishlistItems.length}
                </span>
              )}
            </div>
            <span>Wish</span>
          </Link>

          <Link
            to="/cart"
            className={`relative flex flex-col items-center gap-1 text-xs ${
              activePath === "/cart" ? "text-[#029fae]" : "text-[#6b7280]"
            }`}
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#029fae] text-white text-[10px] rounded-full px-1.5 min-w-[16px] text-center leading-none">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>
        </div>
      </div>

      {/* Mobile inline menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-0 left-0 w-64 bg-white h-full shadow-xl p-4 overflow-y-auto flex flex-col z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Armchair color="#029fae" />
                <span className="text-lg font-semibold text-gray-800">
                  PhsarKhmer
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-gray-500 p-2 hover:text-gray-800"
              >
                Close
              </button>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1"
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1"
                >
                  Product
                </NavLink>
              </li>
              <li>
                <details className="group">
                  <summary className="cursor-pointer font-medium list-none flex justify-between items-center py-1">
                    <span>Pages</span>
                    <span className="text-xs transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <ul className="pl-4 mt-2 space-y-2 text-sm text-gray-600 border-l-2 border-gray-100">
                    <li>
                      <NavLink
                        to="/category/vegetable"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1"
                      >
                        Vegetable
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/category/chair"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1"
                      >
                        Chair
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/category/beauty"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1"
                      >
                        Beauty
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/category/clothes"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1"
                      >
                        Clothes
                      </NavLink>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1"
                >
                  Wishlist
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
