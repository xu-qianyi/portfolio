import Image from "next/image";
import CalendarWidget from "@/components/CalendarWidget";

function PhotoTile({
  src,
  alt,
  style,
  polaroid = true,
}: {
  src: string;
  alt: string;
  style: React.CSSProperties;
  polaroid?: boolean;
}) {
  return (
    <article className="about-cell" style={style}>
      <div className={polaroid ? "about-polaroid" : "about-photo-plain"}>
        <div className="about-photo-inner">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 14vw, 25vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </article>
  );
}

function TextTile({
  style,
  accent,
  children,
}: {
  style: React.CSSProperties;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <article className="about-cell" style={style}>
      <div className={accent ? "about-accent-note" : "about-text-muted"}>
        {children}
      </div>
    </article>
  );
}

export default function About() {
  return (
    <section className="about-page">
      <div className="about-grid-board">
        <div className="about-grid">
          <TextTile style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}>
            I studied Engineering + Design at{" "}
            <a
              href="https://www.northeastern.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
              data-num="1"
            >
              Northeastern
            </a>{" "}
            and Finance at{" "}
            <a
              href="https://www.bc.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
              data-num="2"
            >
              Boston College
            </a>
            .
          </TextTile>

          <PhotoTile
            src="/images/about/graduation.webp"
            alt="Graduation"
            style={{ gridColumn: "3", gridRow: "1 / 3" }}
          />

          <PhotoTile
            src="/images/about/commencement.webp"
            alt="Commencement"
            style={{ gridColumn: "4", gridRow: "1" }}
            polaroid={false}
          />

          <PhotoTile
            src="/images/about/swing.webp"
            alt="Swing dancing"
            style={{ gridColumn: "5 / 7", gridRow: "2 / 4" }}
          />

          <PhotoTile
            src="/images/about/swing-2.webp"
            alt="Swing dancing"
            style={{ gridColumn: "7", gridRow: "1" }}
            polaroid={false}
          />

          <PhotoTile
            src="/images/about/cat-sleep.webp"
            alt="My cat sleeping"
            style={{ gridColumn: "8", gridRow: "2 / 4" }}
          />

          <TextTile style={{ gridColumn: "1 / 3", gridRow: "3" }}>
            I practice{" "}
            <a
              href="https://en.wikipedia.org/wiki/Swing_(dance)"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
              data-num="3"
            >
              Swing
            </a>{" "}
            to clear my head.
          </TextTile>

          <PhotoTile
            src="/images/about/martta-fufu.webp"
            alt="With my cat Fufu"
            style={{ gridColumn: "4 / 6", gridRow: "3 / 5" }}
          />

          <PhotoTile
            src="/images/about/fufu.webp"
            alt="Fufu illustration"
            style={{ gridColumn: "6", gridRow: "3" }}
            polaroid={false}
          />

          <PhotoTile
            src="/images/about/balboa.webp"
            alt="Balboa night"
            style={{ gridColumn: "7", gridRow: "3" }}
            polaroid={false}
          />

          <TextTile style={{ gridColumn: "1 / 3", gridRow: "4 / 6" }}>
            Oh, and I have a brave 5-year-old cat. He keeps competing with AI
            for my attention and wins more often than I expect.
          </TextTile>

          <article
            className="about-cell"
            style={{ gridColumn: "6 / 9", gridRow: "4 / 6" }}
          >
            <CalendarWidget />
          </article>
        </div>
      </div>
    </section>
  );
}
