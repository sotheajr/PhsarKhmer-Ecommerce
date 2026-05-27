import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const categories = [
  "Office Chairs",
  "Lounge Chairs",
  "Dining Chairs",
  "Gaming Chairs",
  "Stools & Poufs",
];

const productsData = [
  {
    id: 1,
    name: "Ergonomic Mesh Office Chair",
    price: "$189.00",
    category: "Office Chairs",
    image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500",
  },
  {
    id: 2,
    name: "Executive Leather Swivel Chair",
    price: "$299.00",
    category: "Office Chairs",
    image:
      "https://images.thdstatic.com/productImages/158a5d30-1884-4ae1-a99f-6879ad6da8ce/svn/brown-task-chairs-skl100-64_600.jpg",
  },
  {
    id: 3,
    name: "Task Chair with Armrests",
    price: "$125.00",
    category: "Office Chairs",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvGVce27sbTAXrplcPAOWiPLBo8U9JrMVPA&s",
  },
  {
    id: 4,
    name: "Sleek White Desk Chair",
    price: "$145.00",
    category: "Office Chairs",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500",
  },
  {
    id: 5,
    name: "Modern Velvet Lounge Chair",
    price: "$240.00",
    category: "Lounge Chairs",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500",
  },
  {
    id: 6,
    name: "Classic Nordic Armchair",
    price: "$310.00",
    category: "Lounge Chairs",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500",
  },
  {
    id: 7,
    name: "Minimalist Rocking Chair",
    price: "$195.00",
    category: "Lounge Chairs",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500",
  },
  {
    id: 8,
    name: "Upholstered Dining Chair",
    price: "$89.00",
    category: "Dining Chairs",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=500",
  },
  {
    id: 9,
    name: "Wooden Mid-Century Dining Chair",
    price: "$115.00",
    category: "Dining Chairs",
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500",
  },
  {
    id: 10,
    name: "Metal Industrial Bistro Chair",
    price: "$75.00",
    category: "Dining Chairs",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500",
  },
  {
    id: 11,
    name: "Pro Racing Gaming Chair",
    price: "$349.00",
    category: "Gaming Chairs",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500",
  },
  {
    id: 12,
    name: "Premium Ergonomic Gaming Seat",
    price: "$420.00",
    category: "Gaming Chairs",
    image:
      "https://i5.walmartimages.com/seo/Fabric-Task-Chair-Mid-Back-Support-Office-Chair-with-Rolling-Wheel-Adjustable-Computer-Desk-Chair-Bean-Paste-Red_1f1d8c69-f0c5-4ed0-97ca-921a674e600c.346ed7600e7e382978e4e48a5847a6a1.jpeg",
  },
  {
    id: 13,
    name: "Handwoven Rattan Bar Stool",
    price: "$95.00",
    category: "Stools & Poufs",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=500",
  },
  {
    id: 14,
    name: "Luxury Velvet Round Pouf",
    price: "$60.00",
    category: "Stools & Poufs",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500",
  },
];

const newArrivals = [
  {
    id: "new-arrival-101",
    name: "Premium Ergonomic Mesh Office Chair",
    price: "$299.00",
    category: "Office Chairs",
    image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500",
    discount: "30%",
    isNewArrival: true,
  },
  {
    id: "new-arrival-102",
    name: "Modern Velvet Lounge Chair",
    price: "$350.00",
    category: "Lounge Chairs",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500",
    discount: "35%",
    isNewArrival: true,
  },
  {
    id: "new-arrival-103",
    name: "Scandinavian Wooden Dining Chair",
    price: "$220.00",
    category: "Dining Chairs",
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500",
    discount: "25%",
    isNewArrival: true,
  },
];

const freshlyArrived = [
  {
    id: "freshly-201",
    name: "Comfortable Executive Swivel Chair",
    price: "$189.00",
    category: "Office Chairs",
    image:
      "https://i5.walmartimages.com/seo/Fabric-Task-Chair-Mid-Back-Support-Office-Chair-with-Rolling-Wheel-Adjustable-Computer-Desk-Chair-Bean-Paste-Red_1f1d8c69-f0c5-4ed0-97ca-921a674e600c.346ed7600e7e382978e4e48a5847a6a1.jpeg",
    discount: "15%",
    isFreshlyArrived: true,
  },
  {
    id: "freshly-202",
    name: "Stylish Metal Industrial Stool",
    price: "$95.00",
    category: "Stools & Poufs",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500",
    discount: "20%",
    isFreshlyArrived: true,
  },
  {
    id: "freshly-203",
    name: "Plush Rattan Accent Chair",
    price: "$275.00",
    category: "Lounge Chairs",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500",
    discount: "18%",
    isFreshlyArrived: true,
  },
];

const Chair = () => {
  const [selectedCategory, setSelectedCategory] = useState("Office Chairs");
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const formatPrice = (price) => {
    const value =
      typeof price === "string"
        ? parseFloat(price.replace(/[^0-9.]/g, ""))
        : price;
    return Number.isNaN(value) ? price : `$${value.toFixed(2)}`;
  };

  const filteredProducts = productsData.filter(
    (item) => item.category === selectedCategory,
  );

  return (
    <div className="bg-[#fcfbf9] min-h-screen py-3 pb-24">
      {/* កែប្រែត្រង់នេះ៖ ថែម md:max-w-7xl ដើម្បីឱ្យវាធំលាតពេញអេក្រង់កុំព្យូទ័រ */}
      <div className="w-full max-w-md md:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* TOP INTERACTIVE SECTION */}
        {/* លើ Desktop ប្តូរទៅជា Grid សងខាង (Menu នៅឆ្វេង Banner នៅស្តាំ) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start w-full">
          {/* SIDEBAR NAVIGATION (រត់ផ្ដេកលើ Mobile, រត់បញ្ឈរលើ Desktop) */}
          {/* SIDEBAR NAVIGATION (រត់ផ្ដេកលើ Mobile, រត់បញ្ឈរលើ Desktop) */}
          {/* SIDEBAR NAVIGATION (បង្ហាញទាំងអស់ជា Grid លើ Mobile, រត់បញ្ឈរលើ Desktop) */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-3 w-full">
            <h2 className="text-sm font-bold mb-2 text-stone-900 tracking-wide md:text-base">
              Seat Collections
            </h2>

            {/* ប្រើ grid-cols-2 (ចែកជា ២ ជួរស្មើគ្នា) លើ Mobile និងប្តូរទៅជា flex-col លើ Desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-col gap-2">
              {categories.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(item)}
                  className={`block px-3 py-2 rounded-lg font-semibold text-center md:text-left text-xs md:text-sm transition-colors w-full ${
                    selectedCategory === item
                      ? "bg-stone-900 text-white shadow-sm"
                      : "text-stone-600 bg-stone-50 hover:bg-stone-100"
                  } ${
                    index === categories.length - 1
                      ? "col-span-2 sm:col-span-1 md:col-span-none"
                      : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* HERO BANNER SECTION */}
          {/* លើ Mobile យក col-span-1 ពេញអេក្រង់, លើ Desktop យក col-span-3 */}
          <div className="relative rounded-xl overflow-hidden h-52 md:h-64 w-full shadow-sm col-span-1 md:col-span-3">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000"
              className="w-full h-full object-cover absolute inset-0"
              alt="Chair Banner"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-900/40 to-transparent flex flex-col justify-center p-4 md:p-8 text-white z-10">
              <p className="text-[9px] md:text-xs font-semibold tracking-wider text-amber-400 uppercase">
                Comfort & Craftsmanship
              </p>
              <h1 className="text-base md:text-3xl font-black mt-0.5 leading-tight font-serif">
                Elevate Your Space <br /> With Our {selectedCategory}
              </h1>
              <button className="mt-2.5 bg-white text-stone-950 hover:bg-amber-50 font-bold px-3.5 py-1.5 rounded-lg text-xs md:text-sm w-fit transition-colors shadow">
                Explore Designs
              </button>
            </div>
          </div>
        </div>

        {/* DYNAMIC PRODUCTS GRID */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3 px-1">
            <h2 className="text-base md:text-xl font-serif font-extrabold text-stone-900">
              {selectedCategory}
            </h2>
            <span className="text-[10px] md:text-xs text-stone-700 font-medium bg-stone-100 px-2 py-0.5 rounded-full">
              {filteredProducts.length} models
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            /* លើទូរស័ព្ទចេញ 2 Columns លើ Desktop ចេញ 4 Columns ធំទូលាយ */
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col justify-between group p-2 md:p-3"
                >
                  <div className="relative overflow-hidden h-36 md:h-48 bg-stone-50 flex items-center justify-center rounded-lg">
                    <img
                      src={item.image}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={item.name}
                    />
                  </div>
                  <div className="pt-2 flex-1 flex flex-col justify-between px-0.5">
                    <div>
                      <h3 className="font-semibold text-stone-800 text-xs md:text-sm line-clamp-2 h-8 md:h-10 leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-stone-950 font-black text-sm md:text-base mt-1">
                        {item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="mt-2 w-full bg-stone-900 hover:bg-stone-800 text-white py-1.5 rounded-lg font-medium transition-colors text-xs md:text-sm tracking-wide"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl text-center text-stone-400 border border-stone-200 text-xs">
              No items available in this category.
            </div>
          )}
        </div>

        {/* BOTTOM PROMOTIONAL BANNERS */}
        {/* លើ Desktop ចេញជា 2 Columns ទន្ទឹមគ្នា */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-xl overflow-hidden h-36 md:h-44 group shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800"
              className="w-full h-full object-cover"
              alt="Promo 1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent text-white p-3.5 flex flex-col justify-end">
              <h3 className="text-sm md:text-base font-serif font-black">
                Minimalist Workspaces
              </h3>
              <p className="text-[11px] md:text-xs text-stone-200 mt-0.5">
                Boost comfort and productivity seamlessly
              </p>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden h-36 md:h-44 group shadow-sm">
            <img
              src="https://i5.walmartimages.com/seo/Homfa-King-Floating-Bed-with-Lights-LED-Platform-Bed-Frame-with-Under-Bed-Storage-PU-Leather-Adjustable-Tufted-Upholstered-Bed-White_32409c95-94f9-420e-b716-9630f25281d9.8f225689bab6fa357ad35035d6d7d4e3.jpeg"
              className="w-full h-full object-cover"
              alt="Promo 2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent text-white p-3.5 flex flex-col justify-end">
              <h3 className="text-sm md:text-base font-serif font-black">
                Sustainable Materials
              </h3>
              <p className="text-[11px] md:text-xs text-stone-200 mt-0.5">
                Premium ethically sourced wood and textiles
              </p>
            </div>
          </div>
        </div>

        {/* NEW ARRIVALS SECTION */}
        <div className="mt-8 mb-5">
          <div className="flex justify-between items-center mb-3 px-1">
            <h2 className="text-base md:text-xl font-serif font-extrabold text-stone-900 flex items-center gap-1">
              ✨ New Arrivals
            </h2>
            <span className="text-[9px] md:text-xs font-bold text-white bg-stone-900 px-2 py-0.5 rounded-full">
              Up to {Math.max(...newArrivals.map((p) => parseInt(p.discount)))}%
              OFF
            </span>
          </div>
          {/* ប្តូរ grid ទៅជា 4 columns នៅលើ desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                name: "Bouclé Accent Chair",
                price: "$280.00",
                image:
                  "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500",
              },
              {
                name: "Industrial Swivel Stool",
                price: "$85.00",
                image:
                  "https://images.unsplash.com/photo-1503602642458-232111445657?w=500",
              },
              {
                name: "Nordic Dining Armchair",
                price: "$140.00",
                image:
                  "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500",
              },
              {
                name: "Ergonomic Lumbar Support",
                price: "$210.00",
                image:
                  "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500",
              },
            ].map((prod, idx) => {
              const product = { ...prod, id: `new-arrival-${idx}` };
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-2 border border-stone-200 shadow-sm flex flex-col justify-between group"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="no-underline text-inherit"
                  >
                    <div className="h-32 md:h-44 w-full overflow-hidden rounded-lg bg-stone-50">
                      <img
                        src={prod.image}
                        className="h-full w-full object-cover"
                        alt={prod.name}
                      />
                    </div>
                    <div className="mt-1.5 flex flex-col px-0.5">
                      <h4 className="font-semibold text-stone-800 text-xs md:text-sm line-clamp-2 h-8 md:h-10 leading-tight">
                        {prod.name}
                      </h4>
                      <p className="text-stone-950 font-extrabold text-xs md:text-sm mt-1">
                        {formatPrice(prod.price)}
                      </p>
                    </div>
                  </Link>
                  <div className="mt-2 flex flex-col gap-1">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-stone-900 hover:bg-stone-800 text-white py-1.5 rounded-lg font-medium text-xs md:text-sm transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="w-full border border-stone-200 bg-white text-stone-900 py-1.5 rounded-lg font-medium text-xs md:text-sm transition-colors hover:bg-stone-50"
                    >
                      {isInWishlist(product.id) ? "Remove" : "Wishlist"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FRESHLY ARRIVED SECTION */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-3 px-1">
            <h2 className="text-base md:text-xl font-serif font-extrabold text-stone-900 flex items-center gap-1">
              🌿 Freshly Arrived
            </h2>
            <span className="text-[9px] md:text-xs font-bold text-white bg-amber-700 px-2 py-0.5 rounded-full">
              Limited Stock
            </span>
          </div>
          {/* ប្តូរ grid ទៅជា 4 columns នៅលើ desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {freshlyArrived.map((product) => {
              const priceNum =
                parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;
              const discountNum = parseInt(product.discount) || 0;
              const discountedPrice = (
                priceNum *
                (1 - discountNum / 100)
              ).toFixed(2);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden flex flex-col justify-between group relative p-2 md:p-3"
                >
                  <div className="absolute top-1.5 right-1.5 z-10 bg-amber-500 text-white px-1.5 py-0.5 rounded-full text-[8px] md:text-[10px] font-bold">
                    -{product.discount}
                  </div>
                  <div className="absolute top-1.5 left-1.5 z-10 bg-amber-700 text-white px-1.5 py-0.5 rounded text-[8px] md:text-[10px] font-bold">
                    FRESH
                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    className="no-underline text-inherit"
                  >
                    <div className="h-32 md:h-44 overflow-hidden bg-stone-50 rounded-lg flex items-center justify-center mt-4">
                      <img
                        src={product.image}
                        className="h-full w-full object-cover"
                        alt={product.name}
                      />
                    </div>
                    <div className="pt-1.5 px-0.5">
                      <h3 className="font-semibold text-stone-800 text-xs md:text-sm line-clamp-2 h-8 md:h-10 leading-tight">
                        {product.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-1 flex-wrap">
                        <span className="text-gray-400 line-through text-[10px] md:text-xs">
                          {product.price}
                        </span>
                        <span className="text-stone-900 font-black text-xs md:text-sm">
                          ${discountedPrice}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="mt-2 flex flex-col gap-1">
                    <button
                      onClick={() =>
                        addToCart({ ...product, price: `$${discountedPrice}` })
                      }
                      className="w-full bg-gradient-to-r from-amber-700 to-stone-900 hover:from-amber-800 hover:to-stone-950 text-white py-1.5 rounded-lg font-medium text-xs md:text-sm transition-all"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="w-full border border-stone-200 bg-white text-stone-900 py-1.5 rounded-lg font-medium text-xs md:text-sm transition-colors hover:bg-stone-50"
                    >
                      {isInWishlist(product.id) ? "Remove" : "Wishlist"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chair;
