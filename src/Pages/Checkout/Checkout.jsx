import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "../../context/LanguageContext";
import abaImage from "../../assets/PaymentImages/ABA.jpg";
import wingImage from "../../assets/PaymentImages/Wing.jpg";

const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const {
    customer,
    cartDetails = [],
    subtotal = state.subtotal || 0,
    discountAmount = state.discountAmount || 0,
    effectiveShipping = state.effectiveShipping || 0,
    tax = state.tax || 0,
    totalFinal = state.totalFinal || 0,
    couponCode = "",
  } = state;

  const [paymentMethod, setPaymentMethod] = useState("script");
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    if (!customer || !cartDetails.length || !cartItems.length) {
      navigate("/cart", { replace: true });
    }
  }, [customer, cartDetails.length, cartItems.length, navigate]);

  const itemCountText = useMemo(() => {
    const count = cartDetails.reduce((sum, item) => sum + item.quantity, 0);
    return t("checkout.itemsCount", {
      count,
      plural: cartDetails.length === 1 ? "" : "s",
    });
  }, [cartDetails, t]);

  // ១. ត្រូវគណនា Subtotal មុនគេបង្អស់ដើម្បីទុកប្រើប្រាស់
  const fallbackSubtotal = useMemo(() => {
    if (subtotal > 0) return subtotal;
    return cartDetails.reduce((sum, i) => sum + (i.lineTotal || 0), 0);
  }, [cartDetails, subtotal]);

  // ២. គណនា Tax ដោយប្រើប្រាស់តម្លៃ subtotal ដែលមានស្រាប់ ឬ fallbackSubtotal
  const computedTax = useMemo(() => {
    if (tax > 0) return tax;
    // គណនា ១០% នៃតម្លៃទំនិញបន្ទាប់ពីដកការបញ្ចុះតម្លៃ
    return Math.max(0, (subtotal || fallbackSubtotal) - discountAmount) * 0.1;
  }, [tax, subtotal, fallbackSubtotal, discountAmount]);

  // ៣. គណនាតម្លៃសរុបចុងក្រោយ ដោយបូកបញ្ចូល computedTax ថ្មី
  const computedTotal = useMemo(() => {
    if (totalFinal > 0 && tax > 0) return totalFinal;
    return fallbackSubtotal - discountAmount + effectiveShipping + computedTax;
  }, [
    totalFinal,
    tax,
    fallbackSubtotal,
    discountAmount,
    effectiveShipping,
    computedTax,
  ]);

  const handleOrderNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate("/order", {
        state: {
          customer,
          couponCode,
          paymentMethod,
          totalFinal: computedTotal,
          orderNumber: Math.floor(100000 + Math.random() * 900000).toString(),
        },
      });
    }, 500);
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f8f8] py-8 md:py-20 text-gray-900">
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16 text-gray-900">
          {t("checkout.title")}
        </h1>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr] items-start">
          {/* ================= LEFT SIDE: SHIPPING & PAYMENT ================= */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8 shadow-sm text-gray-900">
            <h2 className="text-xl md:text-3xl font-semibold mb-6 text-gray-900">
              {t("checkout.shippingDetailsTitle")}
            </h2>

            {/* SHIPPING INFO CONTAINER */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-6 mb-6 text-gray-900">
              <p className="text-sm font-bold text-slate-800 mb-3">
                {t("checkout.shippingInfo")}
              </p>
              <div className="space-y-1.5 text-sm text-slate-700">
                <p>
                  <span className="font-medium">
                    {t("checkout.nameLabel")}:
                  </span>{" "}
                  {customer?.name || "-"}
                </p>
                <p>
                  <span className="font-medium">
                    {t("checkout.emailLabel")}:
                  </span>{" "}
                  {customer?.email || "-"}
                </p>
                <p>
                  <span className="font-medium">
                    {t("checkout.phoneLabel") || "Phone"}:
                  </span>{" "}
                  {customer?.phone || "-"}
                </p>
                <p>
                  <span className="font-medium">
                    {t("checkout.addressLabel") || "Address"}:
                  </span>{" "}
                  {customer?.address || "-"}
                </p>
                <p>
                  <span className="font-medium">
                    {t("checkout.couponLabel")}:
                  </span>{" "}
                  <span
                    className={
                      couponCode ? "text-emerald-600 font-semibold" : ""
                    }
                  >
                    {couponCode || t("checkout.noCoupon")}
                  </span>
                </p>
              </div>
            </div>

            {/* PAYMENT METHOD CONTAINER */}
            <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-6 text-gray-900">
              <p className="text-sm font-bold text-slate-800">
                {t("checkout.paymentMethod")}
              </p>

              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3">
                {[
                  { value: "script", label: t("checkout.payScript") },
                  { value: "aba", label: t("checkout.payABA") },
                  { value: "wing", label: t("checkout.payWing") },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 bg-white cursor-pointer transition-all ${
                      paymentMethod === option.value
                        ? "border-rose-500 ring-1 ring-rose-500"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.value}
                      checked={paymentMethod === option.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="text-sm font-medium text-slate-800">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>

              {/* DYNAMIC PAYMENT DETAILS */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6 text-gray-900">
                {paymentMethod === "script" ? (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">
                      {t("checkout.useVisaSample")}
                    </p>
                    <div className="grid gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-700">
                          {t("checkout.cardholderName")}
                        </label>
                        <input
                          type="text"
                          value="John Example"
                          readOnly
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 text-slate-800 font-medium focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-700">
                          {t("checkout.cardNumber")}
                        </label>
                        <input
                          type="text"
                          value="4111 1111 1111 1111"
                          readOnly
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 text-slate-800 font-medium focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-sm font-medium text-slate-700">
                            {t("checkout.expiration")}
                          </label>
                          <input
                            type="text"
                            value="12/26"
                            readOnly
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 text-slate-800 font-medium focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-sm font-medium text-slate-700">
                            {t("checkout.cvv")}
                          </label>
                          <input
                            type="text"
                            value="123"
                            readOnly
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 text-slate-800 font-medium focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 text-left w-full">
                      <p className="text-sm font-semibold text-rose-600 mb-1">
                        {paymentMethod.toUpperCase()} KHQR Payment
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {t("checkout.scanQr", {
                          method: paymentMethod.toUpperCase(),
                        })}
                      </p>
                      <div className="mt-3 text-xs md:text-sm text-slate-500 bg-slate-50 p-3 rounded-xl border">
                        {paymentMethod === "wing"
                          ? t("checkout.wingInfo")
                          : t("checkout.abaInfo")}
                      </div>
                    </div>
                    <div className="flex-shrink-0 rounded-2xl border border-slate-100 p-3 bg-white shadow-sm">
                      <img
                        src={paymentMethod === "wing" ? wingImage : abaImage}
                        alt={`${paymentMethod.toUpperCase()} payment QR`}
                        className="h-[200px] w-[200px] md:h-[220px] md:w-[220px] rounded-2xl object-cover bg-slate-50"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleOrderNow}
              disabled={isProcessing}
              className={`mt-8 w-full rounded-xl px-5 py-4 text-white font-bold text-lg active:scale-[0.99] transition-all shadow-md ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed shadow-none"
                  : "bg-rose-600 hover:bg-rose-700 shadow-rose-600/10"
              }`}
            >
              {isProcessing
                ? t("checkout.orderingNow") || "Processing..."
                : t("checkout.orderNow")}
            </button>
          </div>

          {/* ================= RIGHT SIDE: ORDER SUMMARY ================= */}
          <div className="space-y-6 w-full">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 space-y-4 text-gray-900 shadow-sm">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {t("checkout.orderSummary")}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 font-medium px-1 bg-slate-50 py-1 rounded-md w-fit">
                {itemCountText}
              </p>

              <div className="max-h-[280px] overflow-y-auto pr-1 space-y-4">
                {cartDetails.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 text-sm md:text-base truncate">
                        {item.name || item.title}
                      </p>
                      <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                        {t("checkout.qty")} {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-slate-900 text-sm md:text-base flex-shrink-0">
                      ${(item.lineTotal || 0).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* PRICING DETAILS */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3 text-gray-900 shadow-sm">
              <div className="flex justify-between text-sm text-slate-600">
                <span>{t("checkout.subtotal")}</span>
                <span className="font-medium text-gray-900">
                  ${fallbackSubtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-emerald-600">
                <span>{t("checkout.discount")}</span>
                <span className="font-medium">
                  -${discountAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>{t("checkout.deliveryFee")}</span>
                <span className="font-medium text-gray-900">
                  ${effectiveShipping.toFixed(2)}
                </span>
              </div>

              {/* កែប្រែត្រង់នេះ៖ យក computedTax មកបង្ហាញក្នុង UI */}
              <div className="flex justify-between text-sm text-slate-600">
                <span>{t("checkout.tax")}</span>
                <span className="font-medium text-gray-900">
                  ${computedTax.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between border-t border-slate-200 pt-4 text-lg font-bold text-gray-900">
                <span>{t("checkout.total")}</span>
                <span className="text-xl text-rose-600">
                  ${computedTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
