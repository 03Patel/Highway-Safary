
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { MapPin, Clock, Users } from "lucide-react";
import { AuthContext } from "../reducers/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import TopTour from "./TopTour";
import Reviews from "./Reviews";
import { data } from "framer-motion/client";

interface TimeSlot {
  time: string;
  capacity: number;
  booked: number;
}

interface Slot {
  date: string;
  times: TimeSlot[];
}

interface Experience {
  _id?: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  description: string;
  image: string;
  slots?: Slot[];
}

function Details(content: any) {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { state } = useContext(AuthContext);
  const role = localStorage.getItem("role")

  useEffect(() => {

    if (!id) return;

    API.get(`/experiences/${id}`)
      .then((res) => {

        setExperience(res.data);

        const today = new Date().toISOString().split("T")[0];
        setSelectedDate(today);

      })
      .catch(console.error)
      .finally(() => setLoading(false));

  }, [id]);

  if (loading)
    return <div className="text-center py-20">Loading...</div>;

  if (!experience)
    return <div className="text-center py-20">Experience not found</div>;

  // Generate 4 future booking dates 
  const generateDates = () => {

    const dates: string[] = [];

    for (let i = 0; i < 4; i++) {

      const d = new Date();
      d.setDate(d.getDate() + i);

      dates.push(d.toISOString().split("T")[0]);

    }

    return dates;

  };

  const futureDates = generateDates();

  /* Generate time slots */
  const generateTimes = (): TimeSlot[] => {

    const baseTimes = [
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "20:00"
    ];

    const now = new Date();

    const available = baseTimes.filter((t) => {

      const [h, m] = t.split(":").map(Number);

      const slotTime = new Date();
      slotTime.setHours(h, m, 0, 0);

      if (selectedDate === new Date().toISOString().split("T")[0]) {
        return slotTime > now;
      }

      return true;

    });

    return available.slice(0, 4).map((time) => ({
      time,
      capacity: 10,
      booked: 0
    }));

  };

  const selectedSlot = experience?.slots?.find(
    (slot) => slot.date === selectedDate
  );

  const times: TimeSlot[] = selectedSlot?.times || generateTimes();

  const subtotal = experience.price * quantity;
  const tax = 59;
  const total = subtotal + tax;

  const handleBooking = () => {
    if (!selectedTime) return;

    const slot = times.find((t) => t.time === selectedTime);
    if (!slot) return;

    if (slot.booked + quantity > slot.capacity) {
      alert("Only limited seats available for this time slot.");
      return;
    }

    // Booking count Update
    setExperience((prev: any) => {
      if (!prev) return prev;

      return {
        ...prev,
        slots: prev.slots?.map((s: any) => {
          if (s.date === selectedDate) {
            return {
              ...s,
              times: s.times.map((t: any) =>
                t.time === selectedTime
                  ? { ...t, booked: t.booked + quantity }
                  : t
              ),
            };
          }
          return s;
        }),
      };
    });

    // Navigation
    if (state.isAuthenticated) {
      if (role === "admin") {
        navigate(`/AdminPage/${experience._id}`);
      } else {
        navigate("/booking", {
          state: {
            experience,
            booking: {
              date: selectedDate,
              time: selectedTime,
              quantity,
            },
          },
        });
      }
    } else {
      alert("Please SignUp or SignIN your account");
      navigate("/signin");
    }
  };
  ;

  return (
    <div className="bg-gray-100 min-h-screen py-10 ">
      <div>
        <Heading
          h="welcome to Travel World"
          p="Explore amazing destinations" />
      </div>

      <div className="max-w-6xl mx-auto px-4  gap-8 mt-5">
        <div className="text-center max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            View the Details
          </h1>

          <p className="text-gray-600  text-sm md:text-lg ">
            Discover everything you need to know about your next adventure.
            From breathtaking destinations to unforgettable experiences,
            we provide all the details to help you plan the perfect journey
            with confidence and ease.
          </p>
        </div>
        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">

          <img
            src={experience.image}
            className="w-full md:h-[75vh] h-[40vh] object-cover rounded-xl shadow"
          />

          <div>

            <h1 className="md:text-3xl text-xl text-gray-800 font-bold">
              {experience.title}
            </h1>

            <div className="flex gap-4 text-gray-500 text-sm mt-2">

              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {experience.location}
              </span>

              <span className="flex items-center gap-1">
                <Clock size={16} />
                {experience.duration}
              </span>

              <span className="flex items-center gap-1">
                <Users size={16} />
                Small group
              </span>

            </div>

            <p className="text-gray-600  text-sm md:text-base mt-4">
              {experience.description}
            </p>

          </div>

          {/* DATE SELECT */}
          <div className="text-gray-800">

            <h2 className="font-semibold text-gray-800 mb-3">
              Select Date
            </h2>

            <div className="flex gap-3 flex-wrap">

              {futureDates.map((date) => (

                <button
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime("");
                  }}
                  className={`px-4 py-2 rounded-lg border text-sm
                    ${selectedDate === date
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-white hover:bg-gray-50"
                    }`}
                >

                  {new Date(date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}

                </button>

              ))}

            </div>

          </div>

          {/* TIME SELECT WITH ANIMATION */}
          <div className="text-gray-800">

            <h2 className="font-semibold mb-3">
              Select Time
            </h2>

            <AnimatePresence mode="wait">

              <motion.div
                key={selectedDate}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-3"
              >

                {times.map((t) => (

                  <motion.button
                    key={t.time}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTime(t.time)}
                    disabled={t.booked >= t.capacity}
                    className={`ml-6 md:ml-0 px-4 py-2 rounded-lg border text-sm
                      ${t.booked >= t.capacity
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : selectedTime === t.time
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-white hover:bg-yellow-50"
                      }`}
                  >

                    {t.time}{" "}
                    {t.booked >= t.capacity
                      ? "(Sold Out)"
                      : `(${t.capacity - t.booked} left)`
                    }

                  </motion.button>

                ))}

              </motion.div>

            </AnimatePresence>

          </div>

        </div>

        {/* BOOKING CARD */}
        <div className=" text-gray-800 mt-10 p-6 rounded-xl shadow h-fit sticky top-24">

          <p className="text-gray-500 text-sm">
            Starting from
          </p>

          <h2 className="text-xl font-bold">
            ₹{experience.price}
          </h2>

          <div className="flex justify-between mt-5">

            <span>Guests</span>

            <div className="flex items-center gap-3">

              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="border w-8 h-8 rounded"
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="border w-8 h-8 rounded"
              >
                +
              </button>

            </div>

          </div>

          <div className="mt-5 text-sm">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{experience.price * quantity}</span>
            </div>

            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹59</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{experience.price * quantity + 59}</span>
            </div>

          </div>

          <button
            disabled={!selectedTime}
            onClick={handleBooking}
            className={`w-full mt-6 py-3 rounded-lg bg-yellow-300 font-semibold
              ${selectedTime
                ? "bg-yellow-400 hover:bg-yellow-500"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            {!state.isAuthenticated && (
              "Please Login"
            )}
            {state.isAuthenticated && role === "user" && (
              "Confirm Booking")}
            {state.isAuthenticated && role === "admin" && (
              "Edit the Details")}

          </button>

        </div>

      </div>
      <br />
      <TopTour />
      <Reviews />
      <Footer />
    </div>
  );
}

export default Details;
