import React from "react";
import { StarIcon } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { setProductDetails } from "@/store/shop/products-slice";

function ProductDetailsDialog({
    open,
    setOpen,
    productsDetails,
    handleAddToCart,
}) {
    const dispatch = useDispatch();

    function handleDialogClose() {
        setOpen(false);
        dispatch(setProductDetails()); 
    }

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogTitle className="hidden">
                {productsDetails?.title}
            </DialogTitle>
            <DialogDescription className="sr-only">
                products details description
            </DialogDescription>
            <DialogContent
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[300px_1fr]  gap-8 sm:p-12 max-w-[90vw]
                  sm:max-w-[80vw] lg:max-w-[70vw] max-h-[98vh] lg:max-h-[85vh]  overflow-y-auto md:overflow-y-hidden ">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productsDetails?.image}
                        alt={productsDetails?.title}
                        className=" w-full object-cover lg:max-w-[50vw]  lg:max-h-[70vh]"
                    />
                </div>
                <div className="">
                    <h1 className="  text-2xl md:text-3xl font-extrabold">
                        {productsDetails?.title}
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-2xl mb-2 md:mb-4 mt-3 ">
                        {productsDetails?.description}
                    </p>
                    <div className="flex items-center gap-4 ">
                        {/*  justify-between  */}
                        {productsDetails?.salePrice > 0 ? (
                            <p className="text-2xl md:text-3xl font-bold ">
                                ₹{productsDetails?.salePrice}
                            </p>
                        ) : null}
                        <p
                            className={`   ${
                                productsDetails?.salePrice > 0
                                    ? "text-muted-foreground text-xl md:text-2xl line-through"
                                    : "text-primary text-2xl md:text-3xl font-bold "
                            } `}>
                            ₹{productsDetails?.price}{" "}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                        </div>
                        <span className="text-muted-foreground">(4.5)</span>
                    </div>

                    <div className="mt-3 mb-3 flex items-center justify-between  ">
                        <Button
                            onClick={() =>
                                handleAddToCart(productsDetails?._id)
                            }
                            className="w-[49%] items-center bg-[#FF9F00] lg:text-xl lg:h-14 rounded-none 
                                 focus:outline-none focus:ring-0 focus:shadow-none border-none 
                                !outline-none !ring-0 !shadow-none">
                            Add to cart
                        </Button>
                        <Button className="w-[49%]  items-center bg-[#FB641B] lg:text-lg lg:h-14  rounded-none ">
                            Buy Now
                        </Button>
                    </div>
                    <Separator />
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className="text-xl font-bold mb-4"> Reviews </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="grid gap-1 mb-4">
                                <div className="flex items-center gap-5">
                                    <Avatar className="w-10 h-10 border">
                                        <AvatarFallback>RD</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1 ">
                                        <div className="flex items-center gap-2 font-bold ">
                                            <h3>Rahul Kumar</h3>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    This is an awesome product.
                                </p>
                            </div>

                            <div className="grid gap-1 mb-4">
                                <div className="flex items-center gap-5">
                                    <Avatar className="w-10 h-10 border">
                                        <AvatarFallback>RD</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1 ">
                                        <div className="flex items-center gap-2 font-bold ">
                                            <h3>Rahul Kumar</h3>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    This is an awesome product.
                                </p>
                            </div>

                            <div className="grid gap-1 mb-4">
                                <div className="flex items-center gap-5">
                                    <Avatar className="w-10 h-10 border">
                                        <AvatarFallback>RD</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1 ">
                                        <div className="flex items-center gap-2 font-bold ">
                                            <h3>Rahul Kumar</h3>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    This is an awesome product.
                                </p>
                            </div>

                            <div className="grid gap-1 mb-4">
                                <div className="flex items-center gap-5">
                                    <Avatar className="w-10 h-10 border">
                                        <AvatarFallback>RD</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1 ">
                                        <div className="flex items-center gap-2 font-bold ">
                                            <h3>Rahul Kumar</h3>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    This is an awesome product.
                                </p>
                            </div>

                            <div className="grid gap-1 mb-4">
                                <div className="flex items-center gap-5">
                                    <Avatar className="w-10 h-10 border">
                                        <AvatarFallback>RD</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1 ">
                                        <div className="flex items-center gap-2 font-bold ">
                                            <h3>Rahul Kumar</h3>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    This is an awesome product.
                                </p>
                            </div>

                            <div className="grid gap-1 mb-4">
                                <div className="flex items-center gap-5">
                                    <Avatar className="w-10 h-10 border">
                                        <AvatarFallback>RD</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1 ">
                                        <div className="flex items-center gap-2 font-bold ">
                                            <h3>Rahul Kumar</h3>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                            <StarIcon className="w-4 h-4 fill-primary" />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    This is an awesome product.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2 p-2 border-t  ">
                            <Input placeholder="Write a review..." />
                            <Button>Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;
