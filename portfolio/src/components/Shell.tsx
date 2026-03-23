"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import AnimalGardenFooter from "./AnimalGardenFooter";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about" || pathname.startsWith("/about/");
  const shouldShowFooter = !isAboutPage;
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerH, setFooterH] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setFooterH(entry.contentRect.height);
    });
    ro.observe(footerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* ── Main content: covers the footer while scrolling ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "var(--color-surface)",
          marginBottom: shouldShowFooter ? footerH : 0,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              minHeight: "100dvh",
            }}
          >
            <Navbar />
            <main
              key={pathname}
              style={{
                flex: 1,
                overflow: isAboutPage ? "hidden" : "visible",
              }}
            >
              {children}
            </main>
          </div>
        </div>
      </div>

      {/* ── Footer: sticky at the bottom, revealed when main scrolls away ── */}
      {shouldShowFooter ? (
        <div
          ref={footerRef}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 0,
          }}
        >
          <AnimalGardenFooter />
        </div>
      ) : null}
    </>
  );
}
