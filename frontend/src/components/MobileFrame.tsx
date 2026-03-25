import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

function MobileFrame() {
  const [images, setImages] = useState<string[]>([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch Images
  const fetchImage = async () => {
    try {
      const res = await API.get("/tours/image");
      const imageUrls = res.data.map((item: any) => item.image);
      setImages(imageUrls);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImage();

    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );

      setDate(
        now.toLocaleDateString([], {
          weekday: "short",
          day: "numeric",
          month: "short",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full items-center justify-center h-screen">

      {/* Phone Frame */}
      <div className="relative md:w-[300px] w-[200px] md:h-[600px] h-[400px] overflow-hidden flex items-start justify-center bg-black rounded-[40px] shadow-2xl p-2 z-50">

        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 md:w-24 w-12 md:h-4 h-2 bg-black rounded-b-xl z-20"></div>

        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[30px] overflow-hidden relative">

          {/* Status Bar */}
          <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4 py-1 text-white text-[10px] z-20">
            <span>{time}</span>
            <div className="flex gap-1">
              <span>📶</span>
              <span>📡</span>
              <span>🔋</span>
            </div>
          </div>

          {/* Time */}
          <div className="absolute top-20 md:left-10 left-8 px-4 py-1 text-white font-bold md:text-4xl text-2xl z-20">
            <span>{time}</span>
          </div>

          {/* Date */}
          <div className="absolute top-30 md:left-23 left-13 text-white z-20">
            <h2 className="md:text-lg text-sm font-bold">{date}</h2>
          </div>

          {/* Notification */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute md:top-45 top-40 left-2 right-2 bg-white backdrop-blur-md rounded-xl p-3 shadow-md z-20"
          >
            <p className="md:text-sm text-xs font-semibold text-gray-800">
              🌍 New Tour Available
            </p>
            <p className="md:text-xs text-[8px] text-gray-600">
              Explore amazing destinations at best prices!
            </p>
          </motion.div>

          {/* Main Swiper */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={images.length > 1}
            loopAdditionalSlides={3}
            speed={1000}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            onSlideChange={(swiper) =>
              setActiveIndex(swiper.realIndex)
            }
            className="w-full h-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="w-full h-full">
                <img
                  src={img}
                  alt="tour"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </div>

      {/* Background Circle */}
      <div className="absolute md:w-[700px] w-[400px] md:h-[300px] h-[200px] rounded-full p-2">
        <div className="w-full h-full bg-white rounded-full overflow-hidden relative opacity-75 md:top-0 top-26">

          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={images.length > 1}
            loopAdditionalSlides={3}
            speed={1000}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="w-full h-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="w-full h-full">
                <img
                  src={img}
                  alt="tour"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </div>
  );
}

export default MobileFrame;