import React, { useEffect, useState, useRef } from "react";
import hoodie from "@/assets/hoodie.png";
import lpp from "@/assets/lpp.webp";
import sale30 from "@/assets/sale30banner.jpg";
import palmonass from "@/assets/palmonass.webp";
import auttom from "@/assets/auttom.png";
import elevate from "@/assets/elevate.jpg";
import welcome from "@/assets/welcome.webp";
import clearence from "@/assets/clearence.webp";
import ShippingWeb from "@/assets/ShippingWeb.webp";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import HomeCategory from "@/components/shopping-view/home-category";
import HomeBrands from "@/components/shopping-view/home-brands";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

function ShoppingHome() {
    const slides = [
        palmonass,
        welcome,
        lpp,
        elevate,
        hoodie,
        auttom,
        sale30,
        clearence,
    ].map((img) => img.toString());

    const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

    const [currentSlide, setCurrentSlide] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const slideRef = useRef(null);

    const goToSlide = (index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentSlide(index);
    };

    const nextSlide = () => goToSlide(currentSlide + 1);
    const prevSlide = () => goToSlide(currentSlide - 1);

    const handleTransitionEnd = () => {
        setIsTransitioning(false);

        if (currentSlide === 0) {
            setCurrentSlide(slides.length);
            disableTransitionTemporarily(slides.length);
        } else if (currentSlide === slides.length + 1) {
            setCurrentSlide(1);
            disableTransitionTemporarily(1);
        }
    };

    const disableTransitionTemporarily = (index) => {
        if (!slideRef.current) return;

        slideRef.current.style.transition = "none";
        slideRef.current.style.transform = `translateX(-${index * 100}%)`;

        // Force reflow to apply the transition instantly
        void slideRef.current.offsetWidth;

        slideRef.current.style.transition = "transform 1000ms ease-in-out";
    };

    useEffect(() => {
        if (slideRef.current) {
            slideRef.current.style.transform = `translateX(-${
                currentSlide * 100
            }%)`;
        }
    }, [currentSlide]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isTransitioning) nextSlide();
        }, 2000);

        return () => clearInterval(timer);
    }, [currentSlide, isTransitioning]);

    return (
        <div className="flex flex-col min-h-screen bg-[#feffee]">
            <div className="relative w-full h-[28vh] sm:h-[70vh] md:h-[80vh] lg:h-[600px] overflow-hidden">
                <div
                    ref={slideRef}
                    className="flex transition-transform duration-[1000ms] ease-in-out w-full h-full"
                    onTransitionEnd={handleTransitionEnd}>
                    {extendedSlides.map((src, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full h-full">
                            <img
                                src={src}
                                alt={`Slide ${index}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) =>
                                    (e.target.src = "/fallback.jpg")
                                }
                            />
                        </div>
                    ))}
                </div>

                <Button
                    onClick={prevSlide}
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent border-0 md:bg-white/80">
                    <ChevronLeftIcon className="w-4 h-4" />
                </Button>

                <Button
                    onClick={nextSlide}
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent border-0 md:bg-white/80">
                    <ChevronRightIcon className="w-4 h-4" />
                </Button>
            </div>
            <section className="py-12 lg:py-18 bg-[#fffdeb]">
                <div className=" container mx-auto px-4 mb-4">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 ">
                        Shop by category
                    </h2>
                    <HomeCategory />
                </div>
            </section>
            <section className="justify-center pt-10 pb-10 
            bg-[linear-gradient(90deg,rgba(254, 255, 238, 1) 0%, rgba(252, 255, 173, 1) 40%, rgba(254, 255, 238, 1) 100%)] ">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center pb-5 ">
                    Shop by Brands
                </h2>
                <HomeBrands />
            </section>

            <section className="mb-7">
                <img
                    src={ShippingWeb}
                    alt="Responsive Image"
                    className="w-full h-20 sm:h-full object-cover"
                    // style="max-width: 100%; height: auto;"
                />
            </section>
        </div>
    );
}

export default ShoppingHome;

// function ShoppingHome() {
//     const images = [palmonas, bottomwear, lp, sale30, newArrival];

//     // Clone first and last slides for infinite loop effect
//     const slides = [
//         palmonas.toString(),
//         bottomwear.toString(),
//         lp.toString(),
//         sale30.toString(),
//         newArrival.toString(),
//     ];

//     const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

//     const [currentSlide, setCurrentSlide] = useState(1); // Start at first real slide (index 1)
//     const [isTransitioning, setIsTransitioning] = useState(false);
//     const slideRef = useRef(null);
//     const currentSlideRef = useRef(1);

//     // Automatic slide change every 3 seconds
//     useEffect(() => {
//         const timer = setInterval(() => {
//             if (!isTransitioning) nextSlide();
//         }, 3000);
//         return () => clearInterval(timer);
//     }, [isTransitioning]); // Add dependency to avoid stale state

//     const nextSlide = () => {
//         if (isTransitioning) return;
//         currentSlideRef.current = currentSlideRef.current + 1;
//         setCurrentSlide(currentSlideRef.current);
//         setIsTransitioning(true);
//     };

//     const prevSlide = () => {
//         if (isTransitioning) return;
//         currentSlideRef.current = currentSlideRef.current - 1;
//         setCurrentSlide(currentSlideRef.current);
//         setIsTransitioning(true);
//     };

//     // Handle transition end to reset position for infinite loop
//     const handleTransitionEnd = () => {
//         setIsTransitioning(false);
//         if (currentSlideRef.current === 0) {
//             currentSlideRef.current = slides.length;
//             setCurrentSlide(currentSlideRef.current);
//             if (slideRef.current) {
//                 slideRef.current.style.transition = "none";
//                 slideRef.current.style.transform = `translateX(-${
//                     slides.length * 100
//                 }%)`;
//                 // Force reflow to apply styles immediately
//                 void slideRef.current.offsetWidth;
//                 slideRef.current.style.transition =
//                     "transform 1000ms ease-in-out";
//             }
//         } else if (currentSlideRef.current === slides.length + 1) {
//             currentSlideRef.current = 1;
//             setCurrentSlide(currentSlideRef.current);
//             if (slideRef.current) {
//                 slideRef.current.style.transition = "none";
//                 slideRef.current.style.transform = `translateX(-100%)`;
//                 void slideRef.current.offsetWidth;
//                 slideRef.current.style.transition =
//                     "transform 1000ms ease-in-out";
//             }
//         }
//     };

//     useEffect(() => {
//         if (slideRef.current) {
//             slideRef.current.style.transition = "none";
//             slideRef.current.style.transform = `translateX(-${
//                 currentSlide * 100
//             }%)`;
//             // Force reflow to apply styles immediately
//             void slideRef.current.offsetWidth;
//             slideRef.current.style.transition = "transform 1000ms ease-in-out";
//         }
//     }, [currentSlide]);

//     return (
//         <div className="flex flex-col min-h-screen">
//             <div className="relative w-full h-[28vh] sm:h-[70vh] md:h-[80vh] lg:h-[600px] overflow-hidden">
//                 <div
//                     ref={slideRef}
//                     className="flex transition-transform duration-[1000ms] ease-in-out w-full h-full"
//                     onTransitionEnd={handleTransitionEnd}
//                     style={{
//                         transform: `translateX(-${currentSlide * 100}%)`,
//                     }}>
//                     {extendedSlides.map((slide, index) => (
//                         <div
//                             key={index}
//                             className="flex-shrink-0 w-full h-full">
//                             <img
//                                 loading="lazy"
//                                 src={slide}
//                                 alt={`Slide ${index}`}
//                                 className="w-full h-full object-cover"
//                                 onError={(e) =>
//                                     (e.target.src = "/palmonas.jpg")
//                                 }
//                             />
//                         </div>
//                     ))}
//                 </div>
//                 <Button
//                     onClick={prevSlide}
//                     variant="outline"
//                     size="icon"
//                     className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent border-0 md:bg-white/80 ">
//                     <ChevronLeftIcon className="w-4 h-4" />
//                 </Button>
//                 <Button
//                     onClick={nextSlide}
//                     variant="outline"
//                     size="icon"
//                     className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent border-0 md:bg-white/80">
//                     <ChevronRightIcon className="w-4 h-4" />
//                 </Button>
//             </div>
//             <section className="py-12 lg:py-18 bg-gray-50">
//                 <div className=" container mx-auto px-4 mb-4">
//                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 ">
//                         Shop by category
//                     </h2>
//                     <HomeCategory />
//                 </div>
//             </section>
//             <Carousel
//                 className="w-full max-w-4xl mx-auto"
//                 opts={{ loop: true }}>
//                 <CarouselContent className="transition-transform duration-200 ease-in-out">
//                     {images.map((src, index) => (
//                         <CarouselItem
//                             key={index}
//                             className="flex justify-center items-center">
//                             <img
//                                 src={src}
//                                 alt={`Slide ${index + 1}`}
//                                 className="w-full h-[400px] object-cover rounded-xl"
//                             />
//                         </CarouselItem>
//                     ))}
//                 </CarouselContent>
//                 <CarouselPrevious />
//                 <CarouselNext />
//             </Carousel>
//         </div>
//     );
// }

// export default ShoppingHome;
