import React, { useEffect, useState, useContext, useMemo, useCallback } from "react";
import API from "../api/axios";
import Card from "../components/Card";
import { AuthContext } from "../reducers/AuthContext";
import { useNavigate } from "react-router-dom";
import { Experience } from "../types";
import { Plus } from "lucide-react";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import TopTour from "./TopTour";
import Reviews from "./Reviews";

// Debounce Hook
function useDebounce(value: string, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

function Home() {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [list, setList] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  // Debounced search
  const debouncedSearch = useDebounce(search);

  // Fetch data (optimized)
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await API.get("/experiences");
        if (isMounted) setList(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // prevents memory leak
    };
  }, []);

  // Optimized filtering
  const filteredList = useMemo(() => {
    if (!debouncedSearch.trim()) return list;

    const lowerSearch = debouncedSearch.toLowerCase();

    return list.filter((item) =>
      item.title.toLowerCase().includes(lowerSearch)
    );
  }, [debouncedSearch, list]);

  // Optimized delete (prevents re-renders)
  const handleDelete = useCallback((id: string) => {
    setList((prev) => prev.filter((item) => item._id !== id));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      {/* HERO */}
      <Heading
        h="Explore the World"
        p="Discover amazing places, unique experiences, and unforgettable journeys."
      />

      <div className="max-w-6xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Top Destinations
          </h2>
          <p className="text-gray-600 mt-3 text-sm md:text-lg max-w-4xl mx-auto">
            Explore curated travel experiences designed to create unforgettable memories.
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search experiences..."
            className="border border-gray-300 rounded-lg p-2 w-full max-w-md focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* LOADING SKELETON */}
        {loading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-60 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredList.length > 0 ? (

          /* CARD GRID */
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

            {filteredList.map((item) => (
              <Card
                key={item._id}
                experience={item}
                onDelete={handleDelete}
              />
            ))}

            {/* ADMIN ADD CARD */}
            {state.isAuthenticated && role === "admin" && (
              <div
                onClick={() => navigate("/AddItem")}
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl h-60 cursor-pointer hover:bg-white hover:shadow-lg transition"
              >
                <Plus size={40} className="text-indigo-500 mb-2" />
                <p className="text-gray-600 font-medium">Add Experience</p>
              </div>
            )}

          </div>

        ) : (

          /* EMPTY STATE */
          <div className="text-center mt-16">
            <h3 className="text-xl font-semibold text-gray-600">
              No experiences found
            </h3>
            <p className="text-gray-400 mt-2">
              Try different keywords
            </p>
          </div>

        )}
      </div>

      {/* EXTRA SECTIONS */}
      <TopTour />
      <Reviews />
      <Footer />
    </div>
  );
}

export default React.memo(Home);