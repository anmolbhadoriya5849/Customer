"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// This defines the shape of the data coming from the backend
interface Pass {
  id: string;
  qrToken: string;
  qrKey: string;
  status: string;
  qrDataUrl: string;
  event: { name: string };
  category: { name: string };
  distributor: { name: string };
  order: { txnid: string; invoiceKey: string };
}

export default function TicketPage() {
  const [passes, setPasses] = useState<Pass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/get-signed-url-passes`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tickets. Are you logged in?");
        }

        const data = await response.json();
        setPasses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#020617] px-6 py-12">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-8">Your Tickets</h1>

        {/* Show a loading message while waiting for the backend */}
        {loading && <p className="text-gray-400">Loading your tickets...</p>}

        {/* Show an error message if something went wrong */}
        {error && <p className="text-red-500 bg-red-500/10 p-4 rounded-lg border border-red-500/20">{error}</p>}

        {/* If no tickets are found after loading */}
        {!loading && passes.length === 0 && !error && (
          <p className="text-gray-400">You do not have any tickets yet.</p>
        )}

        {/* Loop through the tickets and display them */}
        <div className="space-y-6">
          {passes.map((pass) => (
            <div
              key={pass.id}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex flex-col md:flex-row gap-6 shadow-xl"
            >
              {/* Left Side: Ticket Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{pass.event.name}</h2>
                  <p className="text-indigo-400 font-medium">{pass.category.name} Pass</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Distributor</p>
                    <p className="text-slate-200 font-medium">{pass.distributor.name}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Status</p>
                    <p className={`font-medium ${pass.status === 'ACTIVE' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {pass.status}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-slate-400">Transaction ID</p>
                    <p className="text-slate-200 font-mono text-xs truncate">{pass.order.txnid}</p>
                  </div>
                </div>
              </div>

              {/* Right Side: QR Code */}
              <div className="flex flex-col items-center justify-center bg-white p-3 rounded-xl shrink-0 w-40 h-40 self-center">
                <Image
                  src={pass.qrDataUrl}
                  alt="Ticket QR Code"
                  className="w-full h-full object-contain"
                  width={160}
                  height={160}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
