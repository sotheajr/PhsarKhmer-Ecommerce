import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Navbar from "./../Components/Navbar/Navbar";
import Home from "../Pages/Home/Home";
import Auth from "../Pages/Auth/Auth";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Error from "../Pages/Error/Error";
import AuthCheck from "../AuthCheck/AuthCheck";
import Footer from "../Components/Footer/Footer";

import Shop from "../Pages/Shop/Shop";
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/Checkout/Checkout";
import OrderSuccess from "../Pages/Order/OrderSuccess";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";
import ProductPage from "../Pages/Product/ProductPage";
import About from "../Pages/About/About";
import UserProfile from "../Pages/User/UserProfile";
import Wishlist from "../Pages/Wishlist/Wishlist";

// ADMIN
import Dashboard from "../Pages/Admin/Dashboard";
import Products from "../Pages/Admin/Products";
import Users from "../Pages/Admin/Users";
import Categories from "../Pages/Admin/Categories";
import Brands from "../Pages/Admin/Brands";
import Features from "../Pages/Admin/Features";
import Delivery from "../Pages/Admin/Delivery";
import Orders from "../Pages/Admin/Orders";
import Messages from "../Pages/Admin/Messages";
import AdminProfile from "../Pages/Admin/AdminProfile";

import Vegetables from "../Pages/Page/Vegetable";
import Chair from "../Pages/Page/Chair";
import Clothes from "../Pages/Page/Clothes";
import Beauty from "../Pages/Page/Beauty";

const LayoutContent = () => {
  const location = useLocation();

  const adminPaths = [
    "/admin/dashboard",
    "/admin/products",
    "/admin/users",
    "/admin/categories",
    "/admin/brands",
    "/admin/features",
    "/admin/delivery",
    "/admin/orders",
    "/admin/messages",
    "/admin/AdminProfile",
  ];

  const hideLayout = adminPaths.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <AuthCheck>
              <Home />
            </AuthCheck>
          }
        />
        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <AuthCheck requiredRole="admin">
              <Dashboard />
            </AuthCheck>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AuthCheck requiredRole="admin">
              <Products />
            </AuthCheck>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AuthCheck requiredRole="admin">
              <Users />
            </AuthCheck>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AuthCheck requiredRole="admin">
              <Categories />
            </AuthCheck>
          }
        />
        <Route
          path="/admin/brands"
          element={
            <AuthCheck requiredRole="admin">
              <Brands />
            </AuthCheck>
          }
        />
        <Route
          path="/admin/features"
          element={
            <AuthCheck requiredRole="admin">
              <Features />
            </AuthCheck>
          }
        />
        <Route
          path="/admin/delivery"
          element={
            <AuthCheck requiredRole="admin">
              <Delivery />
            </AuthCheck>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AuthCheck requiredRole="admin">
              <Orders />
            </AuthCheck>
          }
        />
        {/* ✅ MESSAGES ROUTE */}
        <Route
          path="/admin/messages"
          element={
            <AuthCheck requiredRole="admin">
              <Messages />
            </AuthCheck>
          }
        />
        <Route
          path="/admin/AdminProfile"
          element={
            <AuthCheck requiredRole="admin">
              <AdminProfile />
            </AuthCheck>
          }
        />
        {/* USER ROUTES */}
        <Route
          path="/shop"
          element={
            <AuthCheck>
              <Shop />
            </AuthCheck>
          }
        />
        <Route
          path="/product/:id"
          element={
            <AuthCheck>
              <ProductDetail />
            </AuthCheck>
          }
        />
        <Route
          path="/products"
          element={
            <AuthCheck>
              <ProductPage />
            </AuthCheck>
          }
        />
        <Route
          path="/cart"
          element={
            <AuthCheck>
              <Cart />
            </AuthCheck>
          }
        />
        <Route
          path="/wishlist"
          element={
            <AuthCheck>
              <Wishlist />
            </AuthCheck>
          }
        />
        <Route
          path="/checkout"
          element={
            <AuthCheck>
              <Checkout />
            </AuthCheck>
          }
        />
        <Route
          path="/order"
          element={
            <AuthCheck>
              <OrderSuccess />
            </AuthCheck>
          }
        />
        <Route
          path="/about"
          element={
            <AuthCheck>
              <About />
            </AuthCheck>
          }
        />
        <Route
          path="/Pages/user"
          element={
            <AuthCheck>
              <UserProfile />
            </AuthCheck>
          }
        />
        <Route
          path="/category/chair"
          element={
            <AuthCheck>
              <Chair />
            </AuthCheck>
          }
        />

        <Route
          path="/category/vegetable"
          element={
            <AuthCheck>
              <Vegetables />
            </AuthCheck>
          }
        />
        <Route
          path="/category/clothes"
          element={
            <AuthCheck>
              <Clothes />
            </AuthCheck>
          }
        />
        <Route
          path="/category/beauty"
          element={
            <AuthCheck>
              <Beauty />
            </AuthCheck>
          }
        />
        {/* AUTH */}
        <Route path="auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* 404 */}
        <Route path="*" element={<Error />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

const MainLayout = () => {
  return (
    <BrowserRouter>
      <LayoutContent />
    </BrowserRouter>
  );
};

export default MainLayout;
