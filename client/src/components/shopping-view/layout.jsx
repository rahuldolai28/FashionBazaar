import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header.jsx";

function ShoppingLayout() {
    return (
        <div className="flex flex-col bg-white ">
            {/* common header */}
                <div className="fixed w-full top-0 z-50  " >
                    <ShoppingHeader></ShoppingHeader>
                </div>
                <main className="flex flex-col w-full pt-16 ">
                    <Outlet></Outlet>
                </main>
        </div>
    );
}

export default ShoppingLayout;
