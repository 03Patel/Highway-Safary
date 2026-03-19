import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Footer from "./Footer";
import Heading from "./Heading";



const Cont: React.FC = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        alert("Message Sent ✅");
    };


    return (
        <div >
            <Heading />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-4">

                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Get in Touch
                </h1>

                <p className="max-w-2xl text-sm md:text-lg mb-6">
                    Have questions or need help planning your journey? Our team is here to guide you every step of the way.
                </p>

            </div>
            <div className="bg-white  px-20">

                {/* Heading */}
                <div className="text-center py-16 ">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        How Can We Help You ?
                    </h1>
                    <p className="text-gray-600 mt-3 text-sm md:text-base">
                        Have questions or need help planning your trip? We’re here for you.
                    </p>
                </div>
                <div className=" bg-blue-50 w-[80%] mx-auto px-20 py-10">

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8"
                    >
                        {/* Name */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 mb-1 font-medium">Your Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-black transition"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 mb-1 font-medium">Your Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none  text-black  transition"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 mb-1 font-medium">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none  text-black  transition"
                            />
                        </div>

                        {/* Subject */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 mb-1 font-medium">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                placeholder="Enter subject"
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none  text-black  transition"
                            />
                        </div>

                        {/* Message */}
                        <div className="md:col-span-2 flex flex-col">
                            <label className="text-gray-700 mb-1 font-medium">Your Message *</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Write your message..."
                                rows="5"
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none  text-black  transition resize-none"
                                required
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="md:col-span-2 w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300 shadow-md hover:shadow-lg"
                        >
                            Send Message
                        </button>
                    </form>

                </div>
                <br />



                <div className="mt-20">
                    <h1 className="text-center  text-black text-4xl font-bold ">Find Our Office on Map</h1>
                    <p className="text-center text-gray-400 mt-4">Contact us and get strapped in for a better adventure experience in your life-time. Just look for opportunity to be with nature.</p>

                    <div className="max-w-6xl  mt-10 mx-auto px-6 md:px-16 pb-16">

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
};

export default Cont;