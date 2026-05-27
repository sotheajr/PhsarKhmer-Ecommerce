import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const categories = [
  "Men's Wear",
  "Women's Wear",
  "Kids' Collection",
  "Shoes & Sneakers",
  "Accessories",
];

const productsData = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    price: "$45",
    category: "Men's Wear",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500",
  },
  {
    id: 2,
    name: "Minimalist White Hoodie",
    price: "$35",
    category: "Men's Wear",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500",
  },
  {
    id: 3,
    name: "Slim Fit Chino Pants",
    price: "$30",
    category: "Men's Wear",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
  },
  {
    id: 4,
    name: "Casual Cargo Shorts",
    price: "$32.00",
    category: "Men's Wear",
    image:
      "https://img.kwcdn.com/product/fancy/ceb2454b-55df-445d-9cff-2f46c6505d12.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp",
  },
  {
    id: 5,
    name: "Elegant Summer Dress",
    price: "$55",
    category: "Women's Wear",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
  },
  {
    id: 6,
    name: "Oversized Knit Sweater",
    price: "$40",
    category: "Women's Wear",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500",
  },
  {
    id: 7,
    name: "High-Waisted Jeans",
    price: "$42",
    category: "Women's Wear",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
  },
  {
    id: 8,
    name: "Kids Denim Overalls",
    price: "$28",
    category: "Kids' Collection",
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500",
  },
  {
    id: 9,
    name: "Cotton T-Shirt Pack",
    price: "$18",
    category: "Kids' Collection",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500",
  },
  {
    id: 10,
    name: "Retro Running Sneakers",
    price: "$85",
    category: "Shoes & Sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: 11,
    name: "Classic Leather Boots",
    price: "$110",
    category: "Shoes & Sneakers",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500",
  },
  {
    id: 12,
    name: "Polarized Sunglasses",
    price: "$25",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
  },
  {
    id: 13,
    name: "Minimalist Leather Watch",
    price: "$95",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
  {
    id: 14,
    name: "Floral Maxi Dress",
    price: "$58.00",
    category: "Women's Wear",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
  },
  {
    id: 15,
    name: "Blue Kids Girls Navratri Collection",
    price: "$25.00",
    category: "Kids' Collection",
    image:
      "https://www.fabfunda.com/product-img/blue-kids-girls-navratri-col-1726147013.jpeg",
  },
  {
    id: 16,
    name: "Summer Striped Shorts",
    price: "$22.00",
    category: "Kids' Collection",
    image:
      "https://cdn.shopify.com/s/files/1/2337/7003/files/20260108133430-4d6a9ba0bfaa415b-media_image-bfadf5ae655347a2b730f480c2608862.jpg?width=280",
  },
  {
    id: 17,
    name: "Classic Leather Boots",
    price: "$110",
    category: "Shoes & Sneakers",
    image:
      "https://www.williamsshoes.com.au/media/wysiwyg/WIL3926_WEB_CATEGORY_318X418_MW.jpg?auto=webp&width=3840&quality=85",
  },
  {
    id: 18,
    name: "Elegant Evening Gown",
    price: "$120.00",
    category: "Shoes & Sneakers",
    image:
      "https://stylestryproductionwls47sou4z.cdn.e2enetworks.net/images/products/medium/af4019b895554cfcaa3399a7ad02e5a090a2143e.webp",
  },
];

const newArrivals = [
  {
    id: "new-arrival-101",
    name: "Premium Cotton Hoodie",
    price: "$65.00",
    category: "Men's Wear",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500",
    discount: "25%",
    isNewArrival: true,
  },
  {
    id: "new-arrival-102",
    name: "Designer Casual Jacket",
    price: "$85.00",
    category: "Men's Wear",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500",
    discount: "30%",
    isNewArrival: true,
  },
  {
    id: "new-arrival-103",
    name: "Elegant Summer Dress",
    price: "$95.00",
    category: "Women's Wear",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    discount: "28%",
    isNewArrival: true,
  },
  {
    id: "new-arrival-104",
    name: "Trendy Denim Skirt",
    price: "$50.00",
    category: "Women's Wear",
    image:
      "https://files.cdn.printful.com/o/upload/variant-image-jpg/10/1074f1636b3fb830679c0872256755a3_l",
    discount: "20%",
    isNewArrival: true,
  },
];

const freshlyArrived = [
  {
    id: "freshly-201",
    name: "Comfortable Chino Pants",
    price: "$55.00",
    category: "Men's Wear",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
    discount: "12%",
    isFreshlyArrived: true,
  },
  {
    id: "freshly-202",
    name: "Trendy Oversized Sweater",
    price: "$75.00",
    category: "Women's Wear",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500",
    discount: "15%",
    isFreshlyArrived: true,
  },
  {
    id: "freshly-203",
    name: "Stylish Kids Denim Overalls",
    price: "$45.00",
    category: "Kids' Collection",
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500",
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
];

const Clothes = () => {
  const [selectedCategory, setSelectedCategory] = useState("Men's Wear");
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const filteredProducts = productsData.filter(
    (item) => item.category === selectedCategory,
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-4 md:py-8">
      <div className="w-full max-w-[1400px] mx-auto px-2 md:px-4">
        {/* TOP INTERACTIVE SECTION */}
        <div className="grid grid-cols-4 gap-3 md:gap-6">
          {/* SIDEBAR NAVIGATION */}
          <div className="col-span-1 bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-2 md:p-5 h-fit">
            <h2 className="text-xs md:text-lg font-bold mb-2 md:mb-4 text-gray-800 truncate">
              Categories
            </h2>
            <ul className="space-y-1 md:space-y-2">
              {categories.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => setSelectedCategory(item)}
                    className={`block w-full text-left px-2 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl text-[10px] md:text-base font-medium transition-colors truncate ${
                      selectedCategory === item
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* HERO BANNER SECTION */}
          <div className="col-span-3 grid grid-cols-3 gap-3 md:gap-6">
            <div className="col-span-2 relative rounded-xl md:rounded-2xl overflow-hidden min-h-[120px] md:min-h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000"
                className="w-full h-full object-cover absolute inset-0"
                alt="Fashion Banner"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 flex flex-col justify-center p-3 md:p-8 text-white z-10">
                <p className="text-[8px] md:text-sm font-semibold tracking-wider text-amber-400 uppercase">
                  New Season Arrival
                </p>
                <h1 className="text-xs md:text-4xl font-black mt-1 md:mt-2 leading-tight">
                  Elevate Your Style <br /> With{" "}
                  <span className="block md:inline truncate">
                    {selectedCategory}
                  </span>
                </h1>
                <button className="mt-2 md:mt-6 bg-white text-black hover:bg-gray-100 font-bold px-2 py-1 md:px-6 md:py-3 rounded-md md:rounded-xl text-[9px] md:text-base w-fit transition-colors shadow">
                  Explore
                </button>
              </div>
            </div>

            {/* SIDE BANNER UTILITIES */}
            <div className="col-span-1 space-y-2 md:space-y-4 flex flex-col justify-between">
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden flex-1 min-h-[55px] md:min-h-[150px] group">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Trending"
                />
                <div className="absolute inset-0 bg-black/40 text-white p-1.5 md:p-4 flex items-end">
                  <h4 className="font-bold text-[9px] md:text-lg truncate">
                    Trending Now
                  </h4>
                </div>
              </div>

              <div className="relative rounded-xl md:rounded-2xl overflow-hidden flex-1 min-h-[55px] md:min-h-[150px] group">
                <img
                  src="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=500"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Clearance"
                />
                <div className="absolute inset-0 bg-black/40 text-white p-1.5 md:p-4 flex items-end">
                  <h4 className="font-bold text-[9px] md:text-lg truncate">
                    Up to 50% Off
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DYNAMIC PRODUCTS GRID */}
        <div className="mt-6 md:mt-12">
          <div className="flex justify-between items-center mb-3 md:mb-6">
            <h2 className="text-sm md:text-2xl font-extrabold text-gray-900">
              {selectedCategory}
            </h2>
            <span className="text-[10px] md:text-sm text-gray-500 font-medium">
              {filteredProducts.length} items
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            /* កែសម្រួលត្រង់នេះ៖ grid-cols-2 នៅលើ Mobile និង md:grid-cols-4 នៅលើ Desktop */
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow"
                >
                  <div className="relative overflow-hidden h-32 sm:h-40 md:h-64 bg-gray-100">
                    <img
                      src={item.image}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={item.name}
                    />
                  </div>
                  <div className="p-2 md:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-[11px] md:text-base line-clamp-1 group-hover:text-black">
                        {item.name}
                      </h3>
                      <p className="text-gray-900 font-black text-xs md:text-xl mt-0.5 md:mt-1">
                        {item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="mt-2 w-full bg-black hover:bg-gray-800 text-white py-1.5 md:py-2.5 rounded-lg md:rounded-xl font-medium transition-colors text-[10px] md:text-sm tracking-wide"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 md:p-12 rounded-xl md:rounded-2xl text-center text-xs md:text-base text-gray-400 border border-gray-100">
              No items available.
            </div>
          )}
        </div>

        {/* BOTTOM PROMOTIONAL BANNERS */}
        <div className="mt-6 md:mt-12 grid grid-cols-2 gap-3 md:gap-6">
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden h-24 md:h-48 group">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              alt="Promo 1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-3 md:p-6 flex flex-col justify-end">
              <h3 className="text-xs md:text-2xl font-black truncate">
                Streetwear Lookbook
              </h3>
              <p className="text-[8px] md:text-sm text-gray-200 mt-0.5 md:mt-1 line-clamp-1">
                Discover everyday urban aesthetics
              </p>
            </div>
          </div>

          <div className="relative rounded-xl md:rounded-2xl overflow-hidden h-24 md:h-48 group">
            <img
              src="https://t4.ftcdn.net/jpg/06/06/08/59/360_F_606085957_m7lE4bgggPgS8q3IzKcT6bTTIlx5Dy6U.jpg"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              alt="Promo 2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-3 md:p-6 flex flex-col justify-end">
              <h3 className="text-xs md:text-2xl font-black truncate">
                Sustainable Fashion
              </h3>
              <p className="text-[8px] md:text-sm text-gray-200 mt-0.5 md:mt-1 line-clamp-1">
                Crafted from 100% organic cotton
              </p>
            </div>
          </div>
        </div>

        {/* NEW ARRIVALS SECTION */}
        <div className="mt-8 md:mt-14 mb-4 md:mb-8">
          <div className="flex justify-between items-center mb-3 md:mb-6">
            <h2 className="text-sm md:text-2xl font-extrabold text-gray-900 flex items-center gap-1 md:gap-2">
              ✨ New Arrivals
            </h2>
            <span className="text-[9px] md:text-sm font-semibold text-white bg-black px-2 py-0.5 md:px-3 md:py-1 rounded-full">
              Up to {Math.max(...newArrivals.map((p) => parseInt(p.discount)))}%
              OFF
            </span>
          </div>

          {/* កែសម្រួល៖ grid-cols-2 លើ Mobile និង md:grid-cols-4 លើ Desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
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
                  className="bg-white rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300 relative"
                >
                  <div className="absolute top-1 right-1 md:top-3 md:right-3 z-10 bg-red-500 text-white px-1.5 py-0.5 rounded-md text-[8px] md:text-xs font-bold">
                    -{product.discount}
                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    className="no-underline text-inherit"
                  >
                    <div className="h-32 sm:h-36 md:h-56 overflow-hidden bg-gray-50 flex items-center justify-center">
                      <img
                        src={product.image}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        alt={product.name}
                      />
                    </div>
                    <div className="p-2 md:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-[11px] md:text-sm line-clamp-1">
                          {product.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-1 md:gap-2">
                          <span className="text-gray-400 line-through text-[9px] md:text-sm">
                            {product.price}
                          </span>
                          <span className="text-gray-900 font-black text-xs md:text-lg">
                            ${discountedPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="p-2 md:p-4 grid grid-cols-2 gap-1">
                    <button
                      onClick={() =>
                        addToCart({ ...product, price: `$${discountedPrice}` })
                      }
                      className="w-full bg-black hover:bg-gray-800 text-white py-1.5 rounded-md md:rounded-lg font-medium text-[10px] md:text-sm transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="w-full border border-gray-200 bg-white text-gray-900 py-1.5 rounded-md md:rounded-lg font-medium text-[10px] md:text-sm transition-colors hover:bg-gray-50 truncate"
                    >
                      {isInWishlist(product.id) ? "Remove" : "Wish"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FRESHLY ARRIVED SECTION */}
        <div className="mt-8 md:mt-14">
          <div className="flex justify-between items-center mb-3 md:mb-6">
            <h2 className="text-sm md:text-2xl font-extrabold text-gray-900 flex items-center gap-1 md:gap-2">
              🌸 Freshly Arrived
            </h2>
            <span className="text-[9px] md:text-sm font-semibold text-white bg-gray-600 px-2 py-0.5 md:px-3 md:py-1 rounded-full">
              Limited
            </span>
          </div>

          {/* កែសម្រួល៖ grid-cols-2 លើ Mobile និង md:grid-cols-4 លើ Desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
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
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300 relative"
                >
                  <div className="absolute top-1 right-1 md:top-3 md:right-3 z-10 bg-amber-500 text-white px-1.5 py-0.5 rounded-md text-[8px] md:text-xs font-bold">
                    -{product.discount}
                  </div>

                  <div className="absolute top-1 left-1 z-10 bg-gray-700 text-white px-1.5 rounded text-[8px] font-bold md:top-3 md:left-3 md:px-2 md:py-0.5 md:text-xs">
                    FRESH
                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    className="no-underline text-inherit"
                  >
                    <div className="h-32 sm:h-36 md:h-56 overflow-hidden bg-gray-50 flex items-center justify-center mt-4 md:mt-6">
                      <img
                        src={product.image}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        alt={product.name}
                      />
                    </div>
                    <div className="p-2 md:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-[11px] md:text-sm line-clamp-1">
                          {product.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-1 md:gap-2">
                          <span className="text-gray-400 line-through text-[9px] md:text-sm">
                            {product.price}
                          </span>
                          <span className="text-gray-900 font-black text-xs md:text-lg">
                            ${discountedPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="p-2 md:p-4 grid grid-cols-2 gap-1">
                    <button
                      onClick={() =>
                        addToCart({ ...product, price: `$${discountedPrice}` })
                      }
                      className="w-full bg-gradient-to-r from-gray-700 to-black text-white py-1.5 rounded-md md:rounded-lg font-medium text-[10px] md:text-sm transition-all"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="w-full border border-gray-200 bg-white text-gray-900 py-1.5 rounded-md md:rounded-lg font-medium text-[10px] md:text-sm transition-colors hover:bg-gray-50 truncate"
                    >
                      {isInWishlist(product.id) ? "Remove" : "Wish"}
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

export default Clothes;
