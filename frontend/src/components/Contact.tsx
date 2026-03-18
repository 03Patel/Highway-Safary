import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactForm {
    name: string;
    email: string;
    message: string;
}

const Contact: React.FC = () => {
    const [form, setForm] = useState<ContactForm>({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            console.log(form);
            setSuccess(true);
            setForm({ name: "", email: "", message: "" });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* Heading */}
            <div className="text-center py-12 bg-gray-50">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Contact Us
                </h1>
                <p className="text-gray-600 mt-3">
                    Have questions or need help planning your trip? We’re here for you.
                </p>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 md:px-16 py-12">
                {/* Left Info */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <MapPin className="text-gray-600" />
                        <div>
                            <h3 className="text-lg font-semibold">Address</h3>
                            <p className="text-gray-600">Delhi, India</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Mail className="text-gray-600" />
                        <div>
                            <h3 className="text-lg font-semibold">Email</h3>
                            <p className="text-gray-600">support@highwaysafary.com</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Phone className="text-gray-600" />
                        <div>
                            <h3 className="text-lg font-semibold">Phone</h3>
                            <p className="text-gray-600">+91 98765 43210</p>
                        </div>
                    </div>
                </div>

                {/* Right Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4"
                >
                    {success && (
                        <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 flex justify-between items-center">
                            <span>✅ Message sent successfully!</span>
                            <button
                                type="button"
                                onClick={() => setSuccess(false)}
                                className="font-bold"
                            >
                                X
                            </button>
                        </div>
                    )}

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full border p-3 rounded-md"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="w-full border p-3 rounded-md"
                        required
                    />

                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows={5}
                        className="w-full border p-3 rounded-md"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>

            {/* Google Map */}
            <div className="max-w-6xl mx-auto px-6 md:px-16 pb-12">
                <iframe
                    src="https://www.google.com/maps?q=Delhi&output=embed"
                    className="w-full h-[300px] rounded-xl"
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;