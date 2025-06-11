import { useState } from "react";
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

function App() {
    const isAuthenticated = false;
    // const user = {
    //     role: "admin", // or "admin"
    //     name: "John Doe",
    // };
    const user = null;

    return (
        <div className="flex flex-col overflow-hidden bg-white text-black">
            {/* {common components} */}
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold">FashionBazaar</h1>
            </header>
            <Routes>
                {/* Auth routes */}
                <Route
                    path="/auth"
                    element={
                        <CheckAuth
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
                <Route
                    path="shop"
                    element={
                        <CheckAuth
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
                <Route path="/unauth-page" element={<UnauthPage/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
