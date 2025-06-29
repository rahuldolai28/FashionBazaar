import React from "react";

const brands = [
    { id: "levis", label: "Levi's" },
    { id: "Tokyo Talkies", label: "Tokyo Talkies" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
    { id: "special", label: "Special" },
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
];

function HomeBrands() {
    return (
        <div className="flex flex-wrap justify-center   gap-6 lg:px-40 ">
            {brands.map((brand) => (
                <div
                    key={brand.id}
                    className="flex flex-col items-center space-y-2 cursor-pointer lg:mx-10 ">
                    <div
                        className=" w-20 h-20 sm:w-24 sm:h-24 lg:w-40 lg:h-40 rounded-full overflow-hidden
                     shadow-md hover:shadow-2xl transition-transform duration-300 hover:scale-107 
                      flex items-center justify-center
                      bg-radial-[at_50%_75%] from-amber-50 via-yellow-100 to-yellow-100 to-90% ">
                        {/* <img
                            src={brand.img}
                            alt={brand.label}
                            className="w-full h-full object-cover"
                        /> */}
                        <span className="text-sm font-bold md:text-base lg:text-xl  text-center">
                            {brand.label}
                        </span>
                    </div>
                    {/* <span className="text-sm font-medium md:text-base lg:text-xl  text-center">
                        {brand.label}
                    </span> */}
                </div>
            ))}
        </div>
    );
}

export default HomeBrands;
