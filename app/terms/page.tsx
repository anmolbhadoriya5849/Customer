export default function Terms() {
  const logoPath = "/logo.png";

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white font-sans">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-gray-800/50">
        <div className="flex items-center gap-3">
          <img src={logoPath} alt="PassX" className="w-12 h-12 object-contain rounded" />
          <div>
            <div className="text-xl font-extrabold tracking-tight">PassX</div>
            <div className="text-xs text-gray-400 -mt-0.5">Smart QR passes • Distributor network • Instant settlements</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 uppercase tracking-tight">Terms and Conditions [cite: 1]</h1>
          <p className="text-gray-400">PassX Digital Platform [cite: 2]</p>
        </header>

        <div className="space-y-12 text-gray-300 leading-relaxed text-sm md:text-base">
          
          {/* 1. Definitions */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">1. Definitions [cite: 3]</h2>
            <ul className="space-y-4">
              <li><strong className="text-white">1.1 "Company":</strong> PASSX Private Limited, incorporated under the Companies Act, 2013, CIN U90009MP2025PTC080718, with its registered office at 101.B Aaraw Tower, Near Agarwal Nagar, CGO Complex, Indore - 452001, Madhya Pradesh, India.</li>
              <li><strong className="text-white">1.2 "Platform":</strong> Includes the website, mobile applications, dashboards, APIs, and all related digital infrastructure[cite: 6].</li>
              <li><strong className="text-white">1.3 "Organizer":</strong> Any individual or entity that lists and conducts an event after approval by PASSX[cite: 7].</li>
              <li><strong className="text-white">1.4 "Distributor":</strong> Any individual or entity approved to sell event passes, including via referral or QR mechanisms[cite: 8, 9].</li>
              <li><strong className="text-white">1.5 "Buyer":</strong> Any person purchasing an event pass through the Platform[cite: 10].</li>
              <li><strong className="text-white">1.6 "Event":</strong> Any concert, show, gathering, or program listed by an Organizer[cite: 11].</li>
            </ul>
          </section>

          {/* 2. Nature of the Platform */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">2. Nature of the Platform [cite: 12]</h2>
            <div className="space-y-4">
              <p>2.1 PASSX is a technology intermediary facilitating event listings, pass sales, promotion, and payment aggregation[cite: 13, 14, 15, 16, 17].</p>
              <p>2.2 PASSX does not organize, manage, supervise, control, or conduct any event[cite: 18].</p>
              <p>2.3 PASSX is not an event organizer, co-organizer, partner, or agent, except to the limited extent of payment facilitation[cite: 19, 20, 21, 22].</p>
              <p>2.4 Organizers and Distributors act independently and bear sole responsibility for their actions[cite: 23].</p>
            </div>
          </section>

          {/* 3. Admin Approval */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">3. Admin Approval & Onboarding [cite: 24]</h2>
            <ul className="space-y-4 list-disc ml-5">
              <li>Access requires manual verification and explicit approval via the admin system[cite: 25, 26, 27, 28, 29].</li>
              <li>PASSX reserves the absolute right to approve, reject, or revoke access without providing reasons[cite: 30, 31, 32, 33].</li>
              <li>Submission of information does not guarantee approval[cite: 34].</li>
            </ul>
          </section>

          {/* 4. Organizer Terms */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">4. Organizer Terms [cite: 35]</h2>
            <div className="space-y-6">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <p><strong className="text-white">4.1 Registration Fee:</strong> A non-refundable fee of ₹5,000 (exclusive of taxes) per event listing.</p>
                <p><strong className="text-white">4.2 Commission:</strong> 15% commission on the sale price of each pass, exclusive of taxes[cite: 38, 39].</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">4.3 Taxation (GST & TDS)[cite: 40]:</h3>
                <p className="mb-2">Commission attracts GST; PASSX will raise a tax invoice[cite: 41, 42]. Organizers must deduct applicable TDS and issue Form 16A to PASSX[cite: 43].</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">4.4 Event Responsibility[cite: 44]:</h3>
                <p>The Organizer is solely responsible for venue booking, artist agreements, licenses, crowd control, and safety[cite: 45, 46, 47, 48, 49, 50].</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">4.5 Cancellations & Refunds[cite: 52]:</h3>
                <p>PASSX is not liable for event modifications[cite: 54]. Organizers process refunds directly; registration fees and commissions paid to PASSX remain non-refundable[cite: 55, 56].</p>
              </div>
            </div>
          </section>

          {/* 5. Distributor Terms */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">5. Distributor Terms [cite: 57]</h2>
            <div className="space-y-4">
              <p><strong className="text-white">5.1 Commission:</strong> 10% on the sale price of each pass sold[cite: 58, 59].</p>
              <p><strong className="text-white">5.2 Settlement & Taxation:</strong> Commission is subject to TDS and GST (if registered). GST-registered distributors must issue a tax invoice to PASSX[cite: 60, 61, 62, 63, 64, 65, 66].</p>
              <p><strong className="text-white">5.3 Settlement Cycle:</strong> Weekly or periodic payouts, subject to fraud checks and Organizer settlement[cite: 70, 71, 72, 73].</p>
              <p><strong className="text-white">5.4 QR-Based Sales:</strong> PASSX is not responsible for QR misuse or disputes between Buyers and Distributors[cite: 74, 75, 76, 77, 78, 80].</p>
            </div>
          </section>

          {/* 6. Buyer Terms */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">6. Buyer Terms [cite: 81]</h2>
            <p>Passes are delivered digitally[cite: 82]. PASSX is not liable for non-delivery due to incorrect details or spam filters[cite: 83, 84]. Entry is governed by Organizer and venue rules[cite: 85].</p>
          </section>

          {/* 7. Payments & Settlement */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">7. Payments & Settlement [cite: 86]</h2>
            <p>PASSX acts as a collection agent[cite: 88]. Settlements occur after deducting commissions, taxes, and distributor payouts[cite: 89, 90, 91, 92]. PASSX may withhold settlements in case of disputes or fraud[cite: 93, 94].</p>
          </section>

          {/* 8. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-red-500 pl-4">8. Limitation of Liability [cite: 95]</h2>
            <p className="mb-4 text-red-200">PASSX is not liable for event cancellation, injury, property damage, or disputes between users[cite: 96, 97, 98, 99].</p>
            <p className="font-bold">Total liability is limited to the commission amount earned by PASSX for the specific transaction.</p>
          </section>

          {/* 9. Indemnity */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">9. Indemnity [cite: 101]</h2>
            <p>Users indemnify PASSX against claims arising from event execution, regulatory non-compliance, tax defaults, or fraud[cite: 102, 103, 104, 105, 106].</p>
          </section>

          {/* 10. Termination */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">10. Termination & Suspension [cite: 107]</h2>
            <p>PASSX may terminate access without notice for breach of terms or suspected fraud[cite: 108, 109, 110, 111]. Settlements post-termination are subject to reconciliation[cite: 112, 113].</p>
          </section>

          {/* 11. IP & 12. Jurisdiction */}
          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">11. Intellectual Property [cite: 115]</h2>
              <p className="text-sm">All systems and branding are the exclusive property of PASSX. Reverse-engineering is prohibited[cite: 116, 117].</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">12. Law & Jurisdiction [cite: 118]</h2>
              <p className="text-sm">Governed by the laws of India. Courts at Indore, Madhya Pradesh shall have exclusive jurisdiction[cite: 119, 120].</p>
            </section>
          </div>

          {/* 13. Modification & 14. Acceptance */}
          <section className="bg-blue-900/20 p-6 rounded-lg border border-blue-800/50">
            <p className="text-sm italic mb-4">13. PASSX reserves the right to modify these Terms at any time. Continued use constitutes acceptance[cite: 121, 122, 123].</p>
            <p className="text-center font-bold text-white tracking-wide">
              14. BY REGISTERING OR USING THE PLATFORM, YOU ACKNOWLEDGE YOU HAVE READ, UNDERSTOOD, AND AGREED TO THESE TERMS[cite: 124, 125].
              These Terms apply irrespective of the user’s role at the time of registration
            </p>
          </section>

        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 text-center text-xs text-gray-600 border-t border-gray-900">
        <p>© {new Date().getFullYear()} PASSX Private Limited | CIN: U90009MP2025PTC080718</p>
        <p className="mt-2">Indore, Madhya Pradesh, India</p>
      </footer>
    </main>
  );
}