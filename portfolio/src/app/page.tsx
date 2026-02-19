import Image from "next/image";
import projects from "@/data/projects.json";

const HERO_TEXT: React.CSSProperties = {
  fontFamily: "var(--font-crimson-pro), 'Crimson Pro', Georgia, serif",
  fontSize: "48px",
  fontWeight: 500,
  color: "#1A1A1A",
  lineHeight: "52px",
  letterSpacing: "0.96px",
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


function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Image strip — 3 cols ≥1350px, single col below */}
      <div className="grid grid-cols-1 min-[1350px]:grid-cols-3 gap-[24px]">
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
          gap: "2px",
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
          display: "inline-grid",
          padding: "64px 72px",
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
