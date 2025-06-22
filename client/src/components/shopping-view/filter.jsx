import React, { Fragment } from "react";
import { filterOptions } from "@/config/index";
import { Label } from "../ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

function ProductFilter() {
    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-extrabold"> Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {Object.keys(filterOptions).map((keyItem, index) => (
                    <Fragment key={keyItem}>
                        <div>
                            <h3 className="text-base font-bold">{keyItem}</h3>
                            <div className="grid gap-2 mt-2">
                                {filterOptions[keyItem].map((item) => (
                                    <Label
                                        key={item.id || item.value}
                                        className="flex items-center gap-2 font-medium ">
                                        <Checkbox />
                                        {item.label}
                                    </Label>
                                ))}
                            </div>
                        </div>
                        {index === 0 && <Separator />}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default ProductFilter;
