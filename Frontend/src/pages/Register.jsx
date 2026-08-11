import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import API from "../services/api";

export default function Register({ setActiveLink, onLogin }) {
  const [step, setStep] = useState("register"); // "register" | "verify"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !email || !password) {
      setError("PLEASE FILL IN ALL FIELDS.");
      return;
    }
    setIsSubmitting(true);
    try {
      await API.post("/auth/register", { username, email, password });
      setMessage("OTP SENT TO YOUR EMAIL.");
      setStep("verify");
    } catch (err) {
      setError(err.response?.data?.detail?.toUpperCase() || "REGISTRATION FAILED.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    if (!otp) {
      setError("PLEASE ENTER THE OTP.");
      return;
    }
    setIsSubmitting(true);
    try {
      await API.post("/auth/verify-otp", { email, otp });
      if (onLogin) onLogin();
      if (setActiveLink) setActiveLink("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail?.toUpperCase() || "INVALID OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await API.post("/auth/resend-otp", { email });
      setMessage("OTP RESENT TO YOUR EMAIL.");
    } catch (err) {
      setError(err.response?.data?.detail?.toUpperCase() || "FAILED TO RESEND OTP.");
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-6rem)] w-full flex flex-col justify-center items-center overflow-hidden bg-transparent text-white px-4 py-8">
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="w-full border-4 border-white bg-surface/95 shadow-[8px_8px_0px_0px_rgba(40,129,205,0.4)] backdrop-blur-md overflow-hidden flex flex-col font-['Pixelify_Sans'] tracking-wide">

          {/* Header */}
          <div className="bg-primary border-b-4 border-white px-4 py-2 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <HiOutlineShieldCheck className="h-4 w-4 text-accent" />
              <span className="font-['Press_Start_2P'] text-[10px] text-white tracking-widest uppercase">
                ★ {step === "register" ? "REGISTER.EXE" : "VERIFY-OTP.EXE"} ★
              </span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-white bg-transparent flex items-center justify-center font-['Press_Start_2P'] text-[8px] text-white">-</span>
              <span className="w-3.5 h-3.5 border-2 border-white bg-transparent flex items-center justify-center font-['Press_Start_2P'] text-[8px] text-white">■</span>
              <span className="w-3.5 h-3.5 border-2 border-white bg-red-500 flex items-center justify-center font-['Press_Start_2P'] text-[8px] text-white">X</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col items-center">
            <div className="mb-4 px-3 py-1 border-2 border-primary-light/50 bg-primary/10 text-primary-light font-['Press_Start_2P'] text-[9px] tracking-wide animate-pulse">
              {step === "register" ? "[ CREATE NEW ACCOUNT ]" : "[ ENTER VERIFICATION CODE ]"}
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide mb-2 font-['Press_Start_2P'] text-white uppercase text-center">
              {step === "register" ? "Join Now" : "Verify Email"}
            </h1>

            {error && (
              <div className="w-full mb-4 p-3 border-2 border-red-500 bg-red-500/10 text-red-400 font-['Press_Start_2P'] text-[9px] leading-relaxed">
                ⚠ {error}
              </div>
            )}
            {message && (
              <div className="w-full mb-4 p-3 border-2 border-green-500 bg-green-500/10 text-green-400 font-['Press_Start_2P'] text-[9px] leading-relaxed">
                ✓ {message}
              </div>
            )}

            {step === "register" ? (
              <form onSubmit={handleRegister} className="w-full flex flex-col gap-5">
                {/* Username */}
                <div className="flex flex-col">
                  <label className="font-['Press_Start_2P'] text-[9px] text-text-secondary uppercase mb-2 flex items-center gap-1.5">
                    <HiOutlineUser className="h-3.5 w-3.5 text-accent" /> Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="coolstudent99"
                    className="w-full px-3.5 py-2.5 bg-surface-dark/90 border-2 border-white/60 text-white font-['Pixelify_Sans'] text-base focus:outline-none focus:border-accent transition-all placeholder:text-white/30"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="font-['Press_Start_2P'] text-[9px] text-text-secondary uppercase mb-2 flex items-center gap-1.5">
                    <HiOutlineEnvelope className="h-3.5 w-3.5 text-accent" /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full px-3.5 py-2.5 bg-surface-dark/90 border-2 border-white/60 text-white font-['Pixelify_Sans'] text-base focus:outline-none focus:border-accent transition-all placeholder:text-white/30"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                  <label className="font-['Press_Start_2P'] text-[9px] text-text-secondary uppercase mb-2 flex items-center gap-1.5">
                    <HiOutlineLockClosed className="h-3.5 w-3.5 text-accent" /> Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 pr-10 bg-surface-dark/90 border-2 border-white/60 text-white font-['Pixelify_Sans'] text-base focus:outline-none focus:border-accent transition-all placeholder:text-white/30"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-text-secondary hover:text-white focus:outline-none cursor-pointer">
                      {showPassword ? <HiOutlineEyeSlash className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-['Press_Start_2P'] text-xs px-6 py-3.5 border-4 border-white bg-primary text-white font-bold transition-all duration-75 shadow-[5px_5px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-primary-light cursor-pointer uppercase flex items-center justify-center gap-2.5 mt-2 disabled:opacity-50"
                >
                  {isSubmitting ? <span>CREATING ACCOUNT...</span> : <><span>Create Account</span><HiOutlineArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="w-full flex flex-col gap-5">
                <p className="text-xs text-text-secondary font-['Pixelify_Sans'] text-center">
                  Enter the 6-digit OTP sent to <span className="text-accent">{email}</span>
                </p>
                <div className="flex flex-col">
                  <label className="font-['Press_Start_2P'] text-[9px] text-text-secondary uppercase mb-2">OTP Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full px-3.5 py-2.5 bg-surface-dark/90 border-2 border-white/60 text-white font-['Pixelify_Sans'] text-base text-center tracking-[0.5em] focus:outline-none focus:border-accent transition-all placeholder:text-white/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-['Press_Start_2P'] text-xs px-6 py-3.5 border-4 border-white bg-primary text-white font-bold transition-all duration-75 shadow-[5px_5px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-primary-light cursor-pointer uppercase flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  {isSubmitting ? <span>VERIFYING...</span> : <><span>Verify OTP</span><HiOutlineArrowRight className="h-4 w-4" /></>}
                </button>

                <button type="button" onClick={handleResend} className="text-[9px] font-['Press_Start_2P'] text-accent hover:text-accent/80 underline text-center cursor-pointer">
                  Resend OTP
                </button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t-2 border-white/10 w-full text-center flex flex-col items-center gap-2">
              <p className="text-xs text-text-secondary font-['Pixelify_Sans'] tracking-wide">
                Already have an account?
              </p>
              <Link
                to="/login"
                onClick={() => setActiveLink && setActiveLink("/login")}
                className="font-['Press_Start_2P'] text-[9px] text-accent hover:text-accent/80 transition-colors uppercase underline tracking-wider flex items-center gap-1.5"
              >
                <HiOutlineSparkles className="h-3.5 w-3.5 inline" /> Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
