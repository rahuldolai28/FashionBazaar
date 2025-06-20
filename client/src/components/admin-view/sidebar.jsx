import React, { Fragment } from "react";
import { ShieldUser } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Container, ShoppingBasket } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";

const adminSidebarMenuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard />,
    },
    // {
    //     id: "users",
    //     label: "Users",
    //     path: "/admin/users",
    // },
    {
        id: "products",
        label: "Products",
        path: "/admin/products",
        icon: <ShoppingBasket />,
    },
    {
        id: "orders",
        label: "Orders",
        path: "/admin/orders",
        icon: <Container />,
    },
];

function MenuItems({ setOpen }) {
    const navigate = useNavigate();

    return (
        <nav className="mt-8 flex-col flex gap-2">
            {adminSidebarMenuItems.map((menuItem) => (
                <div
                    key={menuItem.id}
                    className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-base md:text-xl font-semibold
                     text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
                    onClick={() => {
                        navigate(menuItem.path);
                        if (setOpen) setOpen(false);
                    }}>
                    {menuItem.icon}
                    <span className="">{menuItem.label}</span>
                </div>
            ))}
        </nav>
    );
}

function AdminSidebar({ open, setOpen }) {
    const navigate = useNavigate();
    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-56  ">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                            <SheetTitle 
                            className="flex items-center gap-2 mt-5 mb-3 text-lg  font-semibold ">
                                <ShieldUser size={30} />
                                <span>Admin Panel</span>
                            </SheetTitle>
                            {/* ✅ Add this to fix the warning */}
                            {/* <SheetDescription id="admin-panel-desc">
                                Manage admin settings
                            </SheetDescription> */}
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>

            <aside className=" hidden w-64 flex-col bg-background border-r p-6 lg:flex">
                <div
                    className="flex cursor-pointer items-center gap-2 "
                    onClick={() => navigate("/admin/dashboard")}>
                    <ShieldUser size={30} />
                    <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    );
}

export default AdminSidebar;
