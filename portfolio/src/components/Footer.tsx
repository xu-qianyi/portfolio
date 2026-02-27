const FOOT_TEXT: React.CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "12px",
  fontWeight: 500,
  color: "rgba(26,26,26,0.5)",
  margin: 0,
  textDecoration: "none",
  transition: "color 200ms ease",
};

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(26,26,26,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
        }}
      >
        <p style={FOOT_TEXT}>© 2026 made by Martta + Cursor + Claude Code + Figma MCP </p>
        <a
          href="https://linkedin.com/in/marttaxu"
          target="_blank"
          rel="noopener noreferrer"
          style={FOOT_TEXT}
          className="hover-ink"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
