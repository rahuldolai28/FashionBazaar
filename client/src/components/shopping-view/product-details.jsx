import React from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function ProductDetailsDialog({ open, setOpen, productsDetails }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTitle className="hidden">
                {productsDetails?.title}
            </DialogTitle>
            <DialogContent className="grid grid-cols-2 lg:grid-cols-[300px_1fr]  gap-8 sm:p-12  max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] lg:max-h-[85vh]  ">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productsDetails?.image}
                        alt={productsDetails?.title}
                        className=" w-full object-cover lg:max-w-[50vw]  lg:max-h-[70vh]"
                    />
                </div>
                <div className="">
                    <h1 className="text-3xl font-extrabold">
                        {productsDetails?.title}
                    </h1>
                    <p className="text-muted-foreground text-2xl mb-4 mt-3 ">
                        {productsDetails?.description}
                    </p>
                    <div className="flex items-center gap-4 ">
                        {/*  justify-between  */}
                        {productsDetails?.salePrice > 0 ? (
                            <p className="text-3xl font-bold ">
                                ₹{productsDetails?.salePrice}
                            </p>
                        ) : null}
                        <p
                            className={`   ${
                                productsDetails?.salePrice > 0
                                    ? "text-muted-foreground text-2xl line-through"
                                    : "text-primary text-3xl font-bold "
                            } `}>
                            ₹{productsDetails?.price}{" "}
                        </p>
                    </div>
                    <div className="mt-3 mb-3 flex items-center justify-between  ">
                        {/* <Button className="w-[49%]  items-center bg-[#FF9F00] lg:text-xl lg:h-14
                          rounded-none focus:outline-none focus:border-none focus:ring-0 outline-none shadow-none "  >Add to cart</Button> */}
                        <Button
                            className="w-[49%] items-center bg-[#FF9F00] lg:text-xl lg:h-14 rounded-none 
                                 focus:outline-none focus:ring-0 focus:shadow-none border-none 
                                !outline-none !ring-0 !shadow-none">
                            Add to cart
                        </Button>
                        <Button className="w-[49%]  items-center bg-[#FB641B] lg:text-lg lg:h-14  rounded-none ">
                            Buy Now
                        </Button>
                    </div>
                    <Separator/>
                    <div className="max-h-[300px] overflow-auto" >
                        <h2 className="text-xl font-bold mb-4" > Reviews </h2>
                        <div className="grid gap-6" >
                            <Avatar className="w-10 h-10 border" >
                                <AvatarFallback>
                                    RD
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;
