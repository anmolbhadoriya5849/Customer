"use client"

import { useEffect, useState, useCallback, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Pass {
  id: string;
  qrToken: string;
  status: string;
  qrDataUrl: string;
  expiresAt: number; // ms timestamp
  event: { name: string };
  category: { name: string };
  distributor: { name: string };
  order: { txnid: string; invoiceKey: string };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDynamicPasses() {
  const [passes, setPasses] = useState<Pass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(30);
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchPasses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/get-signed-url-passes`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch passes");

      const data: Pass[] = await res.json();
      setPasses(data);
      setError(null);

      // All passes share the same 30s window, use the first one's expiresAt
      if (data.length > 0) {
        scheduleRefresh(data[0].expiresAt);
      }
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const scheduleRefresh = (expiresAt: number) => {
    // Clear any existing timers
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    if (countdownTimer.current) clearInterval(countdownTimer.current);

    const msUntilExpiry = expiresAt - Date.now();

    // Countdown ticker (updates every second)
    setSecondsLeft(Math.ceil(msUntilExpiry / 1000));
    countdownTimer.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Re-fetch right when the token expires
    refreshTimer.current = setTimeout(() => {
      fetchPasses();
    }, msUntilExpiry);
  };

  useEffect(() => {
    fetchPasses();
    return () => {
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
      if (countdownTimer.current) clearInterval(countdownTimer.current);
    };
  }, [fetchPasses]);

  return { passes, loading, error, secondsLeft, refetch: fetchPasses };
}

// ─── QR Card Component ────────────────────────────────────────────────────────

function CountdownRing({ secondsLeft }: { secondsLeft: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = secondsLeft / 30; // 30s window
  const dashOffset = circumference * (1 - progress);

  const color =
    secondsLeft > 10 ? "#22c55e" : secondsLeft > 5 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative flex items-center justify-center w-14 h-14">
      <svg className="absolute" width="56" height="56" viewBox="0 0 56 56">
        {/* Track */}
        <circle
          cx="28" cy="28" r={radius}
          fill="none" stroke="#e5e7eb" strokeWidth="4"
        />
        {/* Progress */}
        <circle
          cx="28" cy="28" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
        />
      </svg>
      <span className="text-sm font-bold tabular-nums" style={{ color }}>
        {secondsLeft}s
      </span>
    </div>
  );
}

export function PassQRCard({ pass, secondsLeft }: { pass: Pass; secondsLeft: number }) {
  const isExpiring = secondsLeft <= 5;

  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm p-5 flex flex-col gap-4 transition-all
        ${isExpiring ? "border-red-300 shadow-red-100" : "border-gray-200"}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-gray-900 text-lg">{pass.event.name}</p>
          <p className="text-sm text-gray-500">{pass.category.name}</p>
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full
            ${pass.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"}`}
        >
          {pass.status}
        </span>
      </div>

      {/* QR Code */}
      <div className="flex flex-col items-center gap-3">
        <div
          className={`p-3 rounded-xl border-2 transition-all
            ${isExpiring ? "border-red-300 opacity-60" : "border-gray-100"}`}
        >
          <img
            src={pass.qrDataUrl}
            alt="Pass QR Code"
            width={200}
            height={200}
            className="block"
          />
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-3">
          <CountdownRing secondsLeft={secondsLeft} />
          <p className="text-xs text-gray-400">
            {isExpiring ? (
              <span className="text-red-500 font-medium">Refreshing soon…</span>
            ) : (
              "QR refreshes automatically"
            )}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t pt-3 grid grid-cols-2 gap-2 text-xs text-gray-500">
        <div>
          <p className="font-medium text-gray-700">Distributor</p>
          <p>{pass.distributor.name}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Order ID</p>
          <p className="truncate">{pass.order.txnid}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function MyPassesPage() {
  const { passes, loading, error, secondsLeft } = useDynamicPasses();

  if (loading && passes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-3">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Loading your passes…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
        {error}
      </div>
    );
  }

  if (passes.length === 0) {
    return (
      <div className="text-center text-gray-500 py-16">
        No passes found for your account.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Passes</h1>

      {/* Subtle refresh indicator */}
      {loading && (
        <div className="mb-4 flex items-center gap-2 text-sm text-blue-600">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          Refreshing QR codes…
        </div>
      )}

      <div className="flex flex-col gap-5">
        {passes.map((pass) => (
          <PassQRCard key={pass.id} pass={pass} secondsLeft={secondsLeft} />
        ))}
      </div>
    </div>
  );
}