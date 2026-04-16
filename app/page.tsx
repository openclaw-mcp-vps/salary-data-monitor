export default function Page() {
  const checkoutUrl = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL || "#";

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
        <span className="inline-block bg-[#161b22] border border-[#30363d] text-[#58a6ff] text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
          Privacy Tools
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
          Monitor What Equifax Sells{" "}
          <span className="text-[#58a6ff]">About Your Salary</span>
        </h1>
        <p className="text-lg text-[#8b949e] max-w-xl mx-auto mb-8">
          Equifax's Work Number database quietly stores your employment history and income data — and sells it to lenders, landlords, and employers. We run automated checks and alert you the moment your data is accessed or changes.
        </p>
        <a
          href={checkoutUrl}
          className="inline-block bg-[#58a6ff] hover:bg-[#79b8ff] text-[#0d1117] font-bold text-base px-8 py-3 rounded-lg transition-colors duration-150"
        >
          Start Monitoring — $9/mo
        </a>
        <p className="mt-4 text-sm text-[#6e7681]">Cancel anytime. No long-term commitment.</p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
            <div className="text-2xl mb-2">🔍</div>
            <h3 className="text-white font-semibold mb-1">Automated Checks</h3>
            <p className="text-sm text-[#8b949e]">Scheduled background jobs poll The Work Number on your behalf and detect any changes to your employment or salary records.</p>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
            <div className="text-2xl mb-2">🔔</div>
            <h3 className="text-white font-semibold mb-1">Instant Alerts</h3>
            <p className="text-sm text-[#8b949e]">Get notified by email the moment a third party accesses your data or your salary information is updated in Equifax's system.</p>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
            <div className="text-2xl mb-2">🛡️</div>
            <h3 className="text-white font-semibold mb-1">Access Log</h3>
            <p className="text-sm text-[#8b949e]">See a full timeline of who requested your data, when, and for what purpose — all in one private dashboard.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-md mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Simple Pricing</h2>
        <div className="bg-[#161b22] border border-[#58a6ff] rounded-2xl p-8 text-center shadow-lg">
          <p className="text-[#58a6ff] font-semibold text-sm uppercase tracking-widest mb-2">Pro Monitor</p>
          <div className="text-5xl font-extrabold text-white mb-1">$9</div>
          <p className="text-[#8b949e] text-sm mb-6">per month</p>
          <ul className="text-left space-y-3 mb-8 text-sm text-[#c9d1d9]">
            <li className="flex items-start gap-2"><span className="text-[#58a6ff] font-bold mt-0.5">✓</span> Daily automated Work Number checks</li>
            <li className="flex items-start gap-2"><span className="text-[#58a6ff] font-bold mt-0.5">✓</span> Email alerts on access or data changes</li>
            <li className="flex items-start gap-2"><span className="text-[#58a6ff] font-bold mt-0.5">✓</span> Full access history dashboard</li>
            <li className="flex items-start gap-2"><span className="text-[#58a6ff] font-bold mt-0.5">✓</span> Dispute guidance for inaccurate records</li>
            <li className="flex items-start gap-2"><span className="text-[#58a6ff] font-bold mt-0.5">✓</span> Cancel anytime</li>
          </ul>
          <a
            href={checkoutUrl}
            className="block w-full bg-[#58a6ff] hover:bg-[#79b8ff] text-[#0d1117] font-bold py-3 rounded-lg transition-colors duration-150 text-center"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-5">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">What is The Work Number and why should I care?</h3>
            <p className="text-sm text-[#8b949e]">The Work Number is Equifax's database containing employment and salary records for over 60% of U.S. workers. Lenders, landlords, and background check companies buy access to verify your income — often without you knowing.</p>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">How does the monitoring work?</h3>
            <p className="text-sm text-[#8b949e]">After you authenticate with your employment credentials, our system runs daily background checks against The Work Number's consumer portal. Any new access events or data changes trigger an immediate email alert to you.</p>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">Is my data secure?</h3>
            <p className="text-sm text-[#8b949e]">Your credentials are encrypted at rest and in transit. We never store your raw salary figures — only change-detection metadata. You can delete your account and all associated data at any time.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#21262d] text-center py-8 text-xs text-[#6e7681]">
        © {new Date().getFullYear()} Salary Data Monitor. Not affiliated with Equifax.
      </footer>
    </main>
  );
}
