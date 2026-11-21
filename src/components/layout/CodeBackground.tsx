import styles from "./code-background.module.css";

const traces = [
  [
    { line: "M-16 88H145L195 139H342L387 184H514", node: [514, 184] },
    { line: "M-16 167H94L152 225H286L328 267H598", node: [598, 267] },
    { line: "M-16 282H155L211 338H422", node: [422, 338] },
    { line: "M-16 455H104L164 395H274L328 449H535", node: [535, 449] },
    { line: "M-16 539H201L260 598H464L512 646H653", node: [653, 646] },
    { line: "M-16 681H104L139 646H327L378 697H489", node: [489, 697] },
    { line: "M-16 786H197L248 735H373", node: [373, 735] },
    { line: "M-16 855H203L240 818H489L529 778H622", node: [622, 778] },
  ],
  [
    { line: "M-16 98H143L190 145H375", node: [375, 145] },
    { line: "M-16 191H118L162 147H259", node: [259, 147] },
    { line: "M-16 267H172L236 331H509L553 375H647", node: [647, 375] },
    { line: "M-16 384H94L145 435H323L359 399H451", node: [451, 399] },
    { line: "M-16 498H202L255 551H455", node: [455, 551] },
    { line: "M-16 613H151L215 677H373L420 630H586", node: [586, 630] },
    { line: "M-16 738H208L263 793H469", node: [469, 793] },
    { line: "M-16 858H143L184 817H328", node: [328, 817] },
  ],
];

function CircuitBank({ side }: { side: 0 | 1 }) {
  return (
    <svg className={`${styles.circuits} ${side ? styles.right : styles.left}`} viewBox="0 0 760 920" preserveAspectRatio="xMinYMid slice" focusable="false">
      {traces[side].map(({ line, node: [x, y] }, index) => (
        <g className={styles.trace} key={line}>
          <path className={styles.wire} d={line} />
          <circle className={styles.node} cx={x} cy={y} r={index % 3 === 0 ? 6 : 4} />
          {(index === 0 || index === (side ? 5 : 4)) && (
            <path className={styles.pulse} d={line} pathLength={100} />
          )}
        </g>
      ))}
      <path className={styles.chevrons} d="m183 291 8 8-8 8m18-16 8 8-8 8m18-16 8 8-8 8M321 711l8 8-8 8m18-16 8 8-8 8m18-16 8 8-8 8" />
    </svg>
  );
}

export function CodeBackground() {
  return (
    <div className={styles.scene} data-code-background aria-hidden="true">
      <div className={styles.field}>
        <div className={styles.code} />
        <div className={styles.bloom} />
        <CircuitBank side={0} />
        <CircuitBank side={1} />
      </div>
    </div>
  );
}
