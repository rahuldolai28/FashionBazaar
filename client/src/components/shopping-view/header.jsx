import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    HousePlug,
    Menu,
    ShoppingCart,
    CircleUserRound,
    LogOut,
} from "lucide-react";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "@/components/shopping-view/cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";

function MenuItems() {
    return (
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row ">
            {shoppingViewHeaderMenuItems.map((menuItem) => (
                <Link
                    key={menuItem.id}
                    to={menuItem.path}
                    className="text-base font-medium">
                    {menuItem.label}
                </Link>
            ))}
        </nav>
    );
}

function HeaderRightContent() {
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shoppingCart);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logoutUser());
    }

    useEffect(() => {
        dispatch(fetchCartItems(user?.id));
    }, [dispatch]);

    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <Sheet
                open={openCartSheet}
                onOpenChange={() => setOpenCartSheet(false)}>
                <Button
                    onClick={() => setOpenCartSheet(true)}
                    variant="ghost"
                    className="self-start justify-start !px-0 "
                    aria-label="Open cart">
                    {/* icon */}
                    <ShoppingCart className="!h-7 !w-7" />

                    {/* text visible only below lg */}
                    <span className="text-lg lg:hidden">Cart</span>
                </Button>
                <UserCartWrapper
                    cartItems={
                        cartItems &&
                        cartItems.items &&
                        cartItems.items.length > 0
                            ? cartItems.items
                            : []
                    }
                />
            </Sheet>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Avatar className="bg-black">
                            <AvatarFallback className="bg-black text-white font-extrabold">
                                {user?.username?.[0]?.toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-lg lg:hidden">Profile</span>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent side="right" className="w-56">
                    <DropdownMenuLabel>
                        Logged in as {user?.username}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => {
                            navigate("/shop/account");
                        }}>
                        <CircleUserRound className="mr-2 h-4 w-4" />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

function ShoppingHeader() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    console.log(user);

    return (
        <header className="fixed top-0 z-40 w-full border-b text-white
         bg-gradient-to-r from-[#1f0d00] via-[#2c1500] to-[#3e1900]
         md:sticky   ">
            <div className="flex h-16 items-center justify-between px-4 md:px-6 ">
                <Link to="/shop/home" className="flex gap-2 items-center ">
                    <HousePlug className="w-6 h-6" />
                    <span className="text-xl">FashionBazaar</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="lg:hidden">
                            <Menu className="text-black"
                             />
                            <span className="sr-only">Toggle header menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs p-4 ">
                        <SheetTitle>Title Panel</SheetTitle>
                        <SheetDescription>
                            Use this panel to navigate between categories like
                            Men, Women, Kids, and more.
                        </SheetDescription>
                        <MenuItems />
                        <HeaderRightContent />
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems />
                </div>
                <div className="hidden lg:block">
                    <HeaderRightContent />
                </div>
            </div>
        </header>
    );
}

export default ShoppingHeader;
