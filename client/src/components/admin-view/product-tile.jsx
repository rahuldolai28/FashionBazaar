import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import placeholderImage from "@/assets/clothing-store.jpg";

function AdminProductTile({
    product,
    setOpenCreateProductDialog,
    setCurrentEditedId,
    setFormData,
    handleDelete,
}) {
    return (
        <Card className="w-full max-w-sm mx-auto  p-0 overflow-hidden pb-3">
            <div>
                <div className="relative">
                    <img
                        src={
                            product?.image ||
                            "https://res.cloudinary.com/dpsub2vjz/image/upload/v1750413621/lzzl7swtk8f8jgxxkj7z.jpg"
                        }
                        alt={product?.title}
                        loading="lazy"
                        className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                </div>
                <CardContent>
                    <h2 className="text-xl font-bold mb-2 mt-2 ">
                        {product?.title}
                    </h2>
                    <div className="flex justify-between items-center mb-2">
                        <span
                            className={`text-lg font-semibold text-primary ${
                                product?.salePrice > 0 ? "line-through" : ""
                            }`}>
                             ₹{product?.price.toLocaleString()}
                        </span>
                        {product?.salePrice > 0 ? (
                            <span className="text-lg font-bold">
                                 ₹{product?.salePrice.toLocaleString()}
                            </span>
                        ) : null}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Button
                        onClick={() => {
                            setOpenCreateProductDialog(true);
                            setCurrentEditedId(product?._id);
                            setFormData(product);
                        }}>
                        {" "}
                        Edit
                    </Button>
                    <Button
                        onClick={() => {
                            handleDelete(product?._id);
                        }}>
                        Delete
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}

export default AdminProductTile;
