const items = [
  "Web design",
  "Development",
  "Brand identity",
  "E-commerce",
  "SEO & performance",
  "Johannesburg",
  "Working worldwide",
];

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[0, 1].map((copy) => (
          <div className="ticker__group" key={copy}>
            {items.map((item) => (
              <span key={`${copy}-${item}`}>
                {item}
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
