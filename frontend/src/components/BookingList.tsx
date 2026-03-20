import React, { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../reducers/AuthContext";
import { Trash2, Save } from "lucide-react";

type Booking = {
    _id: string;
    refId: string;
    name: string;
    status: string;
    image?: string;
    title?: string;
    date?: string;
    time?: string;
};

function BookingList() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const [updatedStatus, setUpdatedStatus] = useState<{ [key: string]: string }>({});

    const { state } = useContext(AuthContext);
    const role = localStorage.getItem("role"); // ✅ user / admin

    const fetchBookings = async () => {
        try {
            if (role === "admin") {
                const res = await API.get("/bookings");
                setBookings(res.data.bookings);
                console.log(res.data.bookings)
            } else {
                const userId = localStorage.getItem("userId");
                if (!userId) return;

                const res = await API.get(`/bookings/user/${userId}`);
                setBookings(res.data);
            }
        } catch (err) {
            console.log("ERROR:", err);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusChange = (id: string, status: string) => {
        setUpdatedStatus({ ...updatedStatus, [id]: status });
    };

    const saveStatus = async (id: string) => {
        await API.put(`/bookings/update-status/${id}`, {
            status: updatedStatus[id],
        });
        fetchBookings();
    };

    const deleteBooking = async (id: string) => {
        await API.delete(`/bookings/${id}`);
        fetchBookings();
    };



    return (
        <div className="min-h-screen bg-white text-gray-800 p-6">

            <h1 className="text-2xl font-bold mb-6">
                {role === "admin" ? "All Bookings (Admin)" : "My Bookings"}
            </h1>

            {bookings.length === 0 ? (
                <p>No bookings found</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {bookings.map((b) => (
                        <div
                            key={b._id}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                        >

                            {/* Image */}
                            <img
                                src={b.image}
                                alt=""
                                className="w-full h-40 object-cover"
                            />

                            {/* Content */}
                            <div className="p-4">

                                <h2 className="font-semibold text-lg">{b.name}</h2>

                                <p className="text-sm text-gray-500">
                                    Ref ID: {b.refId}
                                </p>



                                <>
                                    <p className="text-sm text-gray-500">
                                        Title: {b.title}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Date: {b.date} <br />
                                        Time: {b.time}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Slote: {b.seats} <br />

                                    </p>

                                </>


                                {/* STATUS */}
                                {role === "admin" ? (
                                    <select
                                        value={updatedStatus[b._id] || b.status}
                                        onChange={(e) =>
                                            handleStatusChange(b._id, e.target.value)
                                        }
                                        className="border rounded px-3 py-1 w-full mt-2"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                ) : (
                                    <p className="mt-2  text-sm">
                                        Status:
                                        <span className="ml-2 px-2 py-1 bg-gray-100 rounded">
                                            {b.status}
                                        </span>
                                    </p>
                                )}

                                {/* ADMIN ACTIONS */}
                                {role === "admin" && (
                                    <div className="flex justify-between mt-3">

                                        <button
                                            onClick={() => saveStatus(b._id)}
                                            className="flex items-center gap-1 bg-indigo-500 text-white px-3 py-1.5 rounded"
                                        >
                                            <Save size={16} />
                                            Save
                                        </button>

                                        <button
                                            onClick={() => deleteBooking(b._id)}
                                            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>

                                    </div>
                                )}

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}

export default BookingList;