"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner"
import SelectTickets, { TicketCategory } from "./SelectTickets";
import {
  User,
  Phone,
  ChevronLeft,
  CheckCircle2,
  CreditCard
} from "lucide-react";
import axios from "axios";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PLATFORM_FEE = 44.72;
const GST_RATE = 0.18;

export default function SellPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const eventId = params.eventId as string;
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTickets, setSelectedTickets] = useState<TicketCategory[]>([]);
  const { user, loading } = useAuth();
  const router = useRouter();

  const [buyer, setBuyer] = useState({ name: "", phone: "" });
  // const distributorId = searchParams.get("d") ?? user?.id ?? "";

  console.log("USER:", user);
  console.log("LOADING:", loading);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch(`${API_URL}/eventManager/events/${eventId}/categories`);
      const data = await res.json();
      console.log(data);

      const uiCategories: TicketCategory[] = data.categories
        .filter((c: any) => c.visibility !== "HIDDEN")
        .map((c: any) => ({
          id: c.id,
          name: c.name,
          price: c.price,
          description: c.description || "First come, first served",
          maxPerUser: c.maxPerUser || 10,
          quantity: 0,
          status: c.status,
          visibility: c.visibility,
          saleStart: c.saleStart,
          saleEnd: c.saleEnd,
        }));

      setSelectedTickets(uiCategories);
    }

    fetchCategories();
  }, [eventId]);

  function handleTicketChange(updatedTickets: TicketCategory[]) {
    setSelectedTickets(updatedTickets);
  }

async function handlePayment() {
  const cart = selectedTickets.filter((ticket) => ticket.quantity > 0);

  if (cart.length === 0) {
    toast("Please select at least one ticket");
    return;
  }

  if (loading) {
    toast("Please wait...");
    return;
  }

  if (!user?.email) {
    toast("Please login again");
    router.push(`/login?next=/event/${eventId}`);
    return;
  }

  try {
    const res = await axios.post(
      `${API_URL}/payment/initiate-payment`,
      {
        distributorId: "13c5e53a-fe8e-449e-b7f4-7341f403cba6",
        name: buyer.name,
        email: user.email,
        phone: buyer.phone,
        eventId,
        categoryId: cart[0].id,
        quantity: cart[0].quantity,
      },
      {
        validateStatus: (status) => status < 500,
      }
    );

    if (res.status === 200) {
      const accesskey = res.data.paymentLink.data;
      window.location.href = `https://pay.easebuzz.in/pay/${accesskey}`;
    } else if (res.status === 400) {
      toast("Tickets Sold Out");
    }
  } catch (err) {
    toast("Something went wrong. Try again.");
  }
}

  function calculateSubtotal() {
    return selectedTickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);
  }

  function getTotalQuantity() {
    return selectedTickets.reduce((sum, t) => sum + t.quantity, 0);
  }

  function calculateTotal() {
    const qty = getTotalQuantity();
    const platformFee = PLATFORM_FEE * qty;
    const gst = Math.round(platformFee * GST_RATE);
    return calculateSubtotal() + platformFee + gst;
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?next=/events/${eventId}/sell`);
    }
  }, [user, loading, router, eventId]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white selection:bg-cyan-500/30 relative overflow-hidden">

      {/* Background Glow Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto p-4 sm:p-6 md:p-8 pt-8">

        {/* Header / Back Navigation */}
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => (prev === 3 ? 2 : 1))}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-10 h-10" />
          )}

          {/* Progress Dots */}
          <div className="flex items-center gap-2.5 flex-1 justify-center">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  s === step ? "w-10 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]" :
                  s < step ? "w-6 bg-cyan-600/50" : "w-2 bg-slate-800"
                }`}
              />
            ))}
          </div>
          <div className="w-10 h-10" />
        </div>

        {/* Form Containers */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
          {step === 1 && (
            <SelectTickets
              tickets={selectedTickets}
              setTickets={handleTicketChange}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <BuyerDetailsStep
              buyer={buyer}
              setBuyer={setBuyer}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <ReviewAndPayStep
              calculateSubtotal={calculateSubtotal}
              calculateTotal={calculateTotal}
              selectedTickets={selectedTickets}
              handlePayment={handlePayment}
              totalQuantity={getTotalQuantity()}
            />
          )}
        </div>
      </div>
    </main>
  );
}

// --- SUB COMPONENTS ---

const BuyerDetailsStep = ({
  buyer,
  setBuyer,
  onNext,
}: {
  buyer: { name: string; phone: string };
  setBuyer: React.Dispatch<React.SetStateAction<{ name: string; phone: string }>>;
  onNext: () => void;
}) => (
  <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
      <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
        <User className="text-cyan-400 w-6 h-6" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Buyer Details</h2>
      <p className="text-slate-400 mt-2 text-sm sm:text-base">Who are we issuing these passes to?</p>
    </div>

    <div className="space-y-4">
      <div className="relative group">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
        <input
          type="text"
          placeholder="Full Name"
          value={buyer.name}
          onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
          className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl py-3.5 pl-12 pr-4 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-600"
        />
      </div>
      <div className="relative group">
        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
        <input
          type="tel"
          placeholder="Phone Number"
          value={buyer.phone}
          onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
          className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl py-3.5 pl-12 pr-4 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-600"
        />
      </div>
    </div>

    <button
      disabled={!buyer.name || !buyer.phone}
      onClick={onNext}
      className="w-full h-14 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
    >
      Continue to Review
    </button>
  </div>
);

const ReviewAndPayStep = ({
  calculateSubtotal,
  calculateTotal,
  selectedTickets,
  paymentMethod,
  setPaymentMethod,
  handlePayment
}: any) => {
  const subtotal = calculateSubtotal();
  const cart = selectedTickets.filter((t: any) => t.quantity > 0);
  const totalQuantity = cart.reduce((sum: number, t: any) => sum + t.quantity, 0);
  const platformFee = PLATFORM_FEE * totalQuantity;
  const gstAmount = Math.round(platformFee * GST_RATE);
  const total = Math.round(subtotal + platformFee + gstAmount);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white">Order Summary</h2>
        <p className="text-sm text-gray-400">Review details before issuing pass</p>
      </div>

      {/* Ticket Summary */}
      <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-5 space-y-3">
        {/* Ticket line items */}
        {cart.map((t: any) => (
          <div key={t.id} className="flex justify-between items-center text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
            <div>
              <span className="text-white font-medium">{t.name}</span>
              <span className="text-gray-500 text-xs ml-2">x{t.quantity}</span>
            </div>
            <span className="text-white font-mono">₹{t.price * t.quantity}</span>
          </div>
        ))}

        {/* Subtotal */}
        <div className="flex justify-between items-center text-sm pt-1 border-t border-white/10">
          <span className="text-gray-400">Subtotal</span>
          <span className="text-white font-mono">₹{subtotal}</span>
        </div>

        {/* Platform Fee */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">
            Platform Fee <span className="text-xs text-gray-600">(x{totalQuantity})</span>
          </span>
          <span className="text-white font-mono">₹{platformFee}</span>
        </div>

        {/* GST on Platform Fee */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">
            GST on Platform Fee{" "}
            <span className="text-xs text-gray-600">(18%)</span>
          </span>
          <span className="text-white font-mono">₹{gstAmount}</span>
        </div>

        {/* Grand Total */}
        <div className="flex justify-between items-center pt-3 border-t border-white/10">
          <span className="text-gray-400">Total Payable</span>
          <span className="text-xl font-bold text-white">₹{total}</span>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handlePayment}
        className="w-full py-4 bg-blue-600 hover:bg-blue-900 rounded-xl font-bold text-white shadow-lg shadow-green-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        <CheckCircle2 className="w-5 h-5" /> Confirm & Issue Pass
      </button>
    </div>
  );
};