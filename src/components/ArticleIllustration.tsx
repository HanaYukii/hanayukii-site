type ArticleIllustrationVariant =
  | "abtest"
  | "balance"
  | "billing"
  | "compile"
  | "contest"
  | "dependency"
  | "docs"
  | "dp"
  | "judge"
  | "memory"
  | "object"
  | "orderbook"
  | "privacy"
  | "system"
  | "tickets"
  | "strength";

type ArticleIllustrationProps = {
  variant: ArticleIllustrationVariant;
  className?: string;
};

const colors = {
  accent: "var(--illustration-accent)",
  accentSoft: "var(--illustration-accent-soft)",
  accentWash: "var(--illustration-accent-wash)",
  accentHaze: "var(--illustration-accent-haze)",
  warm: "var(--illustration-warm)",
  warmSoft: "var(--illustration-warm-soft)",
  warmHaze: "var(--illustration-warm-haze)",
  sky: "var(--illustration-sky)",
  skySoft: "var(--illustration-sky-soft)",
  skyWash: "var(--illustration-sky-wash)",
  ink: "var(--illustration-ink)",
  muted: "var(--illustration-muted)",
  border: "var(--illustration-border)",
  surface: "var(--illustration-surface)",
  surfaceAlt: "var(--illustration-surface-alt)",
  paper: "var(--illustration-paper)",
  ghost: "var(--illustration-ghost)",
  grid: "var(--illustration-grid)",
  frameFill: "var(--illustration-frame-fill)",
  frameStroke: "var(--illustration-frame-stroke)",
};

function Panel({
  x,
  y,
  w,
  h,
  fill = colors.surfaceAlt,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="18"
      fill={fill}
      stroke={colors.border}
      strokeWidth="1.5"
    />
  );
}

function Dot({
  x,
  y,
  r = 7,
  fill = colors.accent,
}: {
  x: number;
  y: number;
  r?: number;
  fill?: string;
}) {
  return <circle cx={x} cy={y} r={r} fill={fill} />;
}

function Bar({
  x,
  y,
  w,
  color = colors.muted,
  opacity = 0.7,
}: {
  x: number;
  y: number;
  w: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <line
      x1={x}
      y1={y}
      x2={x + w}
      y2={y}
      stroke={color}
      strokeOpacity={opacity}
      strokeWidth="6"
      strokeLinecap="round"
    />
  );
}

function Arrow({
  d,
  color = colors.muted,
  width = 2,
  dash,
}: {
  d: string;
  color?: string;
  width?: number;
  dash?: string;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dash}
    />
  );
}

function Spark({
  x,
  y,
  color = colors.accent,
}: {
  x: number;
  y: number;
  color?: string;
}) {
  return (
    <g stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <line x1={x} y1={y - 9} x2={x} y2={y + 9} />
      <line x1={x - 9} y1={y} x2={x + 9} y2={y} />
      <line x1={x - 6} y1={y - 6} x2={x + 6} y2={y + 6} />
      <line x1={x - 6} y1={y + 6} x2={x + 6} y2={y - 6} />
    </g>
  );
}

function renderIllustration(variant: ArticleIllustrationVariant) {
  switch (variant) {
    case "dependency":
      return (
        <>
          <Panel x={96} y={110} w={146} h={84} />
          <Panel x={96} y={220} w={146} h={84} />
          <Panel x={96} y={330} w={146} h={84} />
          <Panel x={382} y={170} w={202} h={184} fill={colors.accentWash} />
          <Panel x={710} y={130} w={154} h={102} />
          <Panel x={710} y={292} w={154} h={102} />
          <Arrow d="M242 152 C 310 152, 322 210, 382 222" color={colors.accent} />
          <Arrow d="M242 262 C 310 262, 322 262, 382 262" color={colors.accent} />
          <Arrow d="M242 372 C 310 372, 322 314, 382 302" color={colors.accent} />
          <Arrow d="M584 222 C 646 222, 654 190, 710 181" color={colors.warm} />
          <Arrow d="M584 302 C 646 302, 654 334, 710 343" color={colors.sky} dash="7 10" />
          <Dot x={186} y={152} fill={colors.accent} />
          <Dot x={186} y={262} fill={colors.sky} />
          <Dot x={186} y={372} fill={colors.warm} />
          <Dot x={484} y={262} r={11} fill={colors.accent} />
          <Bar x={128} y={148} w={72} />
          <Bar x={128} y={258} w={84} />
          <Bar x={128} y={368} w={66} />
          <Bar x={426} y={220} w={112} color={colors.ink} opacity={0.9} />
          <Bar x={426} y={258} w={96} />
          <Bar x={426} y={296} w={128} />
          <Bar x={744} y={176} w={78} color={colors.warm} />
          <Bar x={744} y={338} w={78} color={colors.sky} />
          <Dot x={794} y={208} r={5} fill={colors.warm} />
          <Dot x={794} y={370} r={5} fill={colors.sky} />
        </>
      );
    case "docs":
      return (
        <>
          <Panel x={110} y={146} w={148} h={188} />
          <Panel x={140} y={122} w={148} h={188} fill={colors.paper} />
          <Panel x={170} y={98} w={148} h={188} />
          <Bar x={194} y={146} w={88} color={colors.ink} opacity={0.9} />
          <Bar x={194} y={182} w={96} />
          <Bar x={194} y={218} w={76} />
          <Bar x={194} y={254} w={104} />
          <Arrow d="M318 192 C 386 192, 412 192, 456 192" color={colors.warm} />
          <Arrow d="M318 250 C 386 250, 412 250, 456 250" color={colors.warm} dash="7 10" />
          <Dot x={382} y={192} r={5} fill={colors.warm} />
          <Dot x={414} y={250} r={5} fill={colors.warm} />
          <Panel x={456} y={124} w={178} h={212} fill={colors.accentWash} />
          <Bar x={490} y={170} w={84} color={colors.accent} opacity={0.9} />
          <Bar x={490} y={210} w={110} />
          <Bar x={490} y={250} w={92} />
          <Bar x={490} y={290} w={72} />
          <Arrow d="M634 230 C 690 230, 720 230, 746 230" color={colors.accent} />
          <Panel x={746} y={146} w={112} h={168} fill={colors.skyWash} />
          <rect x="776" y="176" width="52" height="52" rx="14" fill="none" stroke={colors.sky} strokeWidth="2" />
          <Dot x={792} y={192} r={4} fill={colors.sky} />
          <Dot x={812} y={192} r={4} fill={colors.sky} />
          <Dot x={792} y={212} r={4} fill={colors.sky} />
          <Dot x={812} y={212} r={4} fill={colors.sky} />
          <Bar x={776} y={254} w={52} color={colors.sky} />
          <Spark x={846} y={162} color={colors.accent} />
        </>
      );
    case "privacy":
      return (
        <>
          <Panel x={96} y={126} w={220} h={232} />
          <Panel x={644} y={126} w={220} h={232} fill={colors.accentWash} />
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 5 }).map((__, col) => (
              <rect
                key={`pub-${row}-${col}`}
                x={126 + col * 34}
                y={160 + row * 34}
                width="18"
                height="18"
                rx="4"
                fill={row === 1 && col > 1 ? colors.warmSoft : colors.accentSoft}
                stroke={colors.border}
                strokeWidth="1"
              />
            ))
          )}
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 5 }).map((__, col) => (
              <rect
                key={`priv-${row}-${col}`}
                x={674 + col * 34}
                y={160 + row * 34}
                width="18"
                height="18"
                rx="4"
                fill={row === 2 && col < 3 ? colors.accentSoft : colors.ghost}
                stroke={colors.border}
                strokeWidth="1"
              />
            ))
          )}
          <path d="M480 140 L548 168 V250 C548 304 508 334 480 346 C452 334 412 304 412 250 V168 Z" fill={colors.skyWash} stroke={colors.sky} strokeWidth="2" />
          <rect x="448" y="214" width="64" height="54" rx="14" fill="none" stroke={colors.ink} strokeWidth="2" />
          <path d="M456 214 V198 C456 180 470 168 480 168 C490 168 504 180 504 198 V214" fill="none" stroke={colors.ink} strokeWidth="2" />
          <Arrow d="M316 244 C 358 244, 386 244, 412 244" color={colors.warm} />
          <Arrow d="M548 244 C 590 244, 618 244, 644 244" color={colors.accent} />
          <Panel x={420} y={382} w={120} h={52} fill={colors.warmSoft} />
          <Bar x={444} y={408} w={72} color={colors.warm} />
          <Arrow d="M754 358 C 720 390, 640 404, 540 408" color={colors.sky} dash="7 10" />
          <Spark x={812} y={152} color={colors.accent} />
        </>
      );
    case "compile":
      return (
        <>
          <Panel x={108} y={138} w={204} h={220} />
          <circle cx="144" cy="170" r="6" fill={colors.warm} />
          <circle cx="166" cy="170" r="6" fill={colors.accent} />
          <circle cx="188" cy="170" r="6" fill={colors.sky} />
          <Bar x={140} y={212} w={120} color={colors.ink} opacity={0.9} />
          <Bar x={140} y={246} w={96} />
          <Bar x={140} y={280} w={136} />
          <Arrow d="M312 248 C 368 248, 388 248, 422 248" color={colors.accent} />
          <circle cx="492" cy="248" r="66" fill={colors.accentWash} stroke={colors.accent} strokeWidth="2" />
          <circle cx="492" cy="248" r="20" fill="none" stroke={colors.ink} strokeWidth="2" />
          <path d="M492 190 V222 M492 274 V306 M434 248 H466 M518 248 H550 M452 208 L470 226 M514 270 L532 288 M452 288 L470 270 M514 226 L532 208" stroke={colors.muted} strokeWidth="2" strokeLinecap="round" />
          <Arrow d="M558 248 C 620 248, 644 248, 676 248" color={colors.warm} />
          <Panel x={676} y={136} w={172} h={224} />
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 4 }).map((__, col) => (
              <rect
                key={`lut-${row}-${col}`}
                x={708 + col * 30}
                y={176 + row * 30}
                width="20"
                height="20"
                rx="4"
                fill={row === col ? colors.accentSoft : colors.skySoft}
                stroke={colors.border}
                strokeWidth="1"
              />
            ))
          )}
          <Bar x={708} y={320} w={98} color={colors.ink} opacity={0.9} />
          <Spark x={816} y={162} color={colors.warm} />
        </>
      );
    case "memory":
      return (
        <>
          <Panel x={96} y={176} w={634} h={164} />
          <rect x="128" y="212" width="414" height="92" rx="18" fill={colors.accentWash} stroke={colors.accent} strokeWidth="2" />
          {Array.from({ length: 7 }).map((_, index) => (
            <line
              key={`cell-${index}`}
              x1={176 + index * 48}
              y1="212"
              x2={176 + index * 48}
              y2="304"
              stroke={colors.border}
              strokeWidth="1.5"
            />
          ))}
          <Dot x={564} y={258} r={10} fill={colors.warm} />
          <Arrow d="M564 258 C 620 258, 650 258, 688 258" color={colors.warm} />
          <Panel x={744} y={196} w={118} h={124} />
          <path d="M768 228 L838 288 M838 228 L768 288" stroke={colors.sky} strokeWidth="2" strokeLinecap="round" />
          <Bar x={136} y={156} w={116} color={colors.ink} opacity={0.85} />
          <Bar x={136} y={370} w={172} />
          <Bar x={344} y={370} w={128} color={colors.warm} />
        </>
      );
    case "object":
      return (
        <>
          <Panel x={96} y={146} w={256} h={228} />
          <rect x="126" y="184" width="42" height="72" rx="12" fill={colors.accentSoft} stroke={colors.border} />
          <rect x="180" y="184" width="84" height="72" rx="12" fill={colors.skySoft} stroke={colors.border} />
          <rect x="276" y="184" width="34" height="72" rx="12" fill={colors.ghost} stroke={colors.border} strokeDasharray="6 8" />
          <rect x="126" y="274" width="184" height="52" rx="12" fill={colors.warmSoft} stroke={colors.border} />
          <Arrow d="M352 220 C 410 220, 430 220, 462 220" color={colors.accent} />
          <Panel x={462} y={146} w={114} h={228} />
          <Bar x={492} y={194} w={54} color={colors.ink} opacity={0.9} />
          <Bar x={492} y={234} w={54} />
          <Bar x={492} y={274} w={54} />
          <Arrow d="M576 260 C 630 260, 660 260, 702 260" color={colors.sky} />
          <Panel x={702} y={168} w={160} h={82} />
          <Panel x={702} y={282} w={160} h={82} fill={colors.skyWash} />
          <Arrow d="M782 250 L782 282" color={colors.warm} dash="7 10" />
          <Dot x={782} y={266} r={6} fill={colors.warm} />
        </>
      );
    case "orderbook":
      return (
        <>
          <line x1="480" y1="122" x2="480" y2="390" stroke={colors.border} strokeWidth="2" />
          {[0, 1, 2, 3].map((row) => (
            <rect
              key={`bid-${row}`}
              x={248 + row * 22}
              y={154 + row * 52}
              width={144 - row * 16}
              height="22"
              rx="11"
              fill={colors.accentSoft}
              stroke={colors.accent}
              strokeOpacity="0.5"
            />
          ))}
          {[0, 1, 2, 3].map((row) => (
            <rect
              key={`ask-${row}`}
              x={568}
              y={154 + row * 52}
              width={144 - row * 16}
              height="22"
              rx="11"
              fill={colors.warmSoft}
              stroke={colors.warm}
              strokeOpacity="0.5"
            />
          ))}
          <Arrow d="M168 164 C 224 164, 250 164, 284 164" color={colors.sky} />
          <Arrow d="M792 164 C 736 164, 710 164, 676 164" color={colors.sky} />
          <Panel x={120} y={314} w={228} h={76} />
          <Panel x={612} y={314} w={228} h={76} />
          <path d="M156 362 C 192 330, 224 376, 258 344 C 286 318, 318 354, 336 338" fill="none" stroke={colors.sky} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M648 362 C 684 338, 720 376, 750 340 C 776 310, 808 350, 828 328" fill="none" stroke={colors.warm} strokeWidth="2.5" strokeLinecap="round" />
          <Spark x={480} y={132} color={colors.accent} />
        </>
      );
    case "contest":
      return (
        <>
          <Panel x={96} y={118} w={170} h={90} />
          <Panel x={286} y={118} w={170} h={90} />
          <Panel x={476} y={118} w={170} h={90} />
          <Bar x={126} y={160} w={96} color={colors.ink} opacity={0.9} />
          <Bar x={316} y={160} w={96} color={colors.ink} opacity={0.9} />
          <Bar x={506} y={160} w={96} color={colors.ink} opacity={0.9} />
          <Arrow d="M646 164 C 714 164, 742 164, 782 164" color={colors.accent} />
          <Panel x={742} y={114} w={128} h={98} fill={colors.accentWash} />
          <path d="M130 312 H302 M172 278 V346 M232 262 V360 M286 288 V338" stroke={colors.warm} strokeWidth="10" strokeLinecap="round" />
          <circle cx="412" cy="282" r="10" fill={colors.accent} />
          <circle cx="372" cy="342" r="10" fill={colors.sky} />
          <circle cx="452" cy="342" r="10" fill={colors.warm} />
          <Arrow d="M412 292 L372 332" color={colors.muted} />
          <Arrow d="M412 292 L452 332" color={colors.muted} />
          <Panel x={586} y={250} w={278} h={122} />
          <rect x="620" y="286" width="64" height="18" rx="9" fill={colors.accentSoft} />
          <rect x="694" y="270" width="88" height="18" rx="9" fill={colors.skySoft} />
          <rect x="620" y="320" width="126" height="18" rx="9" fill={colors.warmSoft} />
          <rect x="756" y="320" width="54" height="18" rx="9" fill={colors.accentSoft} />
        </>
      );
    case "judge":
      return (
        <>
          <Panel x={110} y={130} w={184} h={236} />
          {[0, 1, 2, 3].map((index) => (
            <g key={`terminal-${index}`}>
              <Panel x={144 + index * 96} y={150 + index * 34} w={122} h={68} />
              <circle cx={166 + index * 96} cy={172 + index * 34} r="4" fill={colors.warm} />
              <circle cx={182 + index * 96} cy={172 + index * 34} r="4" fill={colors.accent} />
              <Bar x={166 + index * 96} y={198 + index * 34} w={64} />
            </g>
          ))}
          <Arrow d="M294 248 C 354 248, 374 248, 416 248" color={colors.accent} />
          <Panel x={416} y={126} w={194} h={244} />
          {[0, 1, 2, 3].map((index) => (
            <g key={`node-${index}`}>
              <Dot x={464 + index * 40} y={176 + index * 34} fill={index % 2 === 0 ? colors.sky : colors.accent} />
              {index < 3 ? (
                <Arrow
                  d={`M${464 + index * 40} ${176 + index * 34} C ${480 + index * 40} ${194 + index * 34}, ${488 + index * 40} ${206 + index * 34}, ${504 + index * 40} ${210 + index * 34}`}
                  color={colors.muted}
                  dash="7 10"
                />
              ) : null}
            </g>
          ))}
          <Bar x={454} y={310} w={106} color={colors.ink} opacity={0.9} />
          <Panel x={668} y={158} w={182} h={180} fill={colors.skyWash} />
          <path d="M708 214 L734 240 L808 174" fill="none" stroke={colors.sky} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <Spark x={820} y={152} color={colors.accent} />
        </>
      );
    case "billing":
      return (
        <>
          <Panel x={108} y={142} w={258} h={212} />
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`seat-${row}-${col}`}
                x={146 + col * 68}
                y={180 + row * 52}
                width="42"
                height="28"
                rx="10"
                fill={(row === 1 && col === 2) || (row === 2 && col === 2) ? colors.warmSoft : colors.accentSoft}
                stroke={colors.border}
              />
            ))
          )}
          <Arrow d="M366 248 C 426 248, 446 248, 478 248" color={colors.warm} />
          <rect x="478" y="212" width="74" height="52" rx="14" fill={colors.warmSoft} stroke={colors.warm} strokeDasharray="7 10" />
          <Arrow d="M552 238 C 618 238, 642 238, 674 238" color={colors.accent} />
          <Panel x={674} y={134} w={170} h={228} />
          <path d="M716 174 H802 M716 206 H790 M716 238 H784 M716 286 H806" stroke={colors.ink} strokeOpacity="0.75" strokeWidth="6" strokeLinecap="round" />
          <rect x="716" y="300" width="86" height="18" rx="9" fill={colors.warmSoft} />
          <circle cx="810" cy="174" r="7" fill={colors.warm} />
        </>
      );
    case "tickets":
      return (
        <>
          <Panel x={116} y={122} w={188} h={216} />
          <Bar x={150} y={172} w={88} color={colors.ink} opacity={0.9} />
          <Bar x={150} y={212} w={110} />
          <Bar x={150} y={252} w={70} />
          <rect x="388" y="174" width="170" height="88" rx="22" fill={colors.accentWash} stroke={colors.accent} strokeWidth="2" />
          <circle cx="388" cy="218" r="14" fill={colors.surface} />
          <circle cx="558" cy="218" r="14" fill={colors.surface} />
          <Bar x={426} y={218} w={82} color={colors.accent} opacity={0.9} />
          <rect x="426" y="252" width="92" height="12" rx="6" fill={colors.accentSoft} />
          <path d="M724 322 C 724 268, 752 228, 792 212 C 804 264, 832 300, 872 322" fill="none" stroke={colors.warm} strokeWidth="2.5" />
          <path d="M742 322 C 742 280, 760 252, 792 238 C 804 280, 822 304, 854 322" fill="none" stroke={colors.sky} strokeWidth="2.5" />
          <rect x="744" y="332" width="96" height="22" rx="11" fill={colors.warmSoft} />
          <Spark x={792} y={166} color={colors.accent} />
        </>
      );
    case "dp":
      return (
        <>
          {[0, 1, 2, 3].map((index) => (
            <g key={`robot-${index}`}>
              <circle cx={150 + index * 60} cy="212" r="14" fill={colors.accentSoft} stroke={colors.accent} />
              <circle cx={145 + index * 60} cy="208" r="3" fill={colors.ink} />
              <circle cx={155 + index * 60} cy="208" r="3" fill={colors.ink} />
            </g>
          ))}
          {[0, 1, 2].map((index) => (
            <g key={`factory-${index}`}>
              <Panel x={602 + index * 88} y={166 + index * 32} w={70} h={92} />
              <rect x={618 + index * 88} y={202 + index * 32} width="16" height="24" rx="5" fill={colors.skySoft} />
              <rect x={642 + index * 88} y={188 + index * 32} width="18" height="38" rx="5" fill={colors.warmSoft} />
            </g>
          ))}
          <Arrow d="M374 212 C 454 212, 516 212, 602 212" color={colors.accent} />
          <Arrow d="M314 212 C 420 274, 520 300, 690 300" color={colors.sky} dash="7 10" />
          <Panel x={172} y={310} w={306} h={84} />
          {Array.from({ length: 6 }).map((_, index) => (
            <rect
              key={`dp-cell-${index}`}
              x={200 + index * 42}
              y="338"
              width="26"
              height="26"
              rx="7"
              fill={index === 2 || index === 4 ? colors.accentSoft : colors.warmSoft}
              stroke={colors.border}
            />
          ))}
        </>
      );
    case "system":
      return (
        <>
          <Panel x={96} y={182} w={170} h={86} />
          <Bar x={132} y={224} w={96} color={colors.ink} opacity={0.9} />
          <Arrow d="M266 224 C 324 224, 346 224, 390 224" color={colors.accent} />
          <Panel x={390} y={160} w={164} h={132} fill={colors.accentWash} />
          <Bar x={426} y={204} w={92} color={colors.accent} opacity={0.9} />
          <Bar x={426} y={240} w={74} />
          <Arrow d="M554 224 C 616 224, 636 224, 674 224" color={colors.sky} />
          <Panel x={674} y={138} w={170} h={88} />
          <Panel x={674} y={258} w={80} h={96} />
          <Panel x={764} y={258} w={80} h={96} />
          <Bar x={708} y={182} w={96} color={colors.ink} opacity={0.9} />
          <rect x="704" y="292" width="20" height="28" rx="6" fill={colors.warmSoft} />
          <rect x="786" y="288" width="36" height="36" rx="10" fill={colors.skySoft} />
          <Arrow d="M754 304 C 766 304, 772 304, 784 304" color={colors.warm} dash="7 10" />
          <Spark x={816} y={126} color={colors.accent} />
        </>
      );
    case "abtest":
      return (
        <>
          <Panel x={122} y={150} w={184} h={178} />
          <rect x="152" y="188" width="58" height="102" rx="16" fill={colors.accentSoft} />
          <rect x="218" y="188" width="58" height="102" rx="16" fill={colors.warmSoft} />
          <text x="181" y="246" textAnchor="middle" fill={colors.ink} fontSize="26" fontWeight="700">
            A
          </text>
          <text x="247" y="246" textAnchor="middle" fill={colors.ink} fontSize="26" fontWeight="700">
            B
          </text>
          <Arrow d="M306 238 C 378 238, 402 238, 448 238" color={colors.muted} />
          <circle cx="496" cy="238" r="18" fill={colors.ghost} stroke={colors.border} strokeWidth="2" />
          <Arrow d="M514 238 C 586 238, 612 200, 660 188" color={colors.accent} />
          <Arrow d="M514 238 C 586 238, 612 276, 660 288" color={colors.warm} dash="7 10" />
          <Panel x={660} y={146} w={190} h={184} />
          <path d="M698 286 C 724 230, 744 238, 770 198 C 792 164, 816 190, 836 166" fill="none" stroke={colors.accent} strokeWidth="3" strokeLinecap="round" />
          <path d="M698 286 C 726 272, 748 290, 778 246 C 798 220, 816 236, 836 230" fill="none" stroke={colors.warm} strokeWidth="3" strokeLinecap="round" />
        </>
      );
    case "balance":
      return (
        <>
          <Panel x={118} y={160} w={186} h={154} />
          <rect x="152" y="198" width="118" height="76" rx="20" fill={colors.skyWash} stroke={colors.sky} strokeWidth="2" />
          <circle cx="182" cy="236" r="10" fill={colors.warmSoft} />
          <Bar x={202} y={236} w={44} color={colors.ink} opacity={0.9} />
          {[0, 1, 2].map((index) => (
            <rect
              key={`coin-${index}`}
              x={366}
              y={292 - index * 22}
              width="72"
              height="18"
              rx="9"
              fill={index === 2 ? colors.warmSoft : colors.accentSoft}
              stroke={colors.border}
            />
          ))}
          <Arrow d="M304 236 C 346 236, 352 258, 366 282" color={colors.accent} dash="7 10" />
          <Panel x={512} y={132} w={324} h={210} />
          <path d="M546 280 C 578 170, 624 310, 660 196 C 688 104, 732 300, 800 174" fill="none" stroke={colors.warm} strokeWidth="3" strokeLinecap="round" />
          <path d="M546 308 C 596 290, 640 286, 694 278 C 740 272, 782 266, 816 254" fill="none" stroke={colors.sky} strokeWidth="3" strokeLinecap="round" />
          <Spark x={796} y={158} color={colors.accent} />
        </>
      );
    case "strength":
      return (
        <>
          <Panel x={134} y={170} w={176} h={156} />
          <rect x="168" y="262" width="34" height="30" rx="10" fill={colors.warmSoft} />
          <rect x="214" y="226" width="34" height="66" rx="10" fill={colors.accentSoft} />
          <rect x="260" y="192" width="34" height="100" rx="10" fill={colors.skySoft} />
          <Arrow d="M310 244 C 372 244, 392 244, 434 244" color={colors.muted} />
          <Panel x={434} y={150} w={188} h={188} />
          <path d="M466 292 C 490 260, 510 238, 534 214 C 556 192, 580 174, 594 170" fill="none" stroke={colors.accent} strokeWidth="3" strokeLinecap="round" />
          <circle cx="466" cy="292" r="8" fill={colors.accent} />
          <circle cx="534" cy="214" r="8" fill={colors.warm} />
          <circle cx="594" cy="170" r="8" fill={colors.sky} />
          <Arrow d="M622 244 C 686 244, 714 244, 760 244" color={colors.accent} />
          <Panel x={760} y={138} w={96} h={212} fill={colors.accentWash} />
          <Bar x={784} y={182} w={48} color={colors.ink} opacity={0.9} />
          <Bar x={784} y={232} w={48} />
          <Bar x={784} y={282} w={48} color={colors.warm} />
        </>
      );
    default:
      return null;
  }
}

export default function ArticleIllustration({
  variant,
  className = "",
}: ArticleIllustrationProps) {
  const patternId = `article-illustration-grid-${variant}`;

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-2xl border border-border bg-[var(--illustration-surface)] ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top left, var(--illustration-accent-haze), transparent 42%), radial-gradient(circle at bottom right, var(--illustration-warm-haze), transparent 34%)",
        }}
      />
      <svg viewBox="0 0 960 520" className="relative block w-full h-auto">
        <defs>
          <pattern id={patternId} width="36" height="36" patternUnits="userSpaceOnUse">
            <path
              d="M36 0H0V36"
              fill="none"
              stroke={colors.grid}
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect x="0" y="0" width="960" height="520" fill={`url(#${patternId})`} />
        <rect
          x="24"
          y="24"
          width="912"
          height="472"
          rx="28"
          fill={colors.frameFill}
          stroke={colors.frameStroke}
        />

        <Spark x={888} y={74} color={colors.accent} />
        <Spark x={76} y={446} color={colors.warm} />

        {renderIllustration(variant)}
      </svg>
    </div>
  );
}
