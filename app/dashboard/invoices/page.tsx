"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { Download, FileText, Calendar, CreditCard } from "lucide-react";

interface Order {
  id: string;
  txnid: string;
  quantity: number;
  amount: number;
  createdAt: string;
  invoiceKey: string;
  signedUrl: string;
}

// thats how we do things

export default function InvoicesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customer/get-signed-url-invoice`, { withCredentials: true });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">Invoices</h1>
          <p className="text-slate-400 mt-2">View and download your recent purchase history.</p>
        </header>

        {loading ? (
          <div className="text-slate-500 animate-pulse">Loading invoices...</div>
        ) : orders.length === 0 ? (
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-12 text-center">
            <p className="text-slate-400">No invoices found.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-[#0f172a] border border-slate-800 hover:border-blue-500/50 transition-all rounded-xl gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <FileText className="text-blue-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Order #{order.txnid.slice(0, 8)}</h3>
                    <div className="flex flex-wrap gap-y-1 gap-x-4 mt-1 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5" />
                        ₹{(order.amount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={order.signedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={`invoice-${order.txnid}.pdf`}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-200 text-black font-semibold rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}