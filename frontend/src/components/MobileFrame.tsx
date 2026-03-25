import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

function MobileFrame() {
  const [i, setImage] = useState([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [activeIndex, ssetActiveIndex] = useState(0);

  const fetchImage = async () => {
    try {
      const res = await API.get("/tours/image");
      const image = res.data.map((item) => item.image);
      setImage(image);
    } catch (err) {
      // ❌ avoid console in production
      if (process.env.NODE_ENV === "development") {
        console.log(err);
      }
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

    // ✅ changed from 1000 → 60000 (huge performance boost)
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full items-center hidden md:block justify-center h-screen">

      {/* Phone Frame */}
      <div className="relative md:w-[300px] w-[200px] md:h-[600px] h-[400px] overflow-hidden flex items-start justify-center bg-black rounded-[40px] shadow-2xl p-2 z-50">

        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 md:w-24 w-12 md:h-4 h-2 bg-black rounded-b-xl z-20"></div>

        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[30px] overflow-hidden relative">

          {/* Time */}
          <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4 py-1 text-white text-[10px] z-20">
            <span>{time}</span>
            <div className="flex gap-1">
              <span>📶</span>
              <span>📡</span>
              <span>🔋</span>
            </div>
          </div>

          <div className="absolute top-20 md:left-10 left-8 px-4 py-1 text-white font-bold md:text-4xl text-2xl z-20">
            <span>{time}</span>
          </div>

          {/* Date */}
          <div className="absolute top-30 md:left-23 left-13 text-white z-20">
            <h2 className="md:text-lg text-sm font-bold">{date}</h2>
          </div>

          {/* Animation */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}  // ✅ reduced from 2 → 0.8
            className="absolute md:top-45 top-40 left-2 right-2 bg-white backdrop-blur-md rounded-xl p-3 shadow-md z-20"
          >
            <p className="md:text-sm text-xs font-semibold text-gray-800">
              🌍 New Tour Available
            </p>
            <p className="md:text-xs text-[8px] text-gray-600">
              Explore amazing destinations at best prices!
            </p>
          </motion.div>

          {/* Swiper */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            loopAdditionalSlides={1} // ✅ reduced from 3
            speed={1000}
            autoplay={{
              delay: 3000, // ✅ slightly increased for smoother UX
              disableOnInteraction: false,
            }}
            onSlideChange={(swiper) => ssetActiveIndex(swiper.realIndex)}
            className="w-full h-full"
          >
            {i.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  loading="lazy"   // ✅ lazy load images
                  className="w-full h-full object-cover"
                  alt="tour"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>

        </div>
      </div>

      {/* Background Slider */}
      <div className="absolute md:w-[700px] w-[350px] md:h-[300px] h-[200px] rounded-full p-2">
        <div className="w-full h-full bg-white rounded-full overflow-hidden relative opacity-75 md:top-0 top-26">

          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            loopAdditionalSlides={1}
            speed={1000}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="w-full h-full"
          >
            {i.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  loading="lazy"  // ✅ lazy load here also
                  className="w-full h-full object-cover"
                  alt="tour-bg"
                />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </div>
  );
}

export default React.memo(MobileFrame);