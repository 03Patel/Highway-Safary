import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import API from "../api/axios";
import background from "../assets/Background2.jpg"

function SignUp() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {


            const res = await API.post("/experiences/signup", form);

            alert(res.data.message || "Account created successfully");

            navigate("/signin");

        } catch (err: any) {

            alert(err.response?.data?.message || "Signup failed");

        }
    };

    return (
        <div className="min-h-screen flex">

            {/* Left Image */}
            <div className=" relative" >
                <img src={background} alt="" className=" w-full h-screen " />

                {/* Form */}
                <div className="flex w-full absolute inset-0 items-center bg-black/30 justify-center ">

                    <div className="w-full max-w-md px-8">

                        <h2 className="md:text-3xl text-xl text-gray-800 ml-[80px] font-bold mb-6">Create Account</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="relative">
                                <User size={18} className="absolute left-3 top-3 text-gray-800" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className="w-full border text-black p-3 pl-10 rounded-md"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-3 text-gray-800" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full border text-black p-3 pl-10 rounded-md"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="relative">
                                <Lock size={18} className="absolute left-3 top-3 text-gray-800" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="w-full border text-black p-3 pl-10 rounded-md"
                                    onChange={handleChange}
                                />
                                <span onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 cursor-pointer text-gray-800"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}

                                </span>
                            </div>

                            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
                                Sign Up
                            </button>

                        </form>

                        <p className="text-sm mt-4">
                            Already have an account?{" "}
                            <Link to="/signin" className=" ml-[10px] underline text-black font-bold">
                                Login
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );

}

export default SignUp;