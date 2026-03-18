import React, { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import Card from "../components/Card";
import { AuthContext } from "../reducers/AuthContext";
import { useNavigate } from "react-router-dom";
import { Experience } from "../types";
import { Plus } from "lucide-react";
import Heading from "../components/Heading";


function Home() {

  const { state } = useContext(AuthContext);

  const [list, setList] = useState<Experience[]>([]);


  const [filtered, setFiltered] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
        <Heading />
        <div className="max-w-6xl mx-auto px-6">

          <div className="flex justify-between items-center mb-8 a">
            <h2 className="text-2xl font-bold text-gray-700">
              Available Experiences
            </h2>
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
      </div>

    </>
  );
}

export default Home;