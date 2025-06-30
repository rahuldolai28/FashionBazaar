import { useState, useEffect } from "react";
import AuthLayout from "./components/auth/layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthRegister from "./pages/auth/register";
import AuthLogin from "./pages/auth/login";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";

// import Footer from "./components/public/footer";

import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";

import { useLocation } from "react-router-dom";

function App() {
    const { user, isAuthenticated, isLoading } = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    if (isLoading) return <Skeleton className="h-[200px] w-full bg-black " />;

    return (
        <div className="flex flex-col overflow-hidden bg-white text-black">
            {/* {common components} */}
            {!location.pathname.startsWith("/shop") && (
                <header className="bg-gray-800 text-white p-4
                bg-gradient-to-r from-[#1f0d00] via-[#2c1500] to-[#3e1900]">
                    <h1 className="text-2xl font-bold">FashionBazaar</h1>
                </header>
            )}

            <Routes>
                {/* Auth routes */}
                <Route
                    path="/auth"
                    element={
                        <CheckAuth
                            isLoading={isLoading}
                            isAuthenticated={isAuthenticated}
                            user={user}>
                            <AuthLayout />
                        </CheckAuth>
                    }>
                    <Route path="login" element={<AuthLogin />} />
                    <Route path="register" element={<AuthRegister />} />
                </Route>
                {/* Add admin routes here */}
                <Route
                    path="/admin"
                    element={
                        <CheckAuth
                            isLoading={isLoading}
                            isAuthenticated={isAuthenticated}
                            user={user}>
                            <AdminLayout />
                        </CheckAuth>
                    }>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="features" element={<AdminFeatures />} />
                    <Route path="*" element={<div>Page Not Found</div>} />
                </Route>
                {/* shopping routes */}
                {/* <Route path="/" element={<Navigate to="/shop/home" />} /> */}

                <Route
                    path="shop"
                    element={
                        <CheckAuth
                            isLoading={isLoading}
                            isAuthenticated={isAuthenticated}
                            user={user}>
                            <ShoppingLayout />
                        </CheckAuth>
                    }>
                    <Route path="home" element={<ShoppingHome />} />
                    <Route path="checkout" element={<ShoppingCheckout />} />
                    <Route path="listing" element={<ShoppingListing />} />
                    <Route path="account" element={<ShoppingAccount />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                
                <Route path="/unauth-page" element={<UnauthPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {/* <Footer/> */}
        </div>
    );
}

export default App;
