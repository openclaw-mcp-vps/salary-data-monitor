export default function Home() {
  const checkoutUrl = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL || "#";

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Nav */}
      <nav className="border-b border-[#21262d] px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <span className="text-[#58a6ff] font-bold text-lg tracking-tight">SalaryWatch</span>
        <a href={checkoutUrl} className="bg-[#58a6ff] text-[#0d1117] text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#79b8ff] transition-colors">
          Get Started
        </a>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <span className="inline-block bg-[#161b22] border border-[#30363d] text-[#58a6ff] text-xs font-medium px-3 py-1 rounded-full mb-6">
          Privacy Protection
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
          Monitor What Equifax Sells<br />
          <span className="text-[#58a6ff]">About Your Salary</span>
        </h1>
        <p className="text-[#8b949e] text-lg mb-8 max-w-xl mx-auto">
          Equifax's Work Number database sells your employment and salary history to lenders, landlords, and employers — often without your knowledge. We watch it for you and alert you the moment your data is exposed.
        </p>
        <a href={checkoutUrl} className="inline-block bg-[#58a6ff] text-[#0d1117] font-bold text-base px-8 py-3 rounded-lg hover:bg-[#79b8ff] transition-colors shadow-lg">
          Start Monitoring — $9/mo
        </a>
        <p className="text-[#484f58] text-sm mt-4">Cancel anytime. No long-term commitment.</p>
      </section>

      {/* Feature pills */}
      <section className="max-w-3xl mx-auto px-6 pb-16 flex flex-wrap justify-center gap-3">
        {["Automated periodic checks", "Instant email alerts", "Employment history tracking", "Salary exposure reports", "FCRA dispute guidance"].map((f) => (
          <span key={f} className="bg-[#161b22] border border-[#30363d] text-[#c9d1d9] text-sm px-4 py-2 rounded-full">{f}</span>
        ))}
      </section>

      {/* Pricing */}
      <section className="max-w-md mx-auto px-6 pb-20" id="pricing">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Simple Pricing</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 text-center shadow-xl">
          <p className="text-[#58a6ff] font-semibold text-sm uppercase tracking-widest mb-2">Monitor Plan</p>
          <div className="flex items-end justify-center gap-1 mb-1">
            <span className="text-5xl font-extrabold text-white">$9</span>
            <span className="text-[#8b949e] mb-2">/month</span>
          </div>
          <p className="text-[#8b949e] text-sm mb-6">Per person monitored</p>
          <ul className="text-left space-y-3 mb-8">
            {[
              "Continuous Work Number monitoring",
              "Instant alerts when data is found",
              "Full salary exposure report",
              "Employment history snapshot",
              "FCRA dispute letter templates",
              "Monthly summary emails"
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span className="text-[#58a6ff] mt-0.5 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a href={checkoutUrl} className="block w-full bg-[#58a6ff] text-[#0d1117] font-bold py-3 rounded-lg hover:bg-[#79b8ff] transition-colors text-center">
            Start Monitoring
          </a>
          <p className="text-[#484f58] text-xs mt-3">Secure checkout via Lemon Squeezy</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 pb-24" id="faq">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "What is The Work Number and why should I care?",
              a: "The Work Number is a database owned by Equifax that contains employment and salary records for over 60% of the U.S. workforce. Employers, lenders, landlords, and government agencies can purchase access to verify your income — often without your direct knowledge. We monitor this database so you know exactly when and how your data is being accessed."
            },
            {
              q: "How does the monitoring work?",
              a: "After you subscribe and provide your employment details, we run automated periodic checks against Equifax's Work Number disclosure reports. When we detect that your salary or employment data has been queried or is being sold, we send you an immediate email alert with full details of what was accessed and by whom."
            },
            {
              q: "Can I dispute or remove my data from The Work Number?",
              a: "Yes. Under the Fair Credit Reporting Act (FCRA), you have the right to dispute inaccurate information and request a full disclosure of your records. We provide pre-written FCRA dispute letter templates and step-by-step guidance to help you challenge incorrect data or limit future access to your salary information."
            }
          ].map(({ q, a }) => (
            <div key={q} className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">{q}</h3>
              <p className="text-[#8b949e] text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#21262d] py-8 text-center text-[#484f58] text-sm">
        <p>© {new Date().getFullYear()} SalaryWatch. Not affiliated with Equifax.</p>
        <p className="mt-1">This service helps you exercise your rights under the FCRA.</p>
      </footer>
    </main>
  );
}
