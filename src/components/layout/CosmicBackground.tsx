export function CosmicBackground() {
  return (
    <div className="cosmic-background" aria-hidden="true">
      <svg className="cosmic-stars" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 260 }, (_, i) => (
          <circle key={i} cx={(i * 239 + 37) % 1440} cy={(i * 163 + 71) % 900} r={i % 13 === 0 ? 1.8 : 0.7} fill="#d4e3ff" opacity={0.2 + (i % 6) * 0.1} />
        ))}
      </svg>
      <div className="orbital-plane">
        <svg className="orbital-giant" viewBox="0 0 320 200" focusable="false">
          <defs>
            <linearGradient id="gas-belts" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop stopColor="#adc2d2"/><stop offset=".28" stopColor="#7f8c99"/>
              <stop offset=".36" stopColor="#ad9e8b"/><stop offset=".45" stopColor="#707e90"/>
              <stop offset=".62" stopColor="#afa79a"/><stop offset=".7" stopColor="#697b90"/><stop offset="1" stopColor="#485367"/>
            </linearGradient>
            <radialGradient id="gas-shadow" cx="23%" cy="20%" r="83%">
              <stop stopColor="#cedff1" stopOpacity=".18"/><stop offset=".48" stopColor="#10263a" stopOpacity=".29"/><stop offset=".88" stopColor="#050b17" stopOpacity=".95"/><stop offset="1" stopColor="#162334"/>
            </radialGradient>
          </defs>
          <g transform="rotate(-19 160 100)">
            <ellipse cx="160" cy="100" rx="139" ry="25" fill="none" stroke="#a5a49b" strokeWidth="8" opacity=".49"/>
            <ellipse cx="160" cy="100" rx="150" ry="29" fill="none" stroke="#b6c3d0" opacity=".42"/>
            <circle cx="160" cy="100" r="58" fill="url(#gas-belts)"/>
            <circle cx="160" cy="100" r="58" fill="url(#gas-shadow)"/>
            <path d="M21 100a139 25 0 0 0 278 0" fill="none" stroke="#bbb7aa" strokeWidth="8" opacity=".57"/>
            <path d="M10 100a150 29 0 0 0 300 0" fill="none" stroke="#c3d1dd" opacity=".56"/>
          </g>
        </svg>
        <div className="cosmic-moon" />
      </div>
    </div>
  );
}
