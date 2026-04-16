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
          Monitor What Equifax Sells<br />
          <span className="text-[#58a6ff]">About Your Salary</span>
        </h1>
        <p className="text-lg text-[#8b949e] max-w-xl mx-auto mb-8">
          Equifax's Work Number database holds your employment and salary history — and sells it to lenders, landlords, and employers. We watch it for you and alert you the moment your data is accessed or exposed.
        </p>
        <a
          href={checkoutUrl}
          className="inline-block bg-[#58a6ff] hover:bg-[#79b8ff] text-[#0d1117] font-bold text-base px-8 py-3 rounded-lg transition-colors duration-150"
        >
          Start Monitoring — $9/mo
        </a>
        <p className="mt-4 text-sm text-[#6e7681]">Cancel anytime. No contracts.</p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          {[
            { icon: "🔍", title: "Automated Checks", body: "Periodic scans of your Work Number profile detect new data disclosures before you find out the hard way." },
            { icon: "🔔", title: "Instant Alerts", body: "Email notifications the moment a new inquiry or salary record surfaces in your Equifax file." },
            { icon: "📋", title: "Full Reports", body: "Detailed monthly reports showing every employer, inquiry, and data point Equifax has on file for you." }
          ].map((f) => (
            <div key={f.title} className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-sm text-[#8b949e]">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-sm mx-auto px-6 pb-20">
        <div className="bg-[#161b22] border border-[#58a6ff] rounded-2xl p-8 text-center shadow-lg">
          <p className="text-[#58a6ff] text-sm font-semibold uppercase tracking-widest mb-2">Monitor Plan</p>
          <div className="text-5xl font-bold text-white mb-1">$9</div>
          <div className="text-[#8b949e] text-sm mb-6">per month</div>
          <ul className="text-sm text-[#c9d1d9] space-y-3 mb-8 text-left">
            {[
              "Continuous Work Number monitoring",
              "Email alerts on new disclosures",
              "Monthly exposure summary report",
              "Employment history tracking",
              "Salary data access log",
              "Cancel anytime"
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-[#58a6ff] font-bold">✓</span> {item}
              </li>
            ))}
          </ul>
          <a
            href={checkoutUrl}
            className="block w-full bg-[#58a6ff] hover:bg-[#79b8ff] text-[#0d1117] font-bold py-3 rounded-lg transition-colors duration-150"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-5">
          {[
            {
              q: "What is the Equifax Work Number database?",
              a: "The Work Number is a database operated by Equifax that aggregates employment and salary records from thousands of employers. It is sold to lenders, landlords, background check companies, and government agencies — often without your knowledge."
            },
            {
              q: "How does Salary Data Monitor work?",
              a: "After you sign up and provide your employment details, we run automated periodic checks against your Work Number profile. When new inquiries or data records appear, you receive an immediate email alert with a full breakdown."
            },
            {
              q: "Can I dispute or remove my data from the Work Number?",
              a: "Yes. Under the Fair Credit Reporting Act (FCRA) you have the right to dispute inaccurate records and request a freeze on your Work Number file. Our reports include step-by-step guidance on how to exercise those rights."
            }
          ].map((item) => (
            <div key={item.q} className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">{item.q}</h3>
              <p className="text-sm text-[#8b949e] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#21262d] text-center py-8 text-xs text-[#6e7681]">
        © {new Date().getFullYear()} Salary Data Monitor. Not affiliated with Equifax.
      </footer>
    </main>
  );
}
