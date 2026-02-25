"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  onAskMartta: () => void;
}

const NAV_LINK: React.CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: "#1a1a1a",
  letterSpacing: "0.32px",
  lineHeight: "normal",
  textDecoration: "none",
  transition: "color 200ms ease, opacity 200ms ease",
};

const PILL: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px",
  borderRadius: "9999px",
};

type PillId = "resume" | "about" | "tools" | null;
type NavItemId = Exclude<PillId, null>;

const NAV_ITEMS: Array<{
  id: NavItemId;
  label: string;
  href: string;
  external?: boolean;
}> = [
  { id: "resume", label: "Resume", href: "https://drive.google.com", external: true },
  { id: "about", label: "About", href: "/about" },
  { id: "tools", label: "Tools", href: "/tools" },
];

export default function Navbar({ onAskMartta }: NavbarProps) {
  const [askHovered, setAskHovered] = useState(false);
  const [pillHovered, setPillHovered] = useState<PillId>(null);

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
          height: "fit-content",
          padding: "16px 24px",
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
        >
          <Image
            src="/许谦益之印_红色.svg"
            alt=""
            width={28}
            height={28}
            aria-hidden
          />
          Martta XU
        </Link>

        {/* Right nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              style={{
                ...NAV_LINK,
                ...PILL,
                opacity: pillHovered === item.id ? 0.5 : 1,
              }}
              onMouseEnter={() => setPillHovered(item.id)}
              onMouseLeave={() => setPillHovered(null)}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={onAskMartta}
            onMouseEnter={() => setAskHovered(true)}
            onMouseLeave={() => setAskHovered(false)}
            style={{
              ...NAV_LINK,
              ...PILL,
              background: askHovered ? "#ECF3F8" : "none",
              borderRadius: "4px",
              color: askHovered ? "#003966" : "#1a1a1a",
              border: "none",
              cursor: "pointer",
              transition: "color 300ms cubic-bezier(0.4, 0, 0.2, 1), background 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            aria-label="Ask Martta"
            aria-haspopup="dialog"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M11.1244 1.09094H12.8753L12.9269 1.9453C13.2227 6.85075 17.1493 10.7773 22.0546 11.0732L22.909 11.1247V12.8757L22.0546 12.9272C17.1493 13.2231 13.2227 17.1498 12.9269 22.0551L12.8753 22.9095H11.1244L11.0728 22.0551C10.777 17.1498 6.85036 13.2231 1.94518 12.9272L1.09082 12.8757V11.1247L1.94518 11.0732C6.85036 10.7773 10.777 6.85075 11.0728 1.9453L11.1244 1.09094ZM11.9999 5.85023C10.83 8.61547 8.61512 10.8304 5.84996 12.0002C8.61512 13.1701 10.83 15.385 11.9999 18.1502C13.1697 15.385 15.3846 13.1701 18.1498 12.0002C15.3846 10.8304 13.1697 8.61547 11.9999 5.85023Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
