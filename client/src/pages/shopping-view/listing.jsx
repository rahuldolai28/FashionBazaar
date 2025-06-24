import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { createSearchParams, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(",");
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        }
    }
    return queryParams.join("&");
}

function ShoppingListing() {
    const dispatch = useDispatch();
    const { products } = useSelector(
        (state) => state.shoppingProducts,
        shallowEqual
    );
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    function handleSort(value) {
        setSort(value);
    }

    function handleFilter(getSectionId, getCurrentOption) {
        console.log(getSectionId, getCurrentOption);

        let copyFilters = { ...filters }; // safe shallow copy
        console.log("copy", copyFilters);

        const indexOfCurrentSection =
            Object.keys(copyFilters).indexOf(getSectionId);
        console.log(indexOfCurrentSection);
        if (indexOfCurrentSection === -1) {
            copyFilters = {
                ...copyFilters,
                [getSectionId]: [getCurrentOption],
            };
        } else {
            const indexOfCurrentOption =
                copyFilters[getSectionId].indexOf(getCurrentOption);
            if (indexOfCurrentOption === -1) {
                copyFilters[getSectionId].push(getCurrentOption);
            } else copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }
        console.log(getSectionId, getCurrentOption);
        setFilters(copyFilters);
        sessionStorage.setItem("filters", JSON.stringify(copyFilters));
        console.log(copyFilters);
    }

    useEffect(() => {
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
    }, []);

    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString));
        }
    }, [filters]);

    //fetch list of products
    useEffect(() => {
        if (filters !== null && sort !== null) {
            // Convert filter keys to lowercase before sending to backend
            const lowerCaseFilters = {};
            Object.keys(filters).forEach((key) => {
                lowerCaseFilters[key.toLowerCase()] = filters[key];
            });
            dispatch(
                fetchAllFilteredProducts({
                    filterParams: lowerCaseFilters,
                    sortParams: sort,
                })
            );
        }
    }, [dispatch, sort, filters]);

    console.log(searchParams);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-1 md:p-6">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
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
                                <DropdownMenuRadioGroup
                                    value={sort}
                                    onValueChange={handleSort}>
                                    {sortOptions.map((sortItem, index) => (
                                        <DropdownMenuRadioItem
                                            key={sortItem.id}
                                            value={sortItem.id}>
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-2 lg:p-0">
                    {products && products.length > 0
                        ? products.map((productItem) => (
                              <ShoppingProductTile
                                  key={productItem._id}
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
