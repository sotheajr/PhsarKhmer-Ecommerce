import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlistItems");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Normalize product name for comparison
  const normalizeName = (name) => name?.toString().trim().toLowerCase();

  // ADD TO WISHLIST
  const addToWishlist = (product) => {
    // Use product id to determine uniqueness so items without `name` keys
    // (eg. products using `nameKey`) are handled correctly.
    const exist = wishlistItems.some((item) => item.id === product.id);

    if (!exist) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  // REMOVE FROM WISHLIST
  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId));
  };

  // CHECK IF PRODUCT IS IN WISHLIST
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  // TOGGLE WISHLIST
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
