import React, { useState, useCallback } from "react";
import Footer from "./Footer";
import Heading from "./Heading";

function Cont() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    // ✅ optimized change handler
    const handleChange = useCallback((e: any) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 👉 here you can call API later
            // await API.post("/contact", form);

            alert("Message Sent ✅");

            // ✅ reset form
            setForm({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });

        } catch (err) {
            alert("Something went wrong ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Heading
                h="Get in Touch"
                p="Have questions or need help planning your journey? Our team is here to guide you every step of the way."
            />

            <div className="bg-white md:px-20 px-6">

                {/* Heading */}
                <div className="text-center py-16">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                        How Can We Help You ?
                    </h1>
                    <p className="text-gray-600 mt-3 text-sm md:text-base">
                        Have questions or need help planning your trip? We’re here for you.
                    </p>
                </div>

                <div className="bg-blue-50 w-full md:w-[80%] md:mx-auto px-3 sm:px-5 md:px-16 py-6 md:py-10">

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                    >

                        {/* Name */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 mb-1 font-medium">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="input-style"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 mb-1 font-medium">
                                Your Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="input-style"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 mb-1 font-medium">
                                Phone
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="input-style"
                            />
                        </div>

                        {/* Subject */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 mb-1 font-medium">
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                placeholder="Enter subject"
                                className="input-style"
                            />
                        </div>

                        {/* Message */}
                        <div className="md:col-span-2 flex flex-col">
                            <label className="text-gray-700 mb-1 font-medium">
                                Your Message *
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Write your message..."
                                rows={4}
                                className="input-style resize-none"
                                required
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="md:col-span-2 w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300 shadow-md disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>

                    </form>
                </div>

                {/* Map */}
                <div className="mt-20">
                    <h1 className="text-center text-black text-3xl md:text-4xl font-bold">
                        Find Our Office on Map
                    </h1>

                    <p className="text-center text-sm md:text-base text-gray-400 mt-4">
                        Contact us and get strapped in for a better adventure experience in your life-time.
                    </p>

                    <div className="max-w-6xl mt-10 mx-auto px-6 md:px-16 pb-16">
                        <iframe
                            src="https://www.google.com/maps?q=Delhi&output=embed"
                            className="w-full h-[320px] rounded-2xl shadow-md"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}

export default React.memo(Cont);