import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { ShoppingCart, Heart } from "lucide-react"; // 🚀 ថែម Icon ដើម្បីឱ្យប៊ូតុងលើ Mobile រួញស្អាត

const categories = [
  "Vegetables",
  "Fruits",
  "Fresh Meat",
  "Sea Food",
  "Organic Food",
];

const productsData = [
  {
    id: 1,
    name: "Tomato",
    price: "$8",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=500",
  },
  {
    id: 2,
    name: "Broccoli",
    price: "$6",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500",
  },
  {
    id: 3,
    name: "Carrot",
    price: "$4",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=500",
  },
  {
    id: 4,
    name: "Apple",
    price: "$5",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500",
  },
  {
    id: 5,
    name: "Pomegranate",
    price: "$5",
    category: "Fruits",
    image:
      "https://images.everydayhealth.com/images/2025/fruits-with-protein-help-boost-intake-pomegranate-1440x810.jpg",
  },
  {
    id: 6,
    name: "Banana",
    price: "$5",
    category: "Fruits",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9PKEp6XWA88B9rMvUUYg9ZI9psGX3x9rMUw&s",
  },
  {
    id: 7,
    name: "Fish",
    price: "$12",
    category: "Sea Food",
    image:
      "https://www.legalseafoods.com/wp-content/uploads/2024/05/ed4e8ffd0aa317dece6c7a7f4b5cf6d4-2000x1328.jpg",
  },
  {
    id: 8,
    name: "Beef",
    price: "$15",
    category: "Fresh Meat",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLxzQw3YJmyzb_0Dkumi6gV_tDB7ARnQ_log&s",
  },
  {
    id: 15,
    name: "Organic Lettuce",
    price: "$3",
    category: "Organic Food",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmVTzba80th_xnQgKHj7c8Tt-8scebNC4vKw&s",
  },
  {
    id: 16,
    name: "Roast Seafood",
    price: "$20",
    category: "Sea Food",
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2021/07/Roast-seafood-dish-b585388.jpg?resize=1366,1242",
  },
  {
    id: 17,
    name: "Grilled Shrimp",
    price: "$18",
    category: "Organic Food",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBcHaOOtVBmSRu1YzovKiJZDPP1CkXTn2Qzw&s",
  },
  {
    id: 18,
    name: "Organic Spinach",
    price: "$4",
    category: "Organic Food",
    image: "https://images.deliveryhero.io/image/fd-tr/LH/u3mz-listing.jpg",
  },
];

const newArrivals = [
  {
    id: "new-arrival-101",
    name: "Premium Fresh Mango",
    price: "$12.00",
    category: "Fruits",
    image:
      "https://2.wlimg.com/product_images/bc-full/2025/6/6633301/alphonso-premium-fresh-mango-1749807729-8132480.jpeg",
    discount: "20%",
    isNewArrival: true,
  },
  {
    id: "new-arrival-102",
    name: "Organic Green Salad Mix",
    price: "$8.00",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
    discount: "25%",
    isNewArrival: true,
  },
  {
    id: "new-arrival-103",
    name: "Fresh Wild Mushrooms",
    price: "$14.00",
    category: "Organic Food",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn4cgM3JBlWWmzShnP9ixHBFjutl1FLHUEpw&s",
    discount: "22%",
    isNewArrival: true,
  },
  {
    id: "new-arrival-104",
    name: "Trendy Denim Skirt",
    price: "$50.00",
    category: "Vegetables",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWxIg96geeRZbtAHIy229RF1d1Tjrai1oqmg&s",
    discount: "15%",
    isNewArrival: true,
  },
];

const freshlyArrived = [
  {
    id: "freshly-201",
    name: "Fresh Blueberries Pack",
    price: "$9.00",
    category: "Fruits",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmZcnzByVem4DqxjsNJaTXVms0JrELQZimQA&s",
    discount: "10%",
    isFreshlyArrived: true,
  },
  {
    id: "freshly-202",
    name: "Garden Fresh Zucchini",
    price: "$5.50",
    category: "Vegetables",
    image:
      "https://growagoodlife.com/wp-content/uploads/2019/05/Zucchini-Harvest-square.jpg",
    discount: "15%",
    isFreshlyArrived: true,
  },
  {
    id: "freshly-203",
    name: "Corn on the Cob",
    price: "$18.00",
    category: "Sea Food",
    image: "https://sokhakrom.com/prms/uploads/sokhakrom433.jpg",
    discount: "18%",
    isFreshlyArrived: true,
  },
  {
    id: "freshly-204",
    name: "Cabbage Head",
    price: "$110.00",
    category: "Fruits",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXbvMX3mVI7kzjNPJtFV0ChrC-xTUxQpPeEQ&s",
    discount: "10%",
    isFreshlyArrived: true,
  },
];

const Vegetables = () => {
  const [selectedCategory, setSelectedCategory] = useState("Vegetables");
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
    <div className="bg-[#f5f8f2] min-h-screen py-4 md:py-8 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-2 md:px-6">
        {/* TOP LAYOUT */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 md:gap-6">
          {/* CATEGORIES SIDEBAR (ធ្វើឱ្យអូសផ្តេកបានលើ Mobile - លែងធ្លាក់ជួរញញេរញញៃ) */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-4 md:p-5">
            <h2 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-[#272343]">
              All Categories
            </h2>
            <ul className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-2 lg:pb-0">
              {categories.map((item, index) => (
                <li key={index} className="shrink-0 lg:w-full">
                  <button
                    onClick={() => setSelectedCategory(item)}
                    className={`block w-full text-left px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-lg transition-colors whitespace-nowrap ${
                      selectedCategory === item
                        ? "bg-green-600 text-white font-medium"
                        : "bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-700"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* HERO + RIGHT MINI BANNERS */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* HERO BIG IMAGE */}
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden h-[180px] sm:h-[250px] md:h-full min-h-[180px]">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-4 md:p-6 text-white">
                <p className="text-xs md:text-lg text-green-300">
                  Welcome to Shopery
                </p>
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold leading-tight max-w-[280px] sm:max-w-md">
                  Fresh & Healthy Vegetables
                </h1>
                <button className="mt-3 md:mt-4 bg-green-600 hover:bg-green-700 text-xs md:text-sm px-4 py-1.5 md:px-5 md:py-2 rounded-lg w-fit font-medium transition-colors cursor-pointer">
                  Shop Now
                </button>
              </div>
            </div>

            {/* RIGHT CARDS WITH IMAGE (លាក់ចោលលើ Mobile បើអេក្រង់តូចពេក ឬទុកឱ្យរត់ស្អាត) */}
            <div className="hidden sm:grid grid-cols-3 md:grid-cols-1 md:flex md:flex-col gap-3 md:gap-4">
              {[
                {
                  img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500",
                  text: "Best Deals",
                },
                {
                  img: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=500",
                  text: "Sale Items",
                },
                {
                  img: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b7d?w=500",
                  text: "Fresh Fruits",
                },
              ].map((b, i) => (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden h-24 md:h-[31%] w-full"
                >
                  <img src={b.img} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 text-white p-2.5 flex items-end">
                    <h4 className="text-xs md:text-sm font-semibold">
                      {b.text}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 1. MAIN PRODUCTS GRID (🚀 កែទៅជា grid-cols-2 លើ Mobile ភ្លាមៗ) */}
        <div className="mt-8 md:mt-12">
          <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-[#272343]">
            {selectedCategory} Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between group"
              >
                <div className="h-32 sm:h-44 md:h-48 w-full overflow-hidden bg-gray-50">
                  <img
                    src={item.image}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-3 md:p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-xs md:text-base font-semibold text-gray-800 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-green-600 font-bold text-sm md:text-lg mt-0.5 md:mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-2.5 w-full bg-green-600 hover:bg-green-700 text-white py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* BOTTOM BANNER */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 mt-10 md:mt-14">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 text-white p-3 md:p-6 flex items-center md:items-start">
              <h3 className="text-sm sm:text-base md:text-xl font-bold">
                Special Offer
              </h3>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=800"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 text-white p-3 md:p-6 flex items-center md:items-start">
              <h3 className="text-sm sm:text-base md:text-xl font-bold">
                Organic Food
              </h3>
            </div>
          </div>
        </div>
        {/* 2. NEW ARRIVALS SECTION (🚀 រៀបចំជា ២ ជួរតូចល្មមលើ Mobile) */}
        <div className="mt-10 md:mt-14">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-lg md:text-2xl font-bold text-[#272343]">
              ✨ New Arrivals
            </h2>
            <span className="text-[10px] md:text-sm font-semibold text-white bg-green-600 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full">
              Up to {Math.max(...newArrivals.map((p) => parseInt(p.discount)))}%
              OFF
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {newArrivals.map((product) => {
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
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col justify-between group relative shadow-sm"
                >
                  <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-1.5 py-0.5 rounded-md text-[9px] md:text-xs font-bold">
                    -{product.discount}
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="no-underline text-inherit block"
                  >
                    <div className="h-32 sm:h-44 md:h-48 overflow-hidden bg-gray-50">
                      <img
                        src={product.image}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-300"
                        alt={product.name}
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-semibold text-gray-800 text-xs md:text-sm line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-gray-400 line-through text-[10px] md:text-xs">
                          {product.price}
                        </span>
                        <span className="text-green-700 font-bold text-sm md:text-lg">
                          ${discountedPrice}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="px-3 pb-3 md:px-4 md:pb-4 grid grid-cols-4 gap-1.5">
                    <button
                      onClick={() =>
                        addToCart({ ...product, price: `$${discountedPrice}` })
                      }
                      className="col-span-3 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-lg font-medium text-xs md:text-sm transition-colors cursor-pointer"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`col-span-1 border rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                        isInWishlist(product.id)
                          ? "border-red-200 bg-red-50 text-red-500"
                          : "border-gray-200 bg-white text-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <Heart
                        size={14}
                        fill={
                          isInWishlist(product.id) ? "currentColor" : "none"
                        }
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. FRESHLY ARRIVED SECTION (🚀 រៀបចំជា ២ ជួរ និងបង្រួមទំហំសមសួនលើ Mobile) */}
        <div className="mt-10 md:mt-14 mb-6">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-lg md:text-2xl font-bold text-[#272343]">
              🌿 Freshly Arrived
            </h2>
            <span className="text-[10px] md:text-sm font-semibold text-white bg-green-700 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full">
              Limited Stock
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
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
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col justify-between group relative shadow-sm"
                >
                  <div className="absolute top-2 right-2 z-10 bg-amber-500 text-white px-1.5 py-0.5 rounded-md text-[9px] md:text-xs font-bold">
                    -{product.discount}
                  </div>
                  <div className="absolute top-2 left-2 z-10 bg-green-700 text-white px-1.5 py-0.5 rounded text-[8px] md:text-[10px] font-bold uppercase tracking-wider">
                    Fresh
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="no-underline text-inherit block"
                  >
                    <div className="h-32 sm:h-44 md:h-48 overflow-hidden bg-gray-50 mt-2">
                      <img
                        src={product.image}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-300"
                        alt={product.name}
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-semibold text-gray-800 text-xs md:text-sm line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-gray-400 line-through text-[10px] md:text-xs">
                          {product.price}
                        </span>
                        <span className="text-green-700 font-bold text-sm md:text-lg">
                          ${discountedPrice}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="px-3 pb-3 md:px-4 md:pb-4 grid grid-cols-4 gap-1.5">
                    <button
                      onClick={() =>
                        addToCart({ ...product, price: `$${discountedPrice}` })
                      }
                      className="col-span-3 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-lg font-medium text-xs md:text-sm transition-colors cursor-pointer"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`col-span-1 border rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                        isInWishlist(product.id)
                          ? "border-red-200 bg-red-50 text-red-500"
                          : "border-gray-200 bg-white text-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <Heart
                        size={14}
                        fill={
                          isInWishlist(product.id) ? "currentColor" : "none"
                        }
                      />
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

export default Vegetables;
