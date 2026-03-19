import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

function Heading({ h, p }: { h: string; p: string }) {
    const [images, setImages] = useState<string[]>([]);

    const fetchImage = async () => {
        try {
            const res = await API.get("/tours/image");
            const imageUrls = res.data.map((item: any) => item.image);
            setImages(imageUrls);
        } catch (err) {
            console.log("Error fetching images:", err);
        }
    };

    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <div className="w-full h-[45vh] sm:h-[55vh] md:h-[75vh]">
            <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                loop={images.length > 1}
                speed={800}
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
                            className="w-full h-full object-cover"
                        />


                        <div className="absolute inset-0 bg-black/60"></div>


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

export default Heading;