import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

function Heading() {
    const [images, setImages] = useState([]);

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
        <div className="w-full md:h-[75vh] h-[50vh]">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop={images.length > 2}
                speed={1000}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                className="w-full h-full"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index} className="w-full h-full relative">

                        {/* Image */}
                        <img
                            src={img}
                            alt="tour"
                            className="w-full h-full object-cover"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/50"></div>

                        {/* Content on Slider */}


                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Heading;