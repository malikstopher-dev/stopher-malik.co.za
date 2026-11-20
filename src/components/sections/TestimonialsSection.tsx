const testimonials = [
  {
    quote:
      "Stopher delivered our website in record time and it looked absolutely amazing. We've been getting enquiries ever since we launched. Highly recommend to any business owner.",
    name: "Salem Home Innovation",
    role: "Home services · Johannesburg",
    initials: "SH",
  },
  {
    quote:
      "Professional, fast, and understood exactly what we needed. Our restaurant site has made bookings so much easier.",
    name: "101 On Fraser",
    role: "Restaurant · Johannesburg",
    initials: "101",
  },
  {
    quote:
      "From zero online presence to qualified leads every day. The SEO work alone has been worth every rand.",
    name: "John K.",
    role: "Solar company director",
    initials: "JK",
  },
];

export function TestimonialsSection() {
  return (
    <section className="voices-section" id="testimonials" aria-labelledby="voices-heading">
      <div className="container">
        <header className="section-head section-head--compact" data-reveal>
          <div className="section-head__meta">
            <p className="section-kicker"><span>04</span> In their words</p>
            <p className="section-note">Referrals, repeat work and results</p>
          </div>
          <div className="section-head__body">
            <h2 id="voices-heading">Good work <em>travels.</em></h2>
          </div>
        </header>

        <div className="voices-grid">
          {testimonials.map((item, index) => (
            <figure className={`voice${index === 0 ? " voice--lead" : ""}`} key={item.name} data-reveal>
              <blockquote>
                <span aria-hidden="true">“</span>
                {item.quote}
              </blockquote>
              <figcaption>
                <span className="voice__initials" aria-hidden="true">{item.initials}</span>
                <span>
                  <strong>{item.name}</strong>
                  <em>{item.role}</em>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="voices-stats" data-reveal>
          <p><strong>23+</strong> projects shipped</p>
          <p><strong>04</strong> countries reached</p>
          <p><strong>Most</strong> work comes by referral</p>
        </div>
      </div>
    </section>
  );
}
