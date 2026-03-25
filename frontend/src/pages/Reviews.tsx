import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Star, Quote } from "lucide-react";
import React from "react";
import "swiper/css";

const reviews = [
  { name: "Rahul Sharma", image: "https://i.pravatar.cc/150?img=1", rating: 5, text: "The trip was perfectly organized and the destinations were breathtaking. I loved every moment of the journey!" },
  { name: "Priya Mehta", image: "https://i.pravatar.cc/150?img=2", rating: 4, text: "Great service and amazing destinations. Highly recommended for travelers." },
  { name: "Amit Patel", image: "https://i.pravatar.cc/150?img=3", rating: 5, text: "Best travel experience ever! Everything from booking to the journey was smooth." },
  { name: "Sneha Kapoor", image: "https://i.pravatar.cc/150?img=4", rating: 5, text: "Beautiful destinations and excellent planning by the team." },
  { name: "Vikram Singh", image: "https://i.pravatar.cc/150?img=5", rating: 4, text: "Amazing travel memories. I will definitely book again!" },
  { name: "Ananya Verma", image: "https://i.pravatar.cc/150?img=6", rating: 5, text: "A fantastic adventure! The team made our vacation unforgettable." },
];

function Reviews() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-50 via-white to-orange-50">

      {/* Heading */}
      <div className="text-center mb-10 sm:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800">
          What Our Travelers Say
        </h2>
        <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-lg">
          Real experiences from happy travelers around the world
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          loop={reviews.length > 3}
          speed={800} // ✅ smoother animation
          autoplay={{
            delay: 3500, // ✅ reduce frequency
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >

          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white/90 backdrop-blur-lg border border-gray-200 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 h-full flex flex-col justify-between">

                {/* Quote Icon */}
                <Quote className="text-primary mb-3" size={24} />

                {/* Review Text */}
                <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
                  "{review.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={review.image}
                    alt={review.name}
                    loading="lazy"   // ✅ lazy load images
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-primary"
                  />

                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                      {review.name}
                    </h3>

                    {/* Stars */}
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}

        </Swiper>

      </div>

    </section>
  );
}

export default React.memo(Reviews);