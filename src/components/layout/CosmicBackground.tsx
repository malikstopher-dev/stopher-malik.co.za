export function CosmicBackground() {
  return (
    <div className="cosmic-background" aria-hidden="true">
      <svg className="cosmic-stars" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 260 }, (_, i) => (
          <circle key={i} cx={(i * 239 + 37) % 1440} cy={(i * 163 + 71) % 900} r={i % 13 === 0 ? 1.8 : 0.7} fill="#d4e3ff" opacity={0.2 + (i % 6) * 0.1} />
        ))}
      </svg>
      <div className="cosmic-moon" />
      <div className="cosmic-planet cosmic-planet--amber" />
      <div className="cosmic-planet cosmic-planet--blue" />
    </div>
  );
}
