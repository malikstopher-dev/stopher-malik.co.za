import Link from "next/link";

export function CTASection() {
  return (
    <section className="cta cin-cta py-5xl" id="contact" aria-labelledby="cta-heading">
      <div className="cta__glow" aria-hidden="true" style={{
        position: "absolute",
        inset: "-20% -10%",
        pointerEvents: "none",
        background: `
          radial-gradient(40% 34% at 72% 40%, rgba(255, 77, 46, 0.10) 0%, transparent 70%),
          radial-gradient(50% 40% at 24% 60%, rgba(59, 130, 246, 0.13) 0%, transparent 70%)
        `,
        filter: "blur(6px)",
      }} />
      <div className="container">
        <p className="cin-kicker mb-6">Ready when you are</p>
        <h2 id="cta-heading" className="cta__title text-display-xl font-display font-bold text-white mb-4" data-reveal>
          Let&rsquo;s build something great
        </h2>
        <p className="cta__desc text-white-muted text-body-xl max-w-2xl mb-10" data-reveal>
          Whether you need a simple website or a complex web application, I&rsquo;m here to help bring your vision to life. Free website audit. No strings attached.
        </p>
        <div className="cta__actions flex flex-col sm:flex-row gap-4" data-reveal>
          <Link href="/contact/" className="btn btn--accent btn--lg w-full sm:w-auto">
            Start Your Project <span aria-hidden="true">&rarr;</span>
          </Link>
          <a href="https://wa.me/27825100050" className="btn btn--ghost btn--lg w-full sm:w-auto" target="_blank" rel="noopener">
            WhatsApp Me
          </a>
        </div>
      </div>
    </section>
  );
}