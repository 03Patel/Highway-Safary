import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import background from "../assets/background.jpg"
import { AuthContext } from "../reducers/AuthContext";

function SignIn() {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await API.post("/experiences/signin", { email, password });

            const user = res.data; // {id, email, role, userId}
            const token = res.data.token;
           


            // Store token and role in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", user.user.role)
            localStorage.setItem("email", user.user.email);
            localStorage.setItem("userId", user.user.userId)

            // Update context
            dispatch({
                type: "LOGIN",
                payload: {
                    userId: user.user.userId,
                    email: user.user.email,
                    role: user.user.role,
                    token: token,

                }
            });

            navigate("/");

        } catch (error: any) {
            alert(error.response?.data?.message || "Login failed");
        }
    }
    return (
        <div className="h-screen  ">

            <div className="relative">
                <img src={background} alt="" className="w-full h-screen object-cover" />
                {/* Login Form */}
                <div className="absolute inset-0 w-full h-full bg-black/50 flex items-center justify-center">
                    <div className="w-full max-w-md px-8">
                        <h2 className="text-3xl ml-[130px]   font-bold mb-6">Login</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-3 text-gray-300" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border p-3 pl-10 rounded-md"

                                />
                            </div>

                            <div className="relative">
                                <Lock size={18} className="absolute left-3 top-3 text-gray-300" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border p-3 pl-10 rounded-md"

                                />
                                <span onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 cursor-pointer text-gray-300"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-300"
                            >
                                Login
                            </button>
                        </form>

                        <p className="text-sm mt-4">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-blue-500">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
