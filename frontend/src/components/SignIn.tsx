import React, { useState, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import background from "../assets/background.jpg";
import { AuthContext } from "../reducers/AuthContext";

function SignIn() {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ single handler (better performance)
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post("/experiences/signin", form);

            const { token, user } = res.data;

            // ✅ store data
            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);
            localStorage.setItem("email", user.email);
            localStorage.setItem("userId", user.userId);

            // ✅ update context
            dispatch({
                type: "LOGIN",
                payload: {
                    userId: user.userId,
                    email: user.email,
                    role: user.role,
                    token,
                }
            });

            navigate("/");

        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen">

            <div className="relative">
                <img
                    src={background}
                    alt="background"
                    loading="lazy" // ✅ lazy load
                    className="w-full h-screen object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">

                    <div className="w-full max-w-md px-8">
                        <h2 className="text-3xl text-white text-center font-bold mb-6">
                            Login
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Email */}
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-3 text-gray-300" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full border p-3 pl-10 rounded-md"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock size={18} className="absolute left-3 top-3 text-gray-300" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full border p-3 pl-10 rounded-md"
                                    required
                                />

                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-2.5 cursor-pointer text-gray-300"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-300 transition duration-300 disabled:opacity-50"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>

                        </form>

                        <p className="text-sm mt-4 text-white">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-blue-400">
                                Sign Up
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default React.memo(SignIn);