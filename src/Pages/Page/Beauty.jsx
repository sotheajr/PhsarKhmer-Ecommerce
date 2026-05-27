import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const categories = [
  "Lipsticks",
  "Foundations",
  "Eye Makeup",
  "Skincare",
  "Fragrances",
];

const productsData = [
  {
    id: 1,
    name: "Matte Velvet Lipstick",
    price: "$28.00",
    category: "Lipsticks",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500",
  },
  {
    id: 2,
    name: "High-Shine Lip Gloss",
    price: "$22.00",
    category: "Lipsticks",
    image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=500",
  },
  {
    id: 3,
    name: "Satin Liquid Lip Color",
    price: "$25.00",
    category: "Lipsticks",
    image: "https://i.ebayimg.com/images/g/cuoAAOSw~rtmAZ-3/s-l1200.jpg",
  },
  {
    id: 4,
    name: "Hydrating Lip Balm",
    price: "$16.00",
    category: "Lipsticks",
    image:
      "https://sfskincare.com/cdn/shop/files/GlyMed_Plus_Hydrating_Lip_Balm__39008_1200x.jpg?v=1700425811",
  },
  {
    id: 5,
    name: "Flawless Luminous Foundation",
    price: "$45.00",
    category: "Foundations",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500",
  },
  {
    id: 6,
    name: "Matte Full Coverage Concealer",
    price: "$30.00",
    category: "Foundations",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
  },
  {
    id: 7,
    name: "Loose Setting Powder",
    price: "$38.00",
    category: "Foundations",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500",
  },
  {
    id: 8,
    name: "Nude Eyeshadow Palette",
    price: "$49.00",
    category: "Eye Makeup",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
  },
  {
    id: 9,
    name: "Waterproof Volumizing Mascara",
    price: "$24.00",
    category: "Eye Makeup",
    image:
      "https://www.maquibeauty.com/images/productos/bell-vegan-collagen-mascara-de-pestanas-voluminizadora-hypoallergenic-waterproof-1-76645.jpeg",
  },
  {
    id: 10,
    name: "Precision Liquid Eyeliner",
    price: "$18.00",
    category: "Skincare",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500",
  },
  {
    id: 11,
    name: "Glow Vitamin C Serum",
    price: "$55.00",
    category: "Skincare",
    image:
      "https://of.nice-cdn.com/upload/image/product/large/default/101-c-glow-15-vitamin-c-serum-30-ml-593346-en.webp",
  },
  {
    id: 12,
    name: "Hydrating Hyaluronic Cream",
    price: "$42.00",
    category: "Skincare",
    image:
      "https://www.skin2seoul.co.uk/cdn/shop/files/jumisocream-min_800x.jpg?v=1730199041",
  },
  {
    id: 13,
    name: "Eau de Parfum Luxury Rose",
    price: "$120.00",
    category: "Fragrances",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
  },
  {
    id: 14,
    name: "Blossom Cologne",
    price: "$95.00",
    category: "Fragrances",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500",
  },
  {
    id: 15,
    name: "Ocean Breeze Body Mist",
    price: "$35.00",
    category: "Foundations",
    image: "https://m.media-amazon.com/images/I/71QAHZzhQlL._SX522_.jpg",
  },
  {
    id: 16,
    name: "Satin Lipstick Set",
    price: "$60.00",
    category: "Eye Makeup",
    image:
      "https://www.cultbeauty.com/images?url=https://static.thcdn.com/productimg/original/13642127-1015256173007531.jpg&format=webp&auto=avif&width=985&height=985&fit=cover",
  },
  {
    id: 17,
    name: "Glowing Skin Serum",
    price: "$50.00",
    category: "Eye Makeup",
    image:
      "https://xoxo-eg.com/cdn/shop/files/Benefit-BADgal-BANG-Waterproof-Volumizing-Mascara-9794.jpg?v=1747087212",
  },
  {
    id: 18,
    name: "Rose Gold Highlighter",
    price: "$28.00",
    category: "Skincare",
    image: "https://www.beautycoiffure.com/260051-large_default/t.jpg",
  },
  {
    id: 19,
    name: "Scented Candle Trio",
    price: "$45.00",
    category: "Fragrances",
    image:
      "https://media.neimanmarcus.com/f_auto,q_auto:low,ar_4:5,c_fill,dpr_2.0,w_790/01/nm_200737_100000_c",
  },
  {
    id: 20,
    name: "Luxury Makeup Brush Set",
    price: "$48.00",
    category: "Fragrances",
    image:
      "https://demeterfragrance.com/cdn/shop/products/Temp_-_Cherry_Blossom_-_Cologne_Spray_-_3.4_oz_-_100_ml.png?v=1680703291",
  },
];

const newArrivals = [
  {
    id: "new-arrival-101",
    name: "Gloss Liquid Foundation Pro",
    price: "$65.00",
    category: "Foundations",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500",
    discount: "15%",
    isNewArrival: true,
  },
  {
    id: "new-arrival-102",
    name: "Premium Diamond Glitter",
    price: "$42.00",
    category: "Eye Makeup",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    discount: "20%",
    isNewArrival: true,
  },
  {
    id: "new-arrival-103",
    name: "Velvet Matte Foundation",
    price: "$55.00",
    category: "Foundations",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500",
    discount: "25%",
    isNewArrival: true,
  },
  {
    id: "new-arrival-104",
    name: "Trendy Denim Skirt",
    price: "$50.00",
    category: "Foundations",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKmvBNHBaa_9oqHj-pFYui2zZLszMUzObkEg&sl",
    discount: "20%",
    isNewArrival: true,
  },
];

const freshlyArrived = [
  {
    id: "freshly-201",
    name: "Rose Petal Lip Tint",
    price: "$32.00",
    category: "Lipsticks",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500",
    discount: "10%",
    isFreshlyArrived: true,
  },
  {
    id: "freshly-202",
    name: "Crystal Clear Mascara",
    price: "$28.00",
    category: "Eye Makeup",
    image:
      "https://www.maquibeauty.com/images/productos/bell-vegan-collagen-mascara-de-pestanas-voluminizadora-hypoallergenic-waterproof-1-76645.jpeg",
    discount: "12%",
    isFreshlyArrived: true,
  },
  {
    id: "freshly-203",
    name: "Glow Boost Serum",
    price: "$48.00",
    category: "Skincare",
    image:
      "https://of.nice-cdn.com/upload/image/product/large/default/101-c-glow-15-vitamin-c-serum-30-ml-593346-en.webp",
    discount: "18%",
    isFreshlyArrived: true,
  },
  {
    id: "freshly-204",
    name: "Classic Leather Boots",
    price: "$110.00",
    category: "Shoes & Sneakers",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBSRqfb5-sSpFteS6H-BKMz0WFNH4d2hWZvQ&s",
    discount: "10%",
    isFreshlyArrived: true,
  },
  {
    id: "freshly-205",
    name: "Elegant Silk Scarf",
    price: "$70.00",
    category: "Accessories",
    image:
      "https://media.neimanmarcus.com/f_auto,q_auto:low,ar_4:5,c_fill,dpr_2.0,w_790/01/nm_200737_100000_c",
    discount: "15%",
    isFreshlyArrived: true,
  },
];

const Beauty = () => {
  const [selectedCategory, setSelectedCategory] = useState("Lipsticks");
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const filteredProducts = productsData.filter(
    (item) => item.category === selectedCategory,
  );

  return (
    <div className="bg-[#faf6f5] min-h-screen py-0 md:py-8">
      {/* ដំណោះស្រាយលើ Mobile៖ ដក px ចេញទាំងអស់ ដើម្បីឱ្យ Card រត់ទៅបុកគែមឆ្វេងស្តាំពេញអេក្រង់ */}
      <div className="px-0 sm:px-4 max-w-7xl mx-auto">
        {/* TOP INTERACTIVE SECTION */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-3 md:gap-6">
          {/* SIDEBAR NAVIGATION (Categories) */}
          <div className="bg-white rounded-b-2xl md:rounded-2xl shadow-sm border-b border-rose-100 p-3 lg:p-5 h-fit">
            <h2 className="text-xs md:text-lg font-bold mb-2 md:mb-4 text-rose-950 tracking-wide block px-1">
              Beauty Categories
            </h2>
            <div className="flex lg:flex-col overflow-x-auto no-scrollbar gap-1.5 pb-1 lg:pb-0 scroll-smooth snap-x px-1">
              {categories.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(item)}
                  className={`snap-center shrink-0 text-center lg:text-left px-3 py-1.5 md:px-4 md:py-2.5 rounded-xl font-medium text-[11px] md:text-sm transition-all ${
                    selectedCategory === item
                      ? "bg-rose-900 text-white shadow-sm font-semibold"
                      : "text-rose-800 bg-rose-50/60 hover:bg-rose-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* HERO BANNER SECTION */}
          <div className="px-2 sm:px-0 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden min-h-[150px] md:min-h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1000"
                className="w-full h-full object-cover absolute inset-0"
                alt="Beauty Banner"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-rose-950/80 via-rose-900/40 to-transparent flex flex-col justify-center p-4 md:p-8 text-white z-10">
                <p className="text-[10px] md:text-xs font-semibold tracking-wider text-rose-200 uppercase">
                  Glow & Elegance
                </p>
                <h1 className="text-base md:text-4xl font-black mt-1 md:mt-2 leading-tight font-serif">
                  Reveal Your True Beauty <br /> With {selectedCategory}
                </h1>
                <button className="mt-2.5 md:mt-6 bg-white text-rose-950 hover:bg-rose-50 font-bold text-[10px] md:text-sm px-3 py-1.5 rounded-xl w-fit transition-colors shadow">
                  Shop Collection
                </button>
              </div>
            </div>

            {/* SIDE BANNER UTILITIES (លាក់លើ Mobile) */}
            <div className="hidden md:flex flex-col justify-between gap-4">
              <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[140px] group">
                <img
                  src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Trending"
                />
                <div className="absolute inset-0 bg-rose-950/40 text-white p-4 flex items-end">
                  <h4 className="font-bold text-base tracking-wide">
                    Trending Glam
                  </h4>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[140px] group">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Special Offer"
                />
                <div className="absolute inset-0 bg-rose-950/40 text-white p-4 flex items-end">
                  <h4 className="font-bold text-base tracking-wide">
                    Save up to 30%
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DYNAMIC PRODUCTS GRID (បុកគែមឆ្វេងស្តាំ និង gap-1 ធានាថាធំពេញអេក្រង់) */}
        <div className="mt-5 md:mt-12">
          <div className="flex justify-between items-center mb-2 md:mb-6 px-2 sm:px-0">
            <h2 className="text-sm md:text-2xl font-serif font-extrabold text-rose-950">
              {selectedCategory}
            </h2>
            <span className="text-[10px] md:text-sm text-rose-700 font-medium bg-rose-50 px-2 py-0.5 rounded-full">
              {filteredProducts.length} items
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-6">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-rose-50 overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow"
                >
                  <div className="relative overflow-hidden h-40 sm:h-48 md:h-64 bg-rose-50/50 flex items-center justify-center">
                    <img
                      src={item.image}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={item.name}
                    />
                  </div>
                  <div className="p-2 md:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-rose-900 text-[11px] md:text-base line-clamp-2 group-hover:text-rose-700 h-7 md:h-12 leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-rose-950 font-black text-xs md:text-xl mt-0.5">
                        {item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="mt-2 w-full bg-stone-900 hover:bg-stone-800 text-white py-1.5 md:py-2.5 rounded-lg font-medium transition-colors text-[11px] md:text-sm tracking-wide"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 text-center text-rose-300 border border-rose-100 text-[11px] md:text-base">
              No items available in this category at the moment.
            </div>
          )}
        </div>

        {/* BOTTOM PROMOTIONAL BANNERS */}
        <div className="mt-4 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 px-2 sm:px-0">
          <div className="relative rounded-xl overflow-hidden h-24 md:h-48 group">
            <img
              src="https://images.unsplash.com/photo-1515688594390-b649af70d282?w=800"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              alt="Promo 1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/90 via-rose-950/40 to-transparent text-white p-3 md:p-6 flex flex-col justify-end">
              <h3 className="text-xs md:text-2xl font-serif font-black">
                Summer Glow Lookbook
              </h3>
              <p className="text-[9px] md:text-xs text-rose-100 mt-0.5 line-clamp-1">
                Discover Radiant and sun-kissed aesthetics
              </p>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden h-24 md:h-48 group">
            <img
              src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              alt="Promo 2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/90 via-rose-950/40 to-transparent text-white p-3 md:p-6 flex flex-col justify-end">
              <h3 className="text-xs md:text-2xl font-serif font-black">
                100% Vegan & Cruelty-Free
              </h3>
              <p className="text-[9px] md:text-xs text-rose-100 mt-0.5 line-clamp-1">
                Kind to your skin, kind to the planet
              </p>
            </div>
          </div>
        </div>

        {/* NEW ARRIVALS SECTION */}
        <div className="mt-5 md:mt-14 mb-4 md:mb-8">
          <div className="flex justify-between items-center mb-2 md:mb-6 px-2 sm:px-0">
            <h2 className="text-sm md:text-2xl font-serif font-extrabold text-rose-950 flex items-center gap-1">
              ✨ New Arrivals
            </h2>
            <span className="text-[9px] md:text-sm font-semibold text-white bg-rose-900 px-2 py-0.5 rounded-full">
              Up to {Math.max(...newArrivals.map((p) => parseInt(p.discount)))}%
              OFF
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-6">
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
                  className="bg-white border border-rose-50 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300 relative"
                >
                  <div className="absolute top-1 right-1 z-10 bg-red-500 text-white px-1.5 py-0.5 rounded text-[8px] md:text-xs font-bold">
                    -{product.discount}
                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    className="no-underline text-inherit"
                  >
                    <div className="h-40 sm:h-48 md:h-56 overflow-hidden bg-rose-50/30 flex items-center justify-center">
                      <img
                        src={product.image}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        alt={product.name}
                      />
                    </div>
                    <div className="p-2 md:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-rose-900 text-[11px] md:text-sm line-clamp-2 h-7 md:h-10 leading-tight">
                          {product.name}
                        </h3>
                        <div className="mt-0.5 flex flex-wrap items-center gap-1 md:gap-2">
                          <span className="text-gray-400 line-through text-[9px] md:text-xs">
                            {product.price}
                          </span>
                          <span className="text-rose-900 font-black text-xs md:text-lg">
                            ${discountedPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="p-1.5 md:p-4 pt-0 grid gap-1">
                    <button
                      onClick={() =>
                        addToCart({ ...product, price: `$${discountedPrice}` })
                      }
                      className="w-full bg-rose-900 hover:bg-rose-800 text-white py-1.5 rounded-lg font-medium text-[11px] md:text-sm transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="w-full border border-stone-200 bg-white text-stone-900 py-1.5 rounded-lg font-medium text-[11px] md:text-sm transition-colors hover:bg-stone-100 line-clamp-1"
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
        <div className="mt-5 md:mt-14">
          <div className="flex justify-between items-center mb-2 md:mb-6 px-2 sm:px-0">
            <h2 className="text-sm md:text-2xl font-serif font-extrabold text-rose-950 flex items-center gap-1">
              🌸 Freshly Arrived
            </h2>
            <span className="text-[9px] md:text-sm font-semibold text-white bg-rose-700 px-2 py-0.5 rounded-full">
              Limited Stock
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-6">
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
                  className="bg-gradient-to-br from-rose-50 to-white border border-rose-100 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300 relative"
                >
                  <div className="absolute top-1 right-1 z-10 bg-amber-500 text-white px-1.5 py-0.5 rounded text-[8px] md:text-xs font-bold">
                    -{product.discount}
                  </div>

                  <div className="absolute top-1 left-1 z-10 bg-rose-600 text-white px-1 py-0.5 rounded text-[8px] md:text-xs font-bold">
                    FRESH
                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    className="no-underline text-inherit"
                  >
                    <div className="h-40 sm:h-48 md:h-56 overflow-hidden bg-rose-50/30 flex items-center justify-center mt-3">
                      <img
                        src={product.image}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        alt={product.name}
                      />
                    </div>
                    <div className="p-2 md:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-rose-900 text-[11px] md:text-sm line-clamp-2 h-7 md:h-10 leading-tight">
                          {product.name}
                        </h3>
                        <div className="mt-0.5 flex flex-wrap items-center gap-1 md:gap-2">
                          <span className="text-gray-400 line-through text-[9px] md:text-xs">
                            {product.price}
                          </span>
                          <span className="text-rose-900 font-black text-xs md:text-lg">
                            ${discountedPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="p-1.5 md:p-4 pt-0 grid gap-1">
                    <button
                      onClick={() =>
                        addToCart({ ...product, price: `$${discountedPrice}` })
                      }
                      className="w-full bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 text-white py-1.5 rounded-lg font-medium text-[11px] md:text-sm transition-all"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="w-full border border-stone-200 bg-white text-stone-900 py-1.5 rounded-lg font-medium text-[11px] md:text-sm transition-colors hover:bg-stone-100 line-clamp-1"
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

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Beauty;
