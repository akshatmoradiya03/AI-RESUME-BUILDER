import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
import {
    FaUser,
    FaLock,
    FaSignInAlt,
    FaUserPlus,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [signUpError, setSignUpError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signInError, setSignInError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignInSubmit = async (event) => {
        setSignInError("");
        event.preventDefault();
        const { email, password } = event.target.elements;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            setSignInError("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        try {
            console.log("Login Started in Frontend");
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email.value,
                password.value
            );
            console.log("Login Completed", userCredential.user);
            navigate("/");
        } catch (error) {
            setSignInError(error.message);
            console.log("Login Failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpSubmit = async (event) => {
        setSignUpError("");
        event.preventDefault();
        const { email, password } = event.target.elements;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            setSignUpError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        console.log("User Registration Started");
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email.value,
                password.value
            );
            console.log("User Registration Successful", userCredential.user);
            navigate("/");
        } catch (error) {
            console.log("User Registration Failed", error.message);
            setSignUpError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-green-400 to-purple-500">
            <motion.div
                className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-around mb-6 border-b border-gray-200">
                    <button
                        onClick={() => setIsSignUp(false)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-t-lg ${
                            !isSignUp ? "bg-green-400 text-white" : "text-gray-600"
                        }`}
                    >
                        <FaSignInAlt />
                        Sign In
                    </button>
                    <button
                        onClick={() => setIsSignUp(true)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-t-lg ${
                            isSignUp ? "bg-green-400 text-white" : "text-gray-600"
                        }`}
                    >
                        <FaUserPlus />
                        Sign Up
                    </button>
                </div>

                <div className="relative overflow-hidden h-80">
                    {" "}
                    <motion.div
                        className={`absolute inset-0 transition-transform duration-500 ${
                            isSignUp ? "translate-x-0" : "translate-x-full"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isSignUp ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            Sign Up
                        </h2>
                        <form onSubmit={handleSignUpSubmit} className="space-y-4">
                            <div className="flex items-center border rounded-md border-gray-300 p-2 gap-3">
                                <FaUser className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    name="fullname"
                                    placeholder="Full Name"
                                    required
                                    className="outline-none w-full"
                                />
                            </div>
                            <div className="flex items-center border rounded-md border-gray-300 p-2 gap-3">
                                <FaUser className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    className="outline-none w-full"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div className="flex items-center border rounded-md border-gray-300 p-2 gap-3">
                                <FaLock className="text-gray-400 mr-2" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    required
                                    className="outline-none w-full"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 ml-2"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-400 text-white py-2 rounded-md flex justify-center items-center"
                            >
                                {loading ? (
                                    <Loader2 className=" animate-spin text-center" />
                                ) : (
                                    "Register User"
                                )}
                            </button>
                            {signUpError && (
                                <div className="text-red-500 text-center mt-2">
                                    {signUpError}
                                </div>
                            )}
                        </form>
                    </motion.div>
                    <motion.div
                        className={`absolute inset-0 transition-transform duration-500 ${
                            isSignUp ? "-translate-x-full" : "translate-x-0"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: !isSignUp ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            Sign In
                        </h2>
                        <form onSubmit={handleSignInSubmit} className="space-y-4">
                            <div className="flex items-center border rounded-md border-gray-300 p-2 gap-3">
                                <FaUser className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    className="outline-none w-full"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div className="flex items-center border rounded-md border-gray-300 p-2 gap-3">
                                <FaLock className="text-gray-400 mr-2" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    required
                                    className="outline-none w-full"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 ml-2"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-400 text-white py-2 rounded-md flex justify-center items-center"
                            >
                                {loading ? (
                                    <Loader2 className=" animate-spin text-center" />
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                            {signInError && (
                                <div className="text-red-500 text-center mt-2">
                                    {signInError}
                                </div>
                            )}
                        </form>
                        <div className="mt-4 text-center text-sm">
                            Don't have an account?{" "}
                            <button
                                onClick={() => setIsSignUp(true)}
                                className="text-blue-500 hover:underline"
                            >
                                Sign Up
                            </button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default AuthPage;