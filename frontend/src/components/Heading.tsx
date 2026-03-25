import React, { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

function Heading({ h, p }) {
    const [images, setImages] = useState([]);

    // ✅ memoized fetch
    const fetchImage = useCallback(async () => {
        try {
            const res = await API.get("/tours/image");

            // ✅ optimize images (smaller size)
            const imageUrls = res.data.map((item) =>
                `${item.image}?w=1200&q=70`
            );

            setImages(imageUrls);
        } catch (err) {
            if (process.env.NODE_ENV === "development") {
                console.log("Error fetching images:", err);
            }
        }
    }, []);

    useEffect(() => {
        fetchImage();
    }, [fetchImage]);

    return (
        <div className="w-full h-[45vh] sm:h-[55vh] md:h-[75vh]">

            <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                loop={images.length > 1}
                speed={600} // ✅ reduced for smoother performance
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="w-full h-full"
            >

                {images.map((img, index) => (
                    <SwiperSlide key={index} className="relative w-full h-full">

                        {/* Image */}
                        <img
                            src={img}
                            alt="tour"
                            loading="lazy" // ✅ lazy load
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6">

                            <h1 className="text-xl sm:text-2xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
                                {h}
                            </h1>

                            <p className="text-xs sm:text-sm md:text-lg max-w-[90%] sm:max-w-xl md:max-w-2xl mb-4 md:mb-6">
                                {p}
                            </p>

                        </div>

                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
}

export default React.memo(Heading);