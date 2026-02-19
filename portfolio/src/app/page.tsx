"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import projects from "@/data/projects.json";

const COMPANIES: Record<string, string> = {
  Datalign: "https://datalign.com",
  ARK7: "https://ark7.com",
  Sanofi: "https://sanofi.com",
  JLL: "https://jll.com",
  PwC: "https://pwc.com",
};

type HeadlinePart =
  | { text: string; company?: undefined }
  | { company: string; text?: undefined };

const HEADLINE: HeadlinePart[] = [
  { text: "I design access. I studied complicated things because I believe they should be easier for everyone. Previously made wealth management approachable at " },
  { company: "Datalign" },
  { text: ", fractional real estate intuitive at " },
  { company: "ARK7" },
  { text: ", and built strategy at " },
  { company: "Sanofi" },
  { text: ", " },
  { company: "JLL" },
  { text: ", and " },
  { company: "PwC" },
  { text: " — always asking: why does this have to be so hard to use?" },
];

const HERO_TEXT: React.CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  fontWeight: 400,
  color: "#1A1A1A",
  lineHeight: "normal",
  letterSpacing: "0.32px",
  margin: 0,
};

const PROJECT_TITLE: React.CSSProperties = {
  fontFamily: "'Switzer', sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "#1A1A1A",
  margin: 0,
};

const PROJECT_DESC: React.CSSProperties = {
  fontFamily: "'Switzer', sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "rgba(26,26,26,0.5)",
  margin: 0,
};

function CompanyLink({ name, href }: { name: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: "#1A1A1A",
        textDecoration: hovered ? "underline" : "none",
        textUnderlineOffset: "3px",
        transition: "text-decoration 200ms ease",
      }}
    >
      {name}
    </Link>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Image strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "24px",
        }}
      >
        {project.images.map((src, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              height: "339px",
              border: "1px solid rgba(204,209,218,0.2)",
              overflow: "hidden",
              backgroundColor: "#F5F5F5",
            }}
          >
            <Image
              src={src}
              alt={`${project.title} — screenshot ${i + 1}`}
              fill
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Text block */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          marginTop: "24px",
        }}
      >
        <p style={PROJECT_TITLE}>{project.title}</p>
        <p style={PROJECT_DESC}>{project.description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "32px",
          rowGap: "80px",
          padding: "72px",
        }}
      >
        <p style={HERO_TEXT}>
          {HEADLINE.map((part, i) => {
            if (part.company !== undefined) {
              const company = part.company;
              return (
                <CompanyLink
                  key={i}
                  name={company}
                  href={COMPANIES[company] ?? "#"}
                />
              );
            }
            return <span key={i}>{part.text}</span>;
          })}
        </p>
        {/* Intentional negative space */}
        <div aria-hidden="true" />
      </section>

      {/* Project grid */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "60px",
          padding: "0 72px 80px",
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </>
  );
}
