export default function RefundPolicy() {
  const logoPath = "/logo.png";

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white font-sans">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-gray-800/50">
        <div className="flex items-center gap-3">
          <img
            src={logoPath}
            alt="PassX"
            className="w-12 h-12 object-contain rounded"
          />
          <div>
            <div className="text-xl font-extrabold tracking-tight">PassX</div>
            <div className="text-xs text-gray-400 -mt-0.5">
              Smart QR passes • Distributor network • Instant settlements
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 uppercase tracking-tight">
            Refund & Cancellation Policy
          </h1>
          <p className="text-gray-400">PassX Digital Platform</p>
        </header>

        <div className="space-y-12 text-gray-300 leading-relaxed text-sm md:text-base">

          {/* 1. Platform Role */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">
              1. Role of PASSX
            </h2>
            <p>
              PASSX Private Limited (“PASSX”) operates as a technology platform
              and payment collection intermediary facilitating the sale of event
              passes on behalf of independent Event Organizers. PASSX does not
              organize, manage, or conduct events.
            </p>
          </section>

          {/* 2. No Universal Refunds */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">
              2. No Universal Refund Policy
            </h2>
            <p>
              PASSX does not offer a universal or automatic refund policy.
              Refunds, if any, are governed solely by the refund and cancellation
              terms defined by the respective Event Organizer.
            </p>
          </section>

          {/* 3. Event Cancellation */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">
              3. Event Cancellation or Rescheduling
            </h2>
            <p className="mb-3">
              In the event of cancellation, postponement, or modification of an
              event:
            </p>
            <ul className="space-y-3 list-disc ml-5">
              <li>The Event Organizer is solely responsible for refunds.</li>
              <li>
                PASSX shall not be liable for refund delays, partial refunds, or
                denial of refunds by the Organizer.
              </li>
              <li>
                Service fees, platform commissions, and payment gateway charges
                paid to PASSX are non-refundable.
              </li>
            </ul>
          </section>

          {/* 4. Buyer-Initiated Cancellations */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">
              4. Buyer-Initiated Cancellations
            </h2>
            <p>
              Once a pass is purchased, buyer-initiated cancellations or refund
              requests are not guaranteed and are subject entirely to the Event
              Organizer’s policies. PASSX does not independently process or
              approve such requests.
            </p>
          </section>

          {/* 5. Incorrect Details */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">
              5. Incorrect Buyer Details
            </h2>
            <p>
              PASSX shall not be responsible for non-delivery of passes or entry
              issues arising due to incorrect email addresses, phone numbers, or
              other details provided by the Buyer. No refunds shall be issued in
              such cases.
            </p>
          </section>

          {/* 6. Distributor Commission */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">
              6. Distributor Commission
            </h2>
            <p>
              Distributor commissions are earned upon successful sale of passes.
              In case of refunds initiated by the Organizer, distributor
              commissions may be adjusted, reversed, or withheld as per internal
              settlement and reconciliation policies.
            </p>
          </section>

          {/* 7. Organizer Fees */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">
              7. Organizer Fees & Platform Charges
            </h2>
            <p>
              Event registration fees, onboarding fees, and platform commissions
              charged by PASSX are non-refundable under all circumstances,
              including event cancellation or low ticket sales.
            </p>
          </section>

          {/* 8. Payment Failures */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">
              8. Failed or Duplicate Payments
            </h2>
            <p>
              In cases of failed, duplicate, or erroneous payments where funds
              are debited but passes are not issued, refunds (if applicable)
              shall be processed back to the original payment method after
              verification, subject to payment gateway timelines.
            </p>
          </section>

          {/* 9. Processing Timelines */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">
              9. Refund Processing Timelines
            </h2>
            <p>
              Approved refunds may take 5–10 working days or longer depending on
              banking partners, payment gateways, and the Buyer’s financial
              institution. PASSX does not control external processing delays.
            </p>
          </section>

          {/* 10. Taxes */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">
              10. Taxes & Deductions
            </h2>
            <p>
              Taxes, including GST and TDS already deposited with the government,
              may not be refundable. Any tax adjustments shall be handled in
              accordance with applicable Indian tax laws.
            </p>
          </section>

          {/* 11. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-red-500 pl-4">
              11. Limitation of Liability
            </h2>
            <p className="text-red-200">
              PASSX’s liability, if any, is strictly limited to the platform
              service fee received for the specific transaction. PASSX shall not
              be liable for indirect, incidental, or consequential losses.
            </p>
          </section>

          {/* 12. Finality */}
          <section className="bg-blue-900/20 p-6 rounded-lg border border-blue-800/50">
            <p className="text-sm italic">
              12. This Refund & Cancellation Policy forms an integral part of the
              PASSX Terms and Conditions. By using the Platform, you acknowledge
              and agree to this Policy.
            </p>
          </section>

        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 text-center text-xs text-gray-600 border-t border-gray-900">
        <p>
          © {new Date().getFullYear()} PASSX Private Limited | CIN:
          U90009MP2025PTC080718
        </p>
        <p className="mt-2">Indore, Madhya Pradesh, India</p>
      </footer>
    </main>
  );
}