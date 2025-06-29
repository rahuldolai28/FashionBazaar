import React from "react";
import mens from "@/assets/mens.png";
import womens from "@/assets/womens.png";
import watches from "@/assets/watches.png";
import footwear from "@/assets/footwear.png";
import kids from "@/assets/kids.png";

const categories = [
    { id: "men", label: "Men", img: mens },
    { id: "women", label: "Women", img: womens },
    { id: "kids", label: "Kids", img: kids },
    { id: "accessories", label: "Accessories", img: watches },
    { id: "footwear", label: "Footwear", img: footwear },
];

function HomeCategory() {
    return (
        <div className="flex flex-wrap justify-center  lg:justify-between gap-6 lg:px-50 ">
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="flex flex-col items-center space-y-2 cursor-pointer ">
                    <div className=" w-20 h-20 sm:w-24 sm:h-24 lg:w-40 lg:h-40 rounded-full overflow-hidden
                     shadow-md hover:shadow-2xl transition-transform duration-300 hover:scale-107  ">
                        <img
                            src={category.img}
                            alt={category.label}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-sm font-medium md:text-base lg:text-xl  text-center">
                        {category.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default HomeCategory;
