"use client";

import { useState, useEffect, type CSSProperties } from "react";
import Link from "next/link";

const NAV_LINK: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "#1a1a1a",
  textDecoration: "none",
  transition: "opacity 200ms ease",
};

export default function Navbar() {
  const [logoHovered,   setLogoHovered]   = useState(false);
  const [workHovered,   setWorkHovered]   = useState(false);
  const [aboutHovered,  setAboutHovered]  = useState(false);
  const [extrasHovered, setExtrasHovered] = useState(false);
  const [resumeHovered, setResumeHovered] = useState(false);
  const [timeStr,       setTimeStr]       = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    });
    const tick = () => setTimeStr(fmt.format(new Date()).toLowerCase());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backgroundColor: "var(--color-surface)",
      }}
    >
      <nav
        className="grid-layout items-center py-[12px]"
      >
        {/* col-start-1 col-span-2 — Logo */}
        <Link
          href="/"
          className="col-start-1 col-span-1"
          style={{ ...NAV_LINK, display: "inline-flex", alignItems: "center" }}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <span style={{ opacity: logoHovered ? 0.7 : 1, transition: "opacity 200ms ease" }}>Martta XU</span>
        </Link>

        {/* col-start-7 col-span-5 — Nav links */}
        <div className="col-start-7 col-span-4 flex items-center gap-[24px]">
          <Link
            href="/"
            style={{ ...NAV_LINK, opacity: workHovered ? 0.7 : 1 }}
            onMouseEnter={() => setWorkHovered(true)}
            onMouseLeave={() => setWorkHovered(false)}
          >
            Work
          </Link>
          <Link
            href="/about"
            style={{ ...NAV_LINK, opacity: aboutHovered ? 0.7 : 1 }}
            onMouseEnter={() => setAboutHovered(true)}
            onMouseLeave={() => setAboutHovered(false)}
          >
            About
          </Link>
          <Link
            href="/extras"
            style={{ ...NAV_LINK, opacity: extrasHovered ? 0.7 : 1 }}
            onMouseEnter={() => setExtrasHovered(true)}
            onMouseLeave={() => setExtrasHovered(false)}
          >
            Extras
          </Link>
          <a
            href="https://drive.google.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...NAV_LINK, opacity: resumeHovered ? 0.7 : 1 }}
            onMouseEnter={() => setResumeHovered(true)}
            onMouseLeave={() => setResumeHovered(false)}
          >
            Resume
          </a>
        </div>

        {/* col-start-12 — Clock */}
        {timeStr && (
          <span className="col-start-11 col-span-2 hidden lg:flex justify-end" style={{ ...NAV_LINK }}>
            {timeStr.replace(/\s*(am|pm)/i, "")} Boston, MA
          </span>
        )}
      </nav>
    </header>
  );
}
