import React from "react";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";

function UserCartWrapper({ cartItems }) {
    const totalCartAmount =
        cartItems && cartItems.length > 0
            ? cartItems.reduce(
                  (sum, currentItem) =>
                      sum +
                      (currentItem?.salePrice > 0
                          ? currentItem?.salePrice
                          : currentItem?.price) *
                          currentItem?.quantity,
                  0
              )
            : 0;

    return (
        <SheetContent className=" w-full sm:max-w-md p-4">
            <SheetHeader>
                <SheetTitle className="text-3xl">Your Cart</SheetTitle>
                <SheetDescription>
                    You can view and edit the items you want to purchase.
                </SheetDescription>
            </SheetHeader>
            <div className="mt-5 space-y-5 overflow-y-auto pr-3 ">
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <UserCartItemsContent
                            key={item?.productId || index}
                            cartItem={item}
                        />
                    ))
                ) : (
                    <div>Your cart is empty</div>
                )}
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold ">Total</span>
                    <span className="font-bold ">₹{totalCartAmount.toLocaleString()}</span>
                </div>
            </div>
            <SheetFooter>
                <Button className="mt-6 w-full">Checkout</Button>
                <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    );
}

export default UserCartWrapper;
