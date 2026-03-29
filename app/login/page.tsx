"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, ArrowLeft, KeyRound, ShieldCheck } from "lucide-react";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import { Suspense } from 'react';
import { useAuth } from "@/lib/useAuth";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  const redirectPath = nextPath?.startsWith("/") ? nextPath : "/";
  const { refreshUser } = useAuth();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/customer/send-otp`, { email }, 
        { withCredentials : true }
      );

      if (response.status === 200) {
        setStep(2);
      }

    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error || "Failed to send OTP"
        : "Failed to send OTP";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/verify-otp`,
        { email, otp },
        { withCredentials : true }
      );

      if (response.status === 200) {
        toast.success("OTP verified successfully");
        await refreshUser();
        router.push(redirectPath);
      }

    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error || "Invalid OTP"
        : "Invalid OTP";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A0C10] px-4 sm:px-6 relative overflow-hidden font-sans">
      
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-[100%] blur-[120px] opacity-70" />
      </div>

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        
        {/* Navigation */}
        <div className="w-full mb-8">
            <Link
            href="/"
            className="inline-flex items-center text-slate-400 hover:text-cyan-400 transition-colors group text-sm font-semibold tracking-wide"
            >
            <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mr-3 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all">
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            Back to Home
            </Link>
        </div>

        {/* Login Card */}
        <div className="w-full bg-white/[0.02] border border-white/5 p-8 sm:p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-10 text-center flex flex-col items-center">
                  <div className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                    <KeyRound className="text-cyan-400 w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
                  <p className="text-slate-400 mt-3 text-sm leading-relaxed">Enter the email you used during purchase to access your passes.</p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-slate-300 ml-1 text-xs font-bold uppercase tracking-widest">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="bg-[#0A0C10]/50 border-white/10 text-white pl-12 h-14 rounded-2xl focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all placeholder:text-slate-600 text-base"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-white text-black hover:bg-slate-200 font-bold rounded-2xl transition-all text-base mt-4 border-0"
                  >
                    {loading ? <Loader2 className="animate-spin text-black" /> : "Send Secure Code"}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="mb-10 flex flex-col items-center">
                  <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                    <ShieldCheck className="text-cyan-400 w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">Verify Identity</h2>
                  <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                    We sent a secure code to <br />
                    <span className="text-white font-semibold">{email}</span>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-8">
                  <div className="flex justify-center w-full">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup className="gap-2 sm:gap-3">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="w-12 h-14 sm:w-14 sm:h-16 text-lg sm:text-xl font-bold bg-[#0A0C10]/50 border-white/10 text-white rounded-2xl focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <div className="space-y-4 pt-2">
                    <Button
                      type="submit"
                      disabled={loading || otp.length < 6}
                      className="w-full h-14 bg-white text-black hover:bg-slate-200 font-bold rounded-2xl transition-all text-base disabled:opacity-50 disabled:bg-white/50 border-0"
                    >
                      {loading ? <Loader2 className="animate-spin text-black" /> : "Verify & Login"}
                    </Button>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm font-semibold text-slate-500 hover:text-white transition-colors"
                    >
                      Use a different email?
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-slate-600 text-xs mt-8 font-medium">
          By logging in, you agree to PassX Terms of Service & Privacy Policy.
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-[#0A0C10]" />}>
      <LoginContent />
    </Suspense>
  );
}