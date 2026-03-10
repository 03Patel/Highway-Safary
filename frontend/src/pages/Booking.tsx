import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Booking() {

  const location = useLocation();
  const navigate = useNavigate();

  const { experience, booking } = location.state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);

  if (!experience || !booking) {
    return (
      <div className="text-center py-20">
        No booking details found. Please go back.
      </div>
    );
  }

  const subtotal = experience.price * booking.quantity;
  const tax = 59;
  const total = subtotal + tax - discount;

  // APPLY PROMO
  const handleApplyPromo = async () => {

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

    } catch (err) {

      setDiscount(0);
      setPromoApplied(false);
      setMessage("Invalid promo code");

    } finally {

      setPromoLoading(false);

    }
  };

  // BOOK EXPERIENCE
  const handleBooking = async () => {

    if (!name || !email || !agree) {
      alert("Please fill all fields and agree to terms");
      return;
    }

    try {

      setLoading(true);

      const refId =
        "REF-" +
        Math.random().toString(36).substring(2, 8).toUpperCase();

      const res = await API.post("/bookings", {

        experienceId: experience._id,
        title: experience.title,
        refId: refId,
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
          state: {
            refId: res.data.booking.refId
          }
        });

      }

    } catch (err) {

      alert("Booking failed");
      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-3 gap-10">

      {/* LEFT SECTION */}

      <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">

        <h1 className="text-xl font-semibold mb-5">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

          <input
            type="text"
            placeholder="Full Name"
            className="border rounded-md px-3 py-2 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border rounded-md px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* PROMO */}

        <div className="flex gap-2 mb-2">

          <input
            type="text"
            placeholder="Promo Code"
            className="border rounded-md px-3 py-2 text-sm flex-1"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={promoApplied}
          />

          <button
            onClick={handleApplyPromo}
            className="bg-black text-white px-4 py-2 rounded-md text-sm"
          >
            {promoLoading ? "Checking..." : promoApplied ? "Applied" : "Apply"}
          </button>

        </div>

        {message && (
          <p className="text-sm text-green-600 mb-4">{message}</p>
        )}

        {/* TERMS */}

        <label className="flex items-center gap-2 text-sm">

          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />

          I agree to the terms

        </label>

      </div>

      {/* RIGHT SECTION */}

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
          className="w-full mt-6 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 font-medium"
        >

          {loading ? "Processing..." : "Pay and Confirm"}

        </button>

      </div>

    </div>

  );
}

export default Booking;
