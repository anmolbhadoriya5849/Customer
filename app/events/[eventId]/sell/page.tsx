"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import SelectTickets, { TicketCategory } from "./SelectTickets";
import {
  User,
  Mail,
  Phone,
  ChevronLeft,
  CheckCircle2,
  CreditCard
} from "lucide-react";
import axios from "axios";
import { useAuth } from "@/lib/useAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SellPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const eventId = params.eventId as string;
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTickets, setSelectedTickets] = useState<TicketCategory[]>([]);
  const { user } = useAuth();

  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const distributorId = searchParams.get("d") ?? user?.id ?? "";

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

  // --- Actions ---

  function handleTicketChange(updatedTickets: TicketCategory[]) {
    setSelectedTickets(updatedTickets);
  }

  async function handlePayment() {
    const cart = selectedTickets.filter((ticket) => ticket.quantity > 0);

    const res = await axios.post(`${API_URL}/payment/initiate-payment`, {
      distributorId: "13c5e53a-fe8e-449e-b7f4-7341f403cba6",
      name: buyer.name,
      email: buyer.email,
      phone: buyer.phone,
      eventId,
      categoryId: cart[0].id,
      quantity: cart[0].quantity,
    });

    if (res.status === 200) {
      const accesskey = res.data.paymentLink.data;
      window.location.href = `https://pay.easebuzz.in/pay/${accesskey}`;
    }
  }

  function calculateTotal() {
    return selectedTickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white selection:bg-cyan-500/30 relative overflow-hidden">

      {/* Background Glow Effects (Maintaining Theme) */}
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
            <div className="w-10 h-10" /> /* Spacer to keep dots centered */
          )}

          {/* Progress Dots */}
          <div className="flex items-center gap-2.5 flex-1 justify-center">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${s === step ? "w-10 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]" :
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
              calculateTotal={calculateTotal}
              selectedTickets={selectedTickets}
              handlePayment={handlePayment}
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
  buyer: { name: string; email: string; phone: string };
  setBuyer: React.Dispatch<React.SetStateAction<{ name: string; email: string; phone: string }>>;
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
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
        <input
          type="email"
          placeholder="Email Address"
          value={buyer.email}
          onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
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
      disabled={!buyer.name || !buyer.email || !buyer.phone}
      onClick={onNext}
      className="w-full h-14 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
    >
      Continue to Review
    </button>
  </div>
);

const ReviewAndPayStep = ({
  calculateTotal,
  selectedTickets,
  handlePayment
}: {
  calculateTotal: () => number;
  selectedTickets: TicketCategory[];
  handlePayment: () => Promise<void> | void;
}) => {
  const total = calculateTotal();
  const cart = selectedTickets.filter(t => t.quantity > 0);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
        <div className="w-12 h-12 bg-violet-500/10 border border-violet-500/20 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
          <CreditCard className="text-violet-400 w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Order Summary</h2>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">Review your details before secure checkout.</p>
      </div>

      {/* Ticket Summary Box */}
      <div className="bg-slate-950/50 border border-slate-700 rounded-2xl p-5 sm:p-6 space-y-4 shadow-inner">
        {cart.map(t => (
          <div key={t.id} className="flex justify-between items-center text-sm sm:text-base border-b border-slate-800 pb-4 last:border-0 last:pb-0">
            <div>
              <span className="text-slate-200 font-semibold">{t.name}</span>
              <span className="bg-slate-800 text-cyan-400 text-xs font-bold px-2 py-1 rounded-md ml-3">x{t.quantity}</span>
            </div>
            <span className="text-white font-mono font-bold tracking-wider">₹{t.price * t.quantity}</span>
          </div>
        ))}

        <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
          <span className="text-slate-400 font-medium uppercase tracking-wider text-sm">Total Payable</span>
          <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
            ₹{total}
          </span>
        </div>
      </div>

      {/* Action Area */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Secure encrypted payment via Easebuzz
        </div>
        <button
          onClick={handlePayment}
          className="w-full h-14 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
        >
          Pay ₹{total} Securely
        </button>
      </div>
    </div>
  );
};