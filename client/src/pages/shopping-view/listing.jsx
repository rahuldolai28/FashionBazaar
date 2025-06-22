import React, { useEffect } from "react";
import ProductFilter from "@/components/shopping-view/filter";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";

function ShoppingListing() {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.shoppingProducts);

    //fetch list of products
    useEffect(() => {
        dispatch(fetchAllFilteredProducts());
    }, [dispatch]);

    console.log(products);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-1 md:p-6">
            <ProductFilter />
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between ">
                    <h2 className="text-lg font-extrabold"> All Products </h2>
                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">
                            {products.length} products
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center gap-1">
                                    <ArrowUpDownIcon className="h-4 w-4" />
                                    <span>Sort by</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-[200px]">
                                <DropdownMenuRadioGroup>
                                    {sortOptions.map((option, index) => (
                                        <DropdownMenuRadioItem key={option.id}>
                                            {option.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-2 lg:p-0">
                    {products && products.length > 0
                        ? products.map((productItem, index) => (
                              <ShoppingProductTile
                                  key={index}
                                  product={productItem}
                              />
                          ))
                        : "No Products Available "}
                </div>
            </div>
        </div>
    );
}

export default ShoppingListing;
