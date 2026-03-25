import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function AdminPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [experience, setExperience] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const res = await API.get(`/experiences/${id}`);
                setExperience(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // ✅ optimized generic handler
    const handleChange = useCallback((field, value) => {
        setExperience((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    // ✅ safe nested update (slots)
    const updateSlot = (slotIndex, field, value) => {
        setExperience((prev) => {
            const updatedSlots = [...prev.slots];
            updatedSlots[slotIndex] = {
                ...updatedSlots[slotIndex],
                [field]: value,
            };
            return { ...prev, slots: updatedSlots };
        });
    };

    const updateTime = (slotIndex, timeIndex, field, value) => {
        setExperience((prev) => {
            const updatedSlots = [...prev.slots];
            const updatedTimes = [...updatedSlots[slotIndex].times];

            updatedTimes[timeIndex] = {
                ...updatedTimes[timeIndex],
                [field]: value,
            };

            updatedSlots[slotIndex].times = updatedTimes;

            return { ...prev, slots: updatedSlots };
        });
    };

    const handleSave = async () => {
        if (!experience?._id) return;

        setSaving(true);

        try {
            await API.put(`/experiences/${experience._id}`, experience);
            alert("Experience Updated Successfully");
            navigate("/");
        } catch (err) {
            alert("Update failed");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="text-center py-20 text-lg">Loading...</div>;
    }

    if (!experience) {
        return <div className="text-center py-20 text-lg">Not Found</div>;
    }

    return (
        <div className="min-h-screen bg-white text-gray-800 py-10">

            <div className="max-w-7xl mx-auto px-4 mb-8">
                <h1 className="text-3xl font-bold">Edit Experience</h1>
                <p className="text-gray-500">Update experience details</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-10">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-8">

                    {/* BASIC */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-4">Basic Info</h2>

                        <input
                            value={experience.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="w-full border p-2 mb-3"
                        />

                        <input
                            value={experience.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                            className="w-full border p-2 mb-3"
                        />

                        <textarea
                            value={experience.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="w-full border p-2"
                        />
                    </div>

                    {/* IMAGE */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <input
                            value={experience.image}
                            onChange={(e) => handleChange("image", e.target.value)}
                            className="w-full border p-2 mb-4"
                        />

                        <img
                            src={experience.image}
                            alt="preview"
                            loading="lazy"   // ✅ optimization
                            className="w-full h-80 object-cover rounded-lg"
                        />
                    </div>

                    {/* SLOTS */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-4">
                            Slot Management
                        </h2>

                        {experience.slots.map((slot, slotIndex) => (
                            <div key={slotIndex} className="border p-4 mb-4">

                                <input
                                    value={slot.date}
                                    onChange={(e) =>
                                        updateSlot(slotIndex, "date", e.target.value)
                                    }
                                    className="border p-2 w-full mb-3"
                                />

                                {slot.times.map((time, timeIndex) => (
                                    <div key={timeIndex} className="flex gap-2 mb-2">

                                        <input
                                            value={time.time}
                                            onChange={(e) =>
                                                updateTime(
                                                    slotIndex,
                                                    timeIndex,
                                                    "time",
                                                    e.target.value
                                                )
                                            }
                                            className="border p-2"
                                        />

                                        <input
                                            type="number"
                                            value={time.capacity}
                                            onChange={(e) =>
                                                updateTime(
                                                    slotIndex,
                                                    timeIndex,
                                                    "capacity",
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="border p-2"
                                        />

                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                </div>

                {/* RIGHT */}
                <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-24">

                    <input
                        type="number"
                        value={experience.price}
                        onChange={(e) =>
                            handleChange("price", Number(e.target.value))
                        }
                        className="w-full border p-2 mb-3"
                    />

                    <input
                        value={experience.duration}
                        onChange={(e) =>
                            handleChange("duration", e.target.value)
                        }
                        className="w-full border p-2 mb-3"
                    />

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full py-3 bg-yellow-400 rounded-lg"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default React.memo(AdminPage);