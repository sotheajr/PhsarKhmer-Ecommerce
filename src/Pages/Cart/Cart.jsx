import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "../../context/LanguageContext";

const Cart = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cartItems, increaseQty, decreaseQty, removeItem } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [couponFeedback, setCouponFeedback] = useState("");
  const [errors, setErrors] = useState({});

  const shippingFee = 5;
  const taxRate = 0.1;

  const cartDetails = useMemo(() => {
    return cartItems.map((item) => {
      const priceValue =
        typeof item.priceValue === "number"
          ? item.priceValue
          : typeof item.price === "string"
            ? parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0
            : item.price || 0;

      const discountPercent = item.discountPercent || 0;
      const discountedPrice =
        typeof item.discountedPrice === "number"
          ? item.discountedPrice
          : Math.round(
              (priceValue * (1 - discountPercent / 100) + Number.EPSILON) * 100,
            ) / 100;

      return {
        ...item,
        priceValue,
        discountedPrice,
        discountPercent,
        stock: item.stock ?? 10,
        lineTotal: discountedPrice * item.quantity,
      };
    });
  }, [cartItems]);

  const subtotal = useMemo(
    () => cartDetails.reduce((sum, i) => sum + i.lineTotal, 0),
    [cartDetails],
  );

  const discountAmount = useMemo(() => {
    // គណនាកូដបញ្ចុះតម្លៃដោយបំលែងជា អក្សរធំជានិច្ច
    const upperCode = couponCode.toUpperCase().trim();
    if (upperCode === "SAVE10") return subtotal * 0.1;
    if (upperCode === "OFF5") return 5;
    return 0;
  }, [couponCode, subtotal]);

  const effectiveShipping =
    couponCode.toUpperCase().trim() === "SHIPFREE" ? 0 : shippingFee;
  const tax = Math.max(0, subtotal - discountAmount) * taxRate;
  const totalFinal = subtotal - discountAmount + effectiveShipping + tax;

  const validate = () => {
    const e = {};
    if (cartDetails.length === 0) e.cart = t("cartPage.cartEmpty");
    if (!customer.name) e.name = t("cartPage.name") + " required";
    if (!customer.email) e.email = t("cartPage.email") + " required";
    if (!customer.phone) e.phone = t("cartPage.phone") + " required";
    if (!customer.address) e.address = t("cartPage.address") + " required";
    return e;
  };

  const startCheckout = () => {
    const e = validate();
    setErrors(e);

    if (Object.keys(e).length === 0) {
      navigate("/checkout", {
        state: {
          customer,
          cartDetails,
          subtotal,
          discountAmount,
          effectiveShipping,
          tax,
          totalFinal,
          couponCode,
        },
      });
    }
  };

  const handleInputChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (["SAVE10", "OFF5", "SHIPFREE"].includes(code)) {
      setCouponFeedback("Coupon applied!");
    } else {
      setCouponFeedback("Invalid coupon");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 md:py-16 text-gray-900">
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-900">
          {t("cartPage.title")}
        </h1>

        {/* ✅ MAIN LAYOUT */}
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 xl:gap-10 items-start">
          {/* ================= LEFT CART ================= */}
          <div className="w-full">
            {/* បិទមិនឲ្យបង្ហាញ Table Header លើ Mobile ព្រោះវានឹងបាំងជាន់គ្នា */}
            <div className="hidden md:grid grid-cols-4 mb-4 text-gray-500 font-semibold px-4">
              <p>{t("cartPage.product")}</p>
              <p className="text-center">{t("cartPage.qty")}</p>
              <p className="text-center">{t("cartPage.price")}</p>
              <p className="text-right">{t("cartPage.total")}</p>
            </div>

            {cartDetails.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">
                {t("cartPage.cartEmpty") || "Your cart is empty"}
              </div>
            ) : (
              cartDetails.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:grid md:grid-cols-4 bg-white p-4 md:p-5 mb-4 rounded-xl shadow-sm items-center gap-4 relative"
                >
                  {/* ១. ផ្នែករូបភាព និងឈ្មោះផលិតផល */}
                  <div className="flex items-center gap-4 w-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded flex-shrink-0 bg-gray-50"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("cartPage.stock", { stock: item.stock })}
                      </p>
                      {item.discountPercent > 0 && (
                        <p className="text-xs text-rose-600 font-semibold mt-0.5">
                          {t("cartPage.off", {
                            discount: item.discountPercent,
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ២. ផ្នែកប៊ូតុងបង្កើនបន្ថយចំនួន (រៀបចំស្អាតលើ Mobile) */}
                  <div className="flex items-center justify-between md:justify-center w-full md:w-auto border-t md:border-none pt-3 md:pt-0">
                    <span className="text-sm text-gray-500 md:hidden">
                      {t("cartPage.qty")}:
                    </span>
                    <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-lg border">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="text-lg font-bold text-gray-600 px-1 active:scale-95"
                      >
                        -
                      </button>
                      <span className="font-semibold text-gray-900 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="text-lg font-bold text-gray-600 px-1 active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* ៣. ផ្នែកតម្លៃ */}
                  <div className="flex items-center justify-between md:justify-center w-full md:w-auto border-t md:border-none pt-2 md:pt-0">
                    <span className="text-sm text-gray-500 md:hidden">
                      {t("cartPage.price")}:
                    </span>
                    <div className="text-right md:text-center">
                      {item.discountPercent > 0 ? (
                        <div>
                          <div className="text-xs text-gray-400 line-through">
                            ${item.priceValue.toFixed(2)}
                          </div>
                          <div className="font-bold text-rose-600">
                            ${item.discountedPrice.toFixed(2)}
                          </div>
                        </div>
                      ) : (
                        <p className="font-semibold text-gray-900">
                          ${item.priceValue.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ៤. ផ្នែកតម្លៃសរុបប្រចាំជួរ និងប៊ូតុងលុប */}
                  <div className="flex items-center justify-between md:justify-end w-full md:w-auto border-t md:border-none pt-2 md:pt-0">
                    <span className="text-sm text-gray-500 md:hidden">
                      {t("cartPage.total")}:
                    </span>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-gray-900">
                        ${item.lineTotal.toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-rose-600 p-1 md:relative absolute top-3 right-3"
                        aria-label="Remove item"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ================= RIGHT CHECKOUT SUMMARY ================= */}
          <div className="w-full bg-white p-5 md:p-6 rounded-2xl shadow-sm md:sticky md:top-24 text-gray-900 border border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-gray-900">
              {t("cartPage.checkout")}
            </h2>

            {/* SHIPPING FORM */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-800">
                {t("cartPage.shipping")}
              </h3>
              <div className="space-y-3">
                <input
                  placeholder={t("cartPage.name")}
                  className="w-full p-3 border rounded-xl bg-white text-gray-900 focus:outline-rose-500 placeholder-gray-400"
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                {errors.name && (
                  <p className="text-xs text-rose-600 px-1">{errors.name}</p>
                )}

                <input
                  type="email"
                  placeholder={t("cartPage.email")}
                  className="w-full p-3 border rounded-xl bg-white text-gray-900 focus:outline-rose-500 placeholder-gray-400"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {errors.email && (
                  <p className="text-xs text-rose-600 px-1">{errors.email}</p>
                )}

                <input
                  type="tel"
                  placeholder={t("cartPage.phone")}
                  className="w-full p-3 border rounded-xl bg-white text-gray-900 focus:outline-rose-500 placeholder-gray-400"
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                {errors.phone && (
                  <p className="text-xs text-rose-600 px-1">{errors.phone}</p>
                )}

                <textarea
                  placeholder={t("cartPage.address")}
                  rows={3}
                  className="w-full p-3 border rounded-xl bg-white text-gray-900 focus:outline-rose-500 placeholder-gray-400"
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
                {errors.address && (
                  <p className="text-xs text-rose-600 px-1">{errors.address}</p>
                )}
              </div>
            </div>

            {/* COUPON SECTION */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-800">
                {t("cartPage.coupon")}
              </h3>
              <div className="flex gap-2">
                <input
                  className="flex-1 p-3 border rounded-xl bg-white text-gray-900 focus:outline-rose-500 placeholder-gray-400"
                  placeholder={t("cartPage.coupon")}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-rose-600 text-white px-5 rounded-xl font-medium active:scale-95 transition-transform"
                >
                  {t("cartPage.apply")}
                </button>
              </div>
              {couponFeedback && (
                <p
                  className={`text-xs mt-1.5 font-medium px-1 ${couponFeedback.includes("Invalid") ? "text-rose-600" : "text-emerald-600"}`}
                >
                  {couponFeedback}
                </p>
              )}
            </div>

            {/* SUMMARY DETAILS */}
            <div className="border-t border-gray-100 pt-4 space-y-3 text-gray-600">
              <div className="flex justify-between">
                <span>{t("checkout.subtotal")}</span>
                <span className="font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-emerald-600">
                <span>{t("checkout.discount")}</span>
                <span className="font-medium">
                  -${discountAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>{t("cartPage.shipping")}</span>
                <span className="font-medium text-gray-900">
                  {effectiveShipping === 0
                    ? "Free"
                    : `$${effectiveShipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>{t("checkout.tax")}</span>
                <span className="font-medium text-gray-900">
                  ${tax.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between font-bold text-xl text-gray-900 border-t border-gray-100 pt-3">
                <span>{t("checkout.total")}</span>
                <span className="text-rose-600">${totalFinal.toFixed(2)}</span>
              </div>
            </div>

            {errors.cart && (
              <p className="text-sm text-rose-600 text-center mt-3 font-medium">
                {errors.cart}
              </p>
            )}

            <button
              onClick={startCheckout}
              className="w-full mt-5 bg-rose-600 text-white py-3.5 rounded-xl font-bold text-lg active:scale-[0.99] transition-transform shadow-md shadow-rose-600/10"
            >
              {t("cartPage.checkout")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
