import React from "react";
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

function MenuItems() {
    return (
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row ">
            {shoppingViewHeaderMenuItems.map((menuItem) => (
                <Link
                    key={menuItem.id}
                    to={menuItem.path}
                    className="text-sm font-medium">
                    {menuItem.label}
                </Link>
            ))}
        </nav>
    );
}

function HeaderRightContent() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleLogout() {
        dispatch(logoutUser());
    }
    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <div className="flex items-center lg:flex-row  gap-2 align-center  ">
                <Button className="" variant="outline" size="icon">
                    <ShoppingCart className="w-6 h-6  " />
                    <span className="sr-only"> User Cart</span>
                </Button>
                <span className="lg:hidden text-lg ">Cart</span>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-black">
                        <AvatarFallback className="bg-black text-white font-extrabold ">
                            {user?.username[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
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
        <header className="sticky top-0 z-40 w-full border-b bg-background">
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
                            <Menu />
                            <span className="sr-only">Toggle header menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs p-4 ">
                        <SheetTitle>Title Panel</SheetTitle>

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
