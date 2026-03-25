import React, { useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Footer from "../components/Footer";

function Booking() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const experience = state?.experience;
  const booking = state?.booking;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);

  const userId = localStorage.getItem("userId");

  // ✅ useMemo (prevents unnecessary recalculation)
  const { subtotal, tax, total } = useMemo(() => {
    const subtotal = experience.price * booking.quantity;
    const tax = 59;
    const total = subtotal + tax - discount;
    return { subtotal, tax, total };
  }, [experience.price, booking.quantity, discount]);

  // ✅ useCallback (prevents re-creation)
  const handleApplyPromo = useCallback(async () => {

    if (!promoCode) {
      setMessage("Please enter promo code");
      return;
    }

    setPromoLoading(true);

    try {
      const res = await API.post("/promo/validate", {
        promoCode,
        total: subtotal + tax
      });

      if (res.data.success) {
        setDiscount(res.data.discount);
        setPromoApplied(true);
        setMessage(res.data.message);
      }

    } catch {
      setDiscount(0);
      setPromoApplied(false);
      setMessage("Invalid promo code");
    } finally {
      setPromoLoading(false);
    }

  }, [promoCode, subtotal, tax]);

  const handleBooking = useCallback(async () => {

    if (!name || !email || !agree) {
      alert("Please fill all fields and agree to terms");
      return;
    }

    try {
      setLoading(true);

      const refId = "REF-" + Math.random().toString(36).slice(2, 8).toUpperCase();

      const res = await API.post("/bookings", {
        experienceId: experience._id,
        title: experience.title,
        image: experience.image,
        refId,
        userId,
        name,
        email,
        date: booking.date,
        time: booking.time,
        seats: booking.quantity,
        promoCode,
        discount,
        status: "pending"
      });

      if (res.data.success) {
        navigate("/checkout", {
          state: { refId: res.data.booking.refId }
        });
      }

    } catch (err) {
      console.log(err);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }

  }, [name, email, agree, experience, booking, promoCode, discount, userId]);

  if (!experience || !booking) {
    return <div className="text-center py-20">No booking details found</div>;
  }

  return (
    <>
      <div className="w-full md:px-20 px-6 py-10 grid md:grid-cols-3 gap-10 bg-white">

        {/* LEFT */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">

          <h1 className="text-xl font-semibold mb-5">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            <input
              type="text"
              placeholder="Full Name"
              className="border h-10 rounded-md px-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div>
              <input
                type="email"
                placeholder="Email"
                className="border w-full h-10 rounded-md px-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-sm">
                <span className="text-red-500">*</span> Valid email required
              </p>
            </div>

          </div>

          {/* PROMO */}
          <div className="flex gap-2 mb-2">

            <input
              type="text"
              placeholder="Promo Code"
              className="border px-3 py-2 text-sm flex-1 rounded-md"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={promoApplied}
            />

            <button
              onClick={handleApplyPromo}
              className="bg-black text-white px-4 rounded-md text-sm"
            >
              {promoLoading ? "Checking..." : promoApplied ? "Applied" : "Apply"}
            </button>

          </div>

          {message && <p className="text-sm text-green-600">{message}</p>}

          <label className="flex items-center gap-2 text-sm mt-3">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            I agree to the terms
          </label>

        </div>

        {/* RIGHT */}
        <div className="border rounded-xl bg-white shadow-sm p-6">

          <h2 className="font-semibold mb-4 text-lg">Booking Summary</h2>

          <div className="space-y-2 text-sm">

            <div className="flex justify-between">
              <span>Experience</span>
              <span>{experience.title}</span>
            </div>

            <div className="flex justify-between">
              <span>Date</span>
              <span>{booking.date}</span>
            </div>

            <div className="flex justify-between">
              <span>Time</span>
              <span>{booking.time}</span>
            </div>

            <div className="flex justify-between">
              <span>Seats</span>
              <span>{booking.quantity}</span>
            </div>

            <hr />

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{tax}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}

            <hr />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

          </div>

          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full mt-6 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500"
          >
            {loading ? "Processing..." : "Pay and Confirm"}
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Booking;