"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { FileText, Ticket, LogOut, LayoutDashboard, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleDownloadInvoice = () => {
    router.push("/dashboard/invoices");
  };

  //added

  const handleAccessPass = () => {
    router.push("/dashboard/ticket");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A0C10] px-4 sm:px-6 relative overflow-hidden font-sans">
      
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        <div className="w-full bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">

          {/* Header Section */}
          <div className="mb-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-white/[0.03] border border-white/5 rounded-[1.25rem] flex items-center justify-center mb-6 shadow-inner">
              <LayoutDashboard className="text-cyan-400 w-8 h-8" />
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-400 mt-3 text-sm leading-relaxed">
              Manage your event passes, billing, and securely download your invoices.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            
            {/* Primary Action */}
            <button
              onClick={handleAccessPass}
              className="group w-full h-16 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-cyan-500/30 text-white text-base font-bold rounded-2xl transition-all flex items-center justify-between px-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Ticket className="w-5 h-5" />
                </div>
                <span>Access Your Pass</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </button>

            {/* Secondary Action */}
            <button
              onClick={handleDownloadInvoice}
              className="group w-full h-16 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 text-slate-300 hover:text-white text-base font-bold rounded-2xl transition-all flex items-center justify-between px-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                </div>
                <span>Download Invoice</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}