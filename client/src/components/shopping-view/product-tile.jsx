import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";

function ShoppingProductTile({ product }) {
    return (
        <Card className="w-full max-w-sm mx-auto overflow-hidden p-0 pb-4 rounded-sm gap-3 ">
            <div className="relative">
                <img
                    src={
                        product.image
                            ? product.image
                            : "https://www.insidestoreldn.com/cdn/shop/files/Loop-Wardrobe-HAYLoop-Stand-Wardrobe-Red-2---HAY_1024x1024.png?v=1707997470"
                    }
                    alt={product?.title}
                    className="w-full h-[350px] object-cover rounded-t-sm"
                />
                {product?.salePrice > 0 ? (
                    <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 ">
                        Sale
                    </Badge>
                ) : null}
            </div>
            <CardContent className="">
                <h2 className="text-2xl font-bold mb-1 text-left">{product?.title}</h2>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[16px] text-muted-foreground">
                        {product?.category?.charAt(0).toUpperCase() +
                            product?.category?.slice(1)}
                    </span>
                    <span className="text-[16px] text-muted-foreground">
                        {product?.brand?.charAt(0).toUpperCase() +
                            product?.brand?.slice(1)}
                    </span>
                </div>
                <div className="flex justify-between items-center ">
                    <span
                        className={`text-lg font-semibold text-primary ${
                            product?.salePrice > 0 ? "line-through" : ""
                        } `}>
                        ₹{product?.price.toLocaleString()}
                    </span>
                    {product?.salePrice > 0 ? (
                        <span className="text-lg font-semibold text-primary">
                            ₹{product?.salePrice.toLocaleString()}
                        </span>
                    ) : null}
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Add to Cart</Button>
            </CardFooter>
        </Card>
    );
}

export default ShoppingProductTile;
