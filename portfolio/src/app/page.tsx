import Image from "next/image";
import projects from "@/data/projects.json";

const HERO_TEXT: React.CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "#1A1A1A",
  lineHeight: "140%",
  letterSpacing: "0px",
  margin: 0,
};

const PROJECT_META: React.CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: "rgba(26,26,26,0.5)",
  margin: 0,
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
};

const PROJECT_HEADLINE: React.CSSProperties = {
  fontFamily: "var(--font-playfair-display), 'Playfair Display', Georgia, serif",
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "130%",
  color: "#1A1A1A",
  margin: 0,
};

function DotSeparator() {
  return (
    <span
      style={{
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        backgroundColor: "rgba(26,26,26,0.3)",
        flexShrink: 0,
      }}
    />
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <div style={{ breakInside: "avoid", marginBottom: "48px" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: project.aspectRatio,
          border: "1px solid rgba(204,209,218,0.2)",
          overflow: "hidden",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Image
          src={project.image}
          alt={project.headline}
          fill
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </div>

      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
        <p style={PROJECT_META}>
          <span>{project.company}</span>
          <DotSeparator />
          <span>{project.date}</span>
          <DotSeparator />
          <span>{project.type}</span>
        </p>
        <p style={PROJECT_HEADLINE}>{project.headline}</p>
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
          display: "inline-grid",
          padding: "64px 24px",
          rowGap: "80px",
          columnGap: "16px",
          alignSelf: "stretch",
          gridTemplateRows: "repeat(1, fit-content(100%))",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
        }}
      >
        <p style={HERO_TEXT}>
          Martta is a product designer who stands at the intersection of design, business, and engineering.
        </p>
        {/* Intentional negative space */}
        <div aria-hidden="true" />
      </section>

      {/* Masonry project grid */}
      <section className="columns-1 lg:columns-2 gap-x-[24px]" style={{ padding: "0 24px 80px" }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </>
  );
}
