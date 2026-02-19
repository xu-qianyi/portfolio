"use client";

import Link from "next/link";

interface NavbarProps {
  onAskMartta: () => void;
}

const NAV_LINK: React.CSSProperties = {
  fontFamily: "'Switzer', sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "rgba(26,26,26,0.5)",
  letterSpacing: "0.32px",
  lineHeight: "normal",
  textDecoration: "none",
  transition: "color 200ms ease",
};

const PILL: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 12px",
  borderRadius: "9999px",
};

export default function Navbar({ onAskMartta }: NavbarProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid rgba(26,26,26,0.1)",
      }}
    >
      <nav
        style={{
          display: "flex",
          padding: "20px 72px",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            ...NAV_LINK,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          className="hover-ink"
        >
          {/* horse.svg icon mark */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 256 256"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M136,100a12,12,0,1,1-12-12A12,12,0,0,1,136,100Zm96,29.48A104.29,104.29,0,0,1,130.1,232l-2.17,0a103.32,103.32,0,0,1-69.26-26A8,8,0,1,1,69.34,194a84.71,84.71,0,0,0,20.1,13.37L116,170.84c-22.78-9.83-47.47-5.65-61.4-3.29A31.84,31.84,0,0,1,23.3,154.72l-.3-.43-13.78-22a8,8,0,0,1,2.59-11.05L112,59.53V32a8,8,0,0,1,8-8h8A104,104,0,0,1,232,129.48Zm-16-.22A88,88,0,0,0,128,40V64a8,8,0,0,1-3.81,6.81L27.06,130.59l9.36,15A15.92,15.92,0,0,0,52,151.77c16-2.7,48.77-8.24,78.07,8.18A40.06,40.06,0,0,0,168,120a8,8,0,0,1,16,0,56.07,56.07,0,0,1-51.8,55.83l-27.11,37.28A90.89,90.89,0,0,0,129.78,216,88.29,88.29,0,0,0,216,129.26Z" />
          </svg>
          Martta XU
        </Link>

        {/* Right nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link
            href="https://drive.google.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...NAV_LINK, ...PILL }}
            className="hover-ink"
          >
            Resume
          </Link>
          <Link
            href="/about"
            style={{ ...NAV_LINK, ...PILL }}
            className="hover-ink"
          >
            About
          </Link>
          <Link
            href="/tools"
            style={{ ...NAV_LINK, ...PILL }}
            className="hover-ink"
          >
            Tools
          </Link>
          <button
            onClick={onAskMartta}
            style={{
              ...NAV_LINK,
              ...PILL,
              background: "none",
              border: "none",
              cursor: "pointer",
              gap: "6px",
            }}
            className="hover-ink"
            aria-haspopup="dialog"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M11.1244 1.09094H12.8753L12.9269 1.9453C13.2227 6.85075 17.1493 10.7773 22.0546 11.0732L22.909 11.1247V12.8757L22.0546 12.9272C17.1493 13.2231 13.2227 17.1498 12.9269 22.0551L12.8753 22.9095H11.1244L11.0728 22.0551C10.777 17.1498 6.85036 13.2231 1.94518 12.9272L1.09082 12.8757V11.1247L1.94518 11.0732C6.85036 10.7773 10.777 6.85075 11.0728 1.9453L11.1244 1.09094ZM11.9999 5.85023C10.83 8.61547 8.61512 10.8304 5.84996 12.0002C8.61512 13.1701 10.83 15.385 11.9999 18.1502C13.1697 15.385 15.3846 13.1701 18.1498 12.0002C15.3846 10.8304 13.1697 8.61547 11.9999 5.85023Z"
                fill="currentColor"
              />
            </svg>
            ASK Martta
          </button>
        </div>
      </nav>
    </header>
  );
}
