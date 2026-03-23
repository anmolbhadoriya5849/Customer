export function TicketSection({ mode }: { mode?: 'preview' | 'distributor' }) {
  if (mode === "preview") {
    return (
      <button disabled className="w-full bg-gray-400 py-3 rounded">
        Preview Mode (Booking Disabled)
      </button>
    );
  }

  if (mode === "distributor") {
    return (
      <button className="w-full bg-indigo-600 py-3 rounded">
        Sell Passes
      </button>
    );
  }

  return (
    <button className="w-full bg-black text-white py-3 rounded">
      Book Tickets
    </button>
  );
}