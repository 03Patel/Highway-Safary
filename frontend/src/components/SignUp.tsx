import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import API from "../api/axios";
import background from "../assets/Background2.jpg";

function SignUp() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    // ✅ optimized handler
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post("/experiences/signup", form);

            alert(res.data.message || "Account created successfully");

            navigate("/signin");

        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">

            {/* Background */}
            <div className="relative w-full">
                <img
                    src={background}
                    alt="signup"
                    loading="lazy"   // ✅ lazy load
                    className="w-full h-screen object-cover"
                />

                {/* Overlay */}
                <div className="flex w-full absolute inset-0 items-center bg-black/30 justify-center">

                    <div className="w-full max-w-md px-8">

                        <h2 className="md:text-3xl text-xl text-gray-800 ml-[80px] font-bold mb-6">
                            Create Account
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Name */}
                            <div className="relative">
                                <User size={18} className="absolute left-3 top-3 text-gray-800" />
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="w-full border text-black p-3 pl-10 rounded-md"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-3 text-gray-800" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full border text-black p-3 pl-10 rounded-md"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock size={18} className="absolute left-3 top-3 text-gray-800" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full border text-black p-3 pl-10 rounded-md"
                                    required
                                />

                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-2.5 cursor-pointer text-gray-800"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
                            >
                                {loading ? "Creating..." : "Sign Up"}
                            </button>

                        </form>

                        <p className="text-sm mt-4">
                            Already have an account?{" "}
                            <Link to="/signin" className="ml-[10px] underline text-black font-bold">
                                Login
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(SignUp);