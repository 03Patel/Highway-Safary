import React, { useEffect, useState, useContext } from "react";
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



function Home() {

  const { state } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [list, setList] = useState<Experience[]>([]);


  const [filtered, setFiltered] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleSearch = (value: any) => {
    setSearch(value);
    const filteredData = list.filter((item) => {
      item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    })
    setFiltered(filteredData)
  }


  const role = localStorage.getItem("role");

  const fetchData = async () => {
    try {
      const res = await API.get("/experiences");

      setList(res.data);
      setFiltered(res.data);

    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);

    }
  };




  useEffect(() => {
    fetchData();

  }, []);

  const handleDelete = (id: string) => {

    setList((prev) => prev.filter((item) => item._id !== id));
    setFiltered((prev) => prev.filter((item) => item._id !== id));

  };



  return (
    <>



      {/* Content */}
      <div className="bg-gray-100 min-h-screen py-10 ">
        <Heading h="Explore the World" p="  Discover amazing places, unique experiences, and unforgettable journeys." />

        <div className="max-w-6xl mx-auto px-6">

          <div className="w-full flex flex-col items-center justify-center text-center py-12 px-4">

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Top Destinations
            </h2>

            {/* Paragraph */}
            <p className="max-w-6xl text-gray-600 text-xs md:text-lg  ">
              We’ve helped countless explorers experience the beauty of the world through
              carefully curated journeys. Whether it’s a one-day escape or a two-week adventure,
              our mission is to turn every trip into a story worth remembering.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-60 bg-white rounded-xl shadow animate-pulse"
                ></div>
              ))}
            </div>
          ) : filtered.length > 0 ? (

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

              {filtered.map((x) => (
                <Card
                  key={x._id}
                  experience={x}
                  onDelete={handleDelete}
                />
              ))}



              {/* Admin Add Experience Card */}
              {state.isAuthenticated && role === "admin" && (
                <div
                  onClick={() => navigate("/AddItem")}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl h-60 cursor-pointer hover:bg-white hover:shadow-md transition"
                >
                  <Plus size={40} className="text-indigo-500 mb-2" />
                  <p className="text-gray-600 font-medium">
                    Add Experience
                  </p>
                </div>
              )}

            </div>

          ) : (
            <div className="text-center mt-16">

              <h3 className="text-xl font-semibold text-gray-600">
                No experiences found
              </h3>

              <p className="text-gray-400 mt-2">
                Try searching with different keywords
              </p>

            </div>
          )}

        </div>
        <br />
        <br />
        <TopTour />
        <Reviews />
        <Footer />
      </div>

    </>
  );
}

export default Home;