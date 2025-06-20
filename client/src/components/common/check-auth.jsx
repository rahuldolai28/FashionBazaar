// import { useLocation, Navigate } from "react-router-dom";

// import React from "react";

// function CheckAuth({ isAuthenticated, user, children }) {
//     const location = useLocation();

//     if (
//         !isAuthenticated &&
//         !(
//             location.pathname.includes("/login") ||
//             location.pathname.includes("/register")
//         )
//     ) {
//         // Redirect to login page if not authenticated
//         return <Navigate to="/auth/login" />;
//     }
//     if (
//         isAuthenticated &&
//         (location.pathname.includes("/login") ||
//             location.pathname.includes("/register"))
//     ) {
//         if (user?.role === "admin") {
//             // Redirect to admin dashboard if authenticated as admin
//             return <Navigate to="/admin/dashboard"  />;
//         }
//         // Redirect to shopping home if authenticated as user
//         else {
//             return <Navigate to="/shop/home"  />;
//         }
//     }
//     if (
//         isAuthenticated &&
//         user?.role !== "admin" &&
//         location.pathname.includes("admin")
//     ) {
//         return <Navigate to="/unauth-page"  />;
//     }
//     if (
//         isAuthenticated &&
//         user?.role === "admin" &&
//         location.pathname.includes("shop")
//     ) {
//         return <Navigate to="/admin/dashboard"  />;
//     }

//     return <>{children}</>;
// }

// export default CheckAuth;

import { useLocation, Navigate } from "react-router-dom";
import React from "react";

function CheckAuth({ isAuthenticated, isLoading, user, children }) {
    const location = useLocation();
    const isAuthPage =
        location.pathname.includes("/login") ||
        location.pathname.includes("/register");
    const isAdminPage = location.pathname.includes("/admin");
    const isShopPage = location.pathname.includes("/shop");

    if (isLoading) {
        return null; // prevent premature redirects
    }

    // Not authenticated and trying to access protected page
    if (!isAuthenticated && !isAuthPage) {
        return <Navigate to="/auth/login" replace />;
    }

    // Authenticated and trying to access login/register
    if (isAuthenticated && isAuthPage) {
        return user?.role === "admin" ? (
            <Navigate to="/admin/dashboard" replace />
        ) : (
            <Navigate to="/shop/home" replace />
        );
    }

    // Authenticated non-admin trying to access admin pages
    if (isAuthenticated && user?.role !== "admin" && isAdminPage) {
        return <Navigate to="/unauth-page" replace />;
    }

    // Admin trying to access shopping pages
    if (isAuthenticated && user?.role === "admin" && isShopPage) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <>{children}</>;
}

export default CheckAuth;
