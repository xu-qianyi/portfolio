/** Animated cat-ear SVG with idle twitch keyframes */
const CatEars = ({ size = 24, color = "rgba(0, 0, 0, 0.4)" }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: "visible", display: "inline-block", verticalAlign: "middle" }}
  >
    <style>{`
      .cat-ear-left, .cat-ear-right { transform-origin: bottom center; transform-box: fill-box; }
      @keyframes catLeftEarTwitch {
        0%, 9% { transform: rotate(0deg); }
        12% { transform: rotate(-10deg); }
        16%, 34% { transform: rotate(0deg); }
        38% { transform: rotate(-15deg); }
        42% { transform: rotate(-5deg); }
        48%, 58% { transform: rotate(0deg); }
        62% { transform: rotate(-25deg); }
        70% { transform: rotate(-20deg); }
        78%, 100% { transform: rotate(0deg); }
      }
      @keyframes catRightEarTwitch {
        0%, 9% { transform: rotate(0deg); }
        12% { transform: rotate(6deg); }
        16%, 34% { transform: rotate(0deg); }
        38% { transform: rotate(10deg); }
        42% { transform: rotate(4deg); }
        48%, 58% { transform: rotate(0deg); }
        62% { transform: rotate(-15deg); }
        70% { transform: rotate(-10deg); }
        78%, 100% { transform: rotate(0deg); }
      }
      .cat-ear-left { animation: catLeftEarTwitch 12s ease-in-out infinite; }
      .cat-ear-right { animation: catRightEarTwitch 12s ease-in-out infinite; }
    `}</style>
    <g transform="translate(6, 8)">
      <path className="cat-ear-left" d="M 1 14 L 3 6 L 8 12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path className="cat-ear-right" d="M 25 14 L 23 6 L 18 12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  </svg>
);

export default CatEars;
