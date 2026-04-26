"use client";

import { useMemo } from "react";
import { Plus, Minus, Ticket } from "lucide-react";

export type TicketCategory = {
  id: string;
  name: string;
  price: number;
  description?: string;
  maxPerUser?: number;
  quantity: number;
  status?: "ACTIVE" | "PAUSED" | "SOLD_OUT";
  visibility?: "PUBLIC" | "HIDDEN";
  saleStart?: string;
  saleEnd?: string;
};

const MAX_GLOBAL_TICKETS = 10;

export default function SelectTickets({
  tickets,
  setTickets,
  onNext,
}: {
  tickets: TicketCategory[];
  setTickets: (t: TicketCategory[]) => void;
  onNext: () => void;
}) {

  const totalTickets = useMemo(
    () => tickets.reduce((sum, t) => sum + t.quantity, 0),
    [tickets]
  );

  const totalAmount = useMemo(
    () => tickets.reduce((sum, t) => sum + t.quantity * t.price, 0),
    [tickets]
  );

  // --- RESTORED LOGIC START ---
  function increase(id: string) {
    if (totalTickets >= MAX_GLOBAL_TICKETS) return;

    setTickets(
      tickets.map((t) =>
        t.id === id
          ? { ...t, quantity: t.quantity > 0 ? t.quantity + 1 : 1 }
          : { ...t, quantity: 0 } // This line ensures other categories reset to 0
      )
    );


  }

  function decrease(id: string) {
    setTickets(
      tickets.map((t) =>
        t.id === id && t.quantity > 0 ? { ...t, quantity: t.quantity - 1 } : t
      )
    );
  }
  // --- RESTORED LOGIC END ---

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white">Select Tickets</h2>
        <p className="text-sm text-gray-400 mt-1">
          You can select up to {MAX_GLOBAL_TICKETS} tickets.
        </p>
      </div>

      {/* Ticket List */}
      <div className="space-y-3">
        {tickets
          .map(ticket => {
            const now = new Date();
            const saleStart = ticket.saleStart ? new Date(ticket.saleStart) : null;
            const saleEnd = ticket.saleEnd ? new Date(ticket.saleEnd) : null;

            const isNotStarted = saleStart && now < saleStart;
            const isEnded = saleEnd && now > saleEnd;
            const isSoldOut = ticket.status === "SOLD_OUT";
            const isPaused = ticket.status === "PAUSED";

            const isUnavailable = isNotStarted || isEnded || isSoldOut || isPaused;

            let statusMessage = "";
            if (isSoldOut) statusMessage = "Sold Out";
            else if (isPaused) statusMessage = "Sales Paused";
            else if (isEnded) statusMessage = "Sales Ended";
            else if (isNotStarted) {
              statusMessage = `Starts ${saleStart.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`;
            }

            return (
              <div
                key={ticket.id}
                className={`flex justify-between items-center p-4 rounded-2xl border transition-all duration-200 ${ticket.quantity > 0
                  ? "bg-indigo-900/10 border-indigo-500/50"
                  : isUnavailable
                    ? "bg-gray-900/50 border-gray-800/50 opacity-75"
                    : "bg-gray-900 border-gray-800 hover:border-gray-700"
                  }`}
              >
                <div>
                  <p className={`font-bold ${ticket.quantity > 0 ? "text-white" : "text-gray-300"}`}>
                    {ticket.name}
                  </p>
                  {ticket.description && (
                    <p className="text-xs text-gray-500">{ticket.description}</p>
                  )}
                  <p className="text-sm font-mono text-gray-400 mt-1">₹{ticket.price}</p>
                </div>

                {isUnavailable ? (
                  <div className="px-4 py-1.5 rounded-xl bg-gray-800/50 text-gray-500 text-xs font-bold uppercase tracking-wider border border-gray-700/50 text-center">
                    {statusMessage}
                  </div>
                ) : ticket.quantity === 0 ? (
                  <button
                    onClick={() => increase(ticket.id)}
                    className="px-5 py-2 rounded-xl border border-indigo-500/30 text-indigo-400 text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all hover:scale-105 active:scale-95"
                  >
                    Add
                  </button>
                ) : (
                  <div className="flex items-center gap-3 bg-black/40 rounded-xl p-1 border border-white/10">
                    <button
                      onClick={() => decrease(ticket.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-white w-4 text-center">{ticket.quantity}</span>
                    <button
                      onClick={() => increase(ticket.id)}
                      disabled={totalTickets >= MAX_GLOBAL_TICKETS}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Spacer   j*/}
      <div className="h-24" />

      {/* Bottom Summary Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent z-10">
        <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 p-4 rounded-2xl shadow-2xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
              <Ticket className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Total</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-white">₹{totalAmount}</span>
                <span className="text-xs text-gray-500">for {totalTickets} tix</span>
              </div>
            </div>
          </div>

          <button
            disabled={totalTickets === 0}
            onClick={onNext}
            className="px-8 py-3 bg-white text-black rounded-xl font-bold shadow-lg hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}