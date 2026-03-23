/** Pixel-art Claude crab SVG */
const Clawd = ({ size = 22 }: { size?: number }) => (
  <svg
    width={size * 1.4}
    height={size}
    viewBox="0 0 21 14"
    xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: "pixelated", display: "block" }}
  >
    <rect x="2" y="0" width="17" height="11" fill="#DA7756" />
    <rect x="0" y="6" width="2" height="2" fill="#DA7756" />
    <rect x="19" y="6" width="2" height="2" fill="#DA7756" />
    <rect x="6" y="5" width="2" height="2" fill="#2a2a2a" />
    <rect x="13" y="5" width="2" height="2" fill="#2a2a2a" />
    <rect x="3" y="11" width="2" height="3" fill="#DA7756" />
    <rect x="7" y="11" width="2" height="3" fill="#DA7756" />
    <rect x="12" y="11" width="2" height="3" fill="#DA7756" />
    <rect x="16" y="11" width="2" height="3" fill="#DA7756" />
  </svg>
);

export default Clawd;
