import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART
  const normalizeName = (name) => name?.toString().trim().toLowerCase();

  const addToCart = (product) => {
    const productName = normalizeName(product.name);
    const exist = cartItems.find(
      (item) => normalizeName(item.name) === productName,
    );

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          normalizeName(item.name) === productName
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );
    } else {
      // determine numeric price
      const priceValue =
        typeof product.price === "string"
          ? parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0
          : product.price || 0;

      // default discounts: new arrivals 10%, freshly arrived 5%
      let discountPercent = 0;
      if (typeof product.id === "string") {
        if (product.id.startsWith("new-arrival")) discountPercent = 10;
        if (product.id.startsWith("freshly")) discountPercent = 5;
      }

      const discountedPrice =
        Math.round(
          (priceValue * (1 - discountPercent / 100) + Number.EPSILON) * 100,
        ) / 100;

      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
          priceValue,
          discountPercent,
          discountedPrice,
        },
      ]);
    }
  };

  // INCREASE
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  // DECREASE
  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      ),
    );
  };

  // REMOVE
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // COUNT
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // TOTAL
  const totalPrice = cartItems.reduce((total, item) => {
    // Prefer discountedPrice when present, otherwise parse item.price
    const unit =
      typeof item.discountedPrice === "number"
        ? item.discountedPrice
        : typeof item.price === "string"
          ? parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0
          : item.price || 0;
    return total + (isNaN(unit) ? 0 : unit * item.quantity);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
