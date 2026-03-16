import type { CSSProperties } from "react";
import Link from "next/link";
import CopyEmail from "@/components/CopyEmail";

const HERO_TEXT: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "#1A1A1A",
  lineHeight: "140%",
  letterSpacing: "0px",
  marginTop: 0,
  marginBottom: 0,
};

const PLACEHOLDERS = [1, 2, 3, 4, 5, 6];

export default function About() {
  return (
    <>
      {/* Text section */}
      <section className="grid lg:grid-cols-2 gap-y-[40px] gap-x-[16px] py-[64px] px-[72px] sm:pt-[28px] sm:pb-[40px] lg:pt-[52px] lg:pb-[64px]">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={HERO_TEXT}>
            I&apos;m a designer who reads the room - and the signal. I practice Swing - a dance
            with no routine, just feeling and responding to what you&apos;re given.
          </p>
          <p style={HERO_TEXT}>
            The path to here went through business and strategy. Both felt too far from the thing
            itself. Design is where I get to actually build something for someone to use.
          </p>
          <p style={HERO_TEXT}>
            I believe good experiences and beautiful things make people feel better. That&apos;s
            enough reason.
          </p>
          <p style={HERO_TEXT}>
            If you&apos;re building something, <CopyEmail />! Open to full-time roles and relocation.
          </p>
        </div>
        <div className="hidden sm:flex sm:flex-row sm:gap-x-[16px] lg:flex-col lg:items-end lg:gap-x-0 lg:gap-y-[4px]" style={HERO_TEXT}>
          <a
            href="https://drive.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-nav-link"
            data-num="1"
          >
            Resume
          </a>
          <Link href="/" className="hero-nav-link" data-num="2">
            Work
          </Link>
          <Link href="/extras" className="hero-nav-link" data-num="3">
            Extras
          </Link>
        </div>
      </section>

      {/* Photo strip */}
      <section style={{ padding: "0 72px 80px", display: "flex", gap: "8px" }}>
        {PLACEHOLDERS.map((n) => (
          <div
            key={n}
            style={{
              flex: 1,
              height: "320px",
              backgroundColor: "#F5F5F5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(26,26,26,0.3)",
              fontSize: "14px",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            Photo {n}
          </div>
        ))}
      </section>
    </>
  );
}
