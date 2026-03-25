import React, { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../reducers/AuthContext";
import API from "../api/axios";
import { MapPin, Trash2 } from "lucide-react";

function Card({ experience, onDelete }) {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isAdmin = state.isAuthenticated && role === "admin";

  // ✅ memoized functions
  const handleDelete = useCallback(async () => {
    if (!experience._id) return;

    const confirmDelete = window.confirm("Delete this experience?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/experiences/${experience._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      onDelete(experience._id);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Delete error:", err);
      }
      alert("Could not delete item");
    }
  }, [experience._id, token, onDelete]);

  const openDetails = useCallback(() => {
    navigate(`/details/${experience._id}`);
  }, [navigate, experience._id]);

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition duration-300 overflow-hidden">

      <div className="relative">
        <img
          src={experience.image}
          alt={experience.title}
          loading="lazy" // ✅ lazy load
          className="w-full h-52 object-cover"
        />

        <span className="absolute top-3 right-3 bg-blue-500 text-sm font-medium px-3 py-1 rounded-full shadow">
          ₹{experience.price}
        </span>
      </div>

      <div className="p-4">

        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {experience.title}
        </h3>

        <div className="flex items-center text-gray-500 text-sm mt-1 gap-1">
          <MapPin size={15} />
          {experience.location}
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {experience.description || "No description available"}
        </p>

        <div className="flex items-center justify-between mt-4">

          <button
            onClick={openDetails}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition ${state.isAuthenticated
                ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              }`}
          >
            {isAdmin ? "Manage" : "View Details"}
          </button>

          {isAdmin && (
            <button
              onClick={handleDelete}
              className="flex items-center justify-center w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              <Trash2 size={16} />
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default React.memo(Card);