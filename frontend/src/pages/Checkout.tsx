import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // ✅ useMemo (avoid recalculation)
  const refId = useMemo(() => state?.refId || "N/A", [state]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white px-4 text-center">

      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="text-green-500 mb-4"
      >
        <CheckCircle2 size={80} />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2"
      >
        Booking Confirmed
      </motion.h2>

      {/* Ref ID */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-500 mb-6 text-sm md:text-base"
      >
        Ref ID:
        <span className="font-mono text-gray-700 ml-2">
          {refId}
        </span>
      </motion.p>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
      >
        Back to Home
      </motion.button>

    </div>
  );
}

export default Checkout;