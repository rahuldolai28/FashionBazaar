import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItem } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    function handleCartItemDelete(getCartItem) {
        dispatch(
            deleteCartItem({
                userId: user?.id,
                productId: getCartItem?.productId,
            })
        );
    }

    function handleUpdateQuantity(cartItem, type) {
        dispatch(
            updateCartItem({
                userId: user?.id,
                productId: cartItem?.productId,
                quantity:
                    type === "plus"
                        ? cartItem?.quantity + 1
                        : cartItem?.quantity - 1,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                toast.success("Cart items updated successfully");
            }
        });
    }

    return (
        <div className="flex items-center space-x-4  ">
            <img
                src={cartItem?.image}
                alt={cartItem?.title}
                className="w-20 h-20 rounded object-cover"
            />
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItem?.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <Button
                        onClick={() => handleUpdateQuantity(cartItem, "minus")}
                        disabled={cartItem?.quantity ===1}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full">
                        <Minus className="w-6 h-6" />
                        <span className="sr-only"> Decrease</span>
                    </Button>
                    <span className="font-semibold">{cartItem?.quantity}</span>
                    <Button
                        onClick={() => handleUpdateQuantity(cartItem, "plus")}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full">
                        <Plus className="w-6 h-6" />
                        <span className="sr-only"> Increase</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold">
                    ₹
                    {(
                        (cartItem?.salePrice > 0
                            ? cartItem.salePrice
                            : cartItem?.price) * cartItem?.quantity
                    ).toLocaleString()}
                </p>
                <Trash
                    onClick={() => handleCartItemDelete(cartItem)}
                    className="cursor-pointer mt-1 "
                    size={20}
                />
            </div>
        </div>
    );
}

export default UserCartItemsContent;
