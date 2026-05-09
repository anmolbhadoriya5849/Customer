export default function PrivacyPolicy() {
  const logoPath = "/logo.png";

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white font-sans">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-3 border-b border-gray-800">
        <img
          src={logoPath}
          alt="PassX"
          className="w-12 h-12 object-contain rounded"
        />
        <div>
          <div className="text-xl font-extrabold tracking-tight">PassX</div>
          <div className="text-xs text-gray-400">
            Smart QR passes • Distributor network • Secure settlements
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-10 space-y-8 text-sm text-gray-300">
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>

        <p className="text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* 1 */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            1. Introduction
          </h2>
          <p>
            PASSX Private Limited (“PASSX”, “we”, “our”, “us”) is incorporated
            under the Companies Act, 2013 and operates a digital platform that
            enables event organizers to list events, distributors to sell
            digital passes, and buyers to purchase event passes.
          </p>
          <p className="mt-2">
            This Privacy Policy explains how we collect, use, store, disclose,
            and protect personal information when you use the PASSX website,
            mobile applications, dashboards, QR-based flows, and related
            services (“Platform”).
          </p>
        </div>

        {/* 2 */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            2. Applicability
          </h2>
          <p>This Privacy Policy applies to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Event Organizers</li>
            <li>Distributors</li>
            <li>Buyers / Attendees</li>
            <li>Admin users</li>
            <li>Website and App visitors</li>
          </ul>
        </div>

        {/* 3 */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            3. Information We Collect
          </h2>

          <h3 className="font-medium text-white mt-3">
            3.1 Personal Information
          </h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Password (securely hashed)</li>
            <li>Bank account number and IFSC code</li>
            <li>GST number and PAN (where applicable)</li>
          </ul>

          <h3 className="font-medium text-white mt-4">
            3.2 Event & Transaction Information
          </h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Event details listed on the Platform</li>
            <li>Pass purchase and sale records</li>
            <li>Payment transaction references</li>
            <li>Distributor attribution via QR codes or referral links</li>
          </ul>

          <h3 className="font-medium text-white mt-4">
            3.3 Technical Information
          </h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>IP address</li>
            <li>Device and browser information</li>
            <li>Log files and timestamps</li>
            <li>Authentication cookies</li>
          </ul>
        </div>

        {/* 4 */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            4. How We Collect Information
          </h2>
          <p>
            Information is collected when you register, apply for approval,
            log in, list events, sell or purchase passes, use distributor QR
            codes, interact with admin workflows, or communicate with support.
          </p>
        </div>

        {/* 5 */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            5. Use of Information
          </h2>
          <p>We use collected information to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Verify users through admin approval processes</li>
            <li>Create and manage user accounts</li>
            <li>Process payments, commissions, and settlements</li>
            <li>Generate and deliver digital passes</li>
            <li>Comply with GST, TDS, and other legal obligations</li>
            <li>Prevent fraud and unauthorized access</li>
            <li>Maintain audit logs and system integrity</li>
          </ul>
        </div>

        {/* 6 */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            6. Cookies & Authentication
          </h2>
          <p>
            PASSX uses HTTP-only cookies to manage authentication and session
            security. These cookies cannot be accessed via client-side scripts
            and are used solely for secure login and role-based access control.
          </p>
        </div>

        {/* 7 */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            7. Data Sharing & Disclosure
          </h2>
          <p>
            We do not sell or rent personal data. Information may be shared only
            with:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Payment gateway providers</li>
            <li>Banks, auditors, and tax authorities</li>
            <li>Event organizers (limited to pass-related buyer data)</li>
            <li>Law enforcement or regulators when legally required</li>
          </ul>
        </div>

        {/* 8 */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            8. Data Security
          </h2>
          <p>
            We implement reasonable technical and organizational safeguards,
            including encryption, access controls, and audit logging. However,
            no system is completely secure, and users acknowledge this risk.
          </p>
        </div>

        {/* 9 */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            9. Data Retention
          </h2>
          <p>
            Data is retained only as long as required for legal compliance,
            dispute resolution, auditing, and legitimate business purposes.
          </p>
        </div>

        {/* 10 */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            10. User Rights
          </h2>
          <p>
            Users may request access, correction, or deletion of personal data,
            subject to applicable legal and regulatory requirements.
          </p>
        </div>

        {/* 11 */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            11. Children’s Privacy
          </h2>
          <p>
            The Platform is not intended for individuals under 18 years of age.
            We do not knowingly collect data from minors.
          </p>
        </div>

        {/* 12 */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            12. Changes to This Policy
          </h2>
          <p>
            PASSX reserves the right to update this Privacy Policy at any time.
            Continued use of the Platform constitutes acceptance of the revised
            policy.
          </p>
        </div>

        {/* 13 */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            13. Contact Information
          </h2>
          <p>
            PASSX Private Limited<br />
            101.B Aaraw Tower, Near Agarwal Nagar,<br />
            CGO Complex, Indore – 452001, Madhya Pradesh<br />
            Email: <span className="text-white">support@passx.in</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} PassX Private Limited. All rights reserved.
      </footer>
    </main>
  );
}
