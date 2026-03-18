import React, { useEffect, useState } from "react";
import background from "../assets/background.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Autoplay } from "swiper/modules";
import API from "../api/axios";

function TopTour() {

    const [tours, setTours] = useState([]);

    const fetchTour = async () => {
        try {
            const res = await API.get("/tours");
            setTours(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTour();
    }, []);

    return (
        <div className="relative w-full py-12 md:py-20">

            {/* Background */}
            <img
                src={background}
                className="absolute inset-0 w-full h-full object-cover"
                alt=""
            />
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

                <h1 className="text-2xl sm:text-3xl md:text-5xl text-white text-center mb-8 md:mb-12 font-bold">
                    Top Booking Tours
                </h1>

                {/* Slider */}
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={16}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: { slidesPerView: 1 },   // 👈 mobile peek
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                >

                    {tours.map((tour) => (
                        <SwiperSlide key={tour._id}>

                            <div className="bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">

                                {/* Image */}
                                <div className="relative group">
                                    <img
                                        src={tour.image}
                                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition duration-500"
                                        alt={tour.name}
                                    />

                                    {/* Price */}
                                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow text-green-600 font-semibold text-sm">
                                        ₹{tour.price}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-4 space-y-3">

                                    <h2 className="font-bold text-base sm:text-lg text-gray-800">
                                        {tour.name}
                                    </h2>

                                    <div className="flex justify-between text-gray-600 text-xs sm:text-sm">
                                        <span>⏰ {tour.days} Days</span>
                                        <span>📍 {tour.location}</span>
                                    </div>

                                    <p className="text-yellow-500 text-sm">
                                        ⭐ {tour.rating}
                                    </p>

                                    <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition">
                                        View Details
                                    </button>

                                </div>

                            </div>

                        </SwiperSlide>
                    ))}

                </Swiper>

            </div>
        </div>
    );
}

export default TopTour;