import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "../../context/LanguageContext";

const OrderSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const { customer, totalFinal, orderNumber } = state;

  useEffect(() => {
    if (!customer || !orderNumber) {
      navigate("/cart", { replace: true });
    }
  }, [customer, orderNumber, navigate]);

  return (
    <div className="w-full min-h-screen bg-[#f8f8f8] py-10 md:py-20 text-gray-900">
      <div className="max-w-[600px] mx-auto px-4">
        {/* កែប្រែ p-12 មកជា p-6 នៅលើ mobile និង md:p-12 លើកុំព្យូទ័រ */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-12 text-center shadow-sm text-gray-900">
          {/* SUCCESS ICON */}
          <div className="mx-auto mb-6 md:mb-8 inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-emerald-50 text-3xl md:text-4xl text-emerald-600 font-bold">
            ✓
          </div>

          {/* TITLE & MESSAGE */}
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900">
            {t("orderSuccess.title")}
          </h1>
          <p className="text-sm md:text-base text-slate-600 mb-6 max-w-sm mx-auto leading-relaxed">
            {t("orderSuccess.message")}
          </p>

          {/* ORDER DETAILS CONTAINER */}
          <div className="mx-auto mb-8 grid max-w-md gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left text-sm text-slate-700">
            <div className="flex justify-between items-center border-b border-slate-200/60 pb-2.5">
              <span className="text-slate-500">
                {t("orderSuccess.orderNumber")}
              </span>
              <span className="font-bold text-slate-900 bg-slate-200/50 px-2.5 py-0.5 rounded-md font-mono">
                {orderNumber}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-200/60 pb-2.5">
              <span className="text-slate-500">{t("orderSuccess.name")}</span>
              <span className="font-semibold text-slate-900 truncate max-w-[180px]">
                {customer?.name || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center pt-0.5">
              <span className="text-slate-500">{t("orderSuccess.total")}</span>
              <span className="font-bold text-lg text-rose-600">
                $
                {typeof totalFinal === "number"
                  ? totalFinal.toFixed(2)
                  : parseFloat(totalFinal || 0).toFixed(2)}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="w-full sm:w-auto rounded-full bg-rose-600 px-8 py-3.5 text-white font-semibold text-base transition-all hover:bg-rose-700 active:scale-[0.98] shadow-md shadow-rose-600/10"
          >
            {t("orderSuccess.continueShopping")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
