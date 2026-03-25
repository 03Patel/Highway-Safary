import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { MapPin, Clock, Users } from "lucide-react";
import { AuthContext } from "../reducers/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import TopTour from "./TopTour";
import Reviews from "./Reviews";

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

function Details() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);

  const role = localStorage.getItem("role");

  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // FETCH DATA
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

  // OPTIMIZED DATES
  const futureDates = useMemo(() => {
    const dates: string[] = [];
    for (let i = 0; i < 4; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
  }, []);

  // OPTIMIZED TIMES
  const times: TimeSlot[] = useMemo(() => {
    if (!experience) return [];

    const selectedSlot = experience.slots?.find(
      (slot) => slot.date === selectedDate
    );

    if (selectedSlot) return selectedSlot.times;

    const baseTimes = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
    const now = new Date();

    return baseTimes
      .filter((t) => {
        const [h, m] = t.split(":").map(Number);
        const slotTime = new Date();
        slotTime.setHours(h, m, 0, 0);

        if (selectedDate === new Date().toISOString().split("T")[0]) {
          return slotTime > now;
        }
        return true;
      })
      .slice(0, 4)
      .map((time) => ({
        time,
        capacity: 10,
        booked: 0,
      }));
  }, [selectedDate, experience]);

  // OPTIMIZED PRICE
  const { subtotal, total } = useMemo(() => {
    if (!experience) return { subtotal: 0, total: 0 };
    const subtotal = experience.price * quantity;
    const tax = 59;
    return {
      subtotal,
      total: subtotal + tax,
    };
  }, [experience, quantity]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleBooking = () => {
    if (!selectedTime) return alert("Select time");

    const slot = times.find((t) => t.time === selectedTime);
    if (!slot) return;

    if (slot.booked + quantity > slot.capacity) {
      return alert("Limited seats available");
    }

    if (!state.isAuthenticated) {
      navigate("/signin");
      return;
    }

    if (role === "admin") {
      navigate(`/AdminPage/${experience?._id}`);
      return;
    }

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
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!experience) return <div className="text-center py-20">Not Found</div>;

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen py-10">
      <Heading h="Welcome to Travel World" p="Explore amazing destinations" />

      <div className="max-w-6xl mx-auto px-4 mt-5">
        <img
          src={experience.image}
          className="w-full md:h-[75vh] h-[40vh] object-cover rounded-xl shadow"
        />

        <h1 className="text-2xl md:text-3xl font-bold mt-4">
          {experience.title}
        </h1>

        <div className="flex gap-4 text-gray-500 text-sm mt-2">
          <span className="flex items-center gap-1">
            <MapPin size={16} /> {experience.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} /> {experience.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users size={16} /> Small group
          </span>
        </div>

        <p className="text-gray-600 mt-4">{experience.description}</p>

        {/* DATE */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Select Date</h2>
          <div className="flex gap-3 flex-wrap">
            {futureDates.map((date) => (
              <button
                key={date}
                onClick={() => handleDateSelect(date)}
                className={`px-4 py-2 rounded-lg border ${selectedDate === date
                  ? "bg-yellow-400"
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

        {/* TIME */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Select Time</h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDate}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap gap-3"
            >
              {times.map((t) => (
                <button
                  key={t.time}
                  onClick={() => setSelectedTime(t.time)}
                  disabled={t.booked >= t.capacity}
                  className={`px-4 py-2 rounded-lg border ${selectedTime === t.time
                    ? "bg-yellow-400"
                    : "bg-white hover:bg-yellow-50"
                    }`}
                >
                  {t.time} ({t.capacity - t.booked} left)
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOOKING CARD */}
        <div className="mt-10 p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-bold">₹{experience.price}</h2>

          <div className="flex justify-between mt-4">
            <span>Guests</span>
            <div className="flex gap-2">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>

          <div className="mt-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹59</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={!selectedTime}
            className="w-full mt-6 py-3 bg-yellow-400 rounded-lg"
          >
            {state.isAuthenticated ? "Confirm Booking" : "Login to Continue"}
          </button>
        </div>
      </div>
      <br />
      <br />

      <TopTour />
      <Reviews />
      <Footer />
    </div>
  );
}

export default React.memo(Details);