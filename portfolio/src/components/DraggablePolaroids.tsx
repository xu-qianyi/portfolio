"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface PhotoAsset {
  src: string;
  alt: string;
}

const PHOTOS: PhotoAsset[] = [
  { src: "/images/about/graduation.webp", alt: "Graduation" },
  { src: "/images/about/martta-fufu.webp", alt: "Martta & Fufu" },
  { src: "/images/about/swing.webp", alt: "Swing dancing" },
  { src: "/images/about/cat-sleep.webp", alt: "Cat sleeping" },
  { src: "/images/about/fufu.webp", alt: "Fufu" },
  { src: "/images/about/swing-2.webp", alt: "Swing 2" },
  { src: "/images/about/commencement.webp", alt: "Commencement" },
];

/** md–lg — staggered zones so frames don’t bunch in the same corner */
const POSES_TABLET = [
  { rotate: -8, x: 8, y: 10 },
  { rotate: 7, x: 76, y: 6 },
  { rotate: -11, x: 4, y: 48 },
  { rotate: 10, x: 70, y: 42 },
  { rotate: -5, x: 16, y: 84 },
  { rotate: 13, x: 42, y: 60 },
  { rotate: -7, x: 68, y: 74 },
] as const;

/** lg+ — wider separation: alternate left/right bands and different Y bands */
const POSES_DESKTOP = [
  { rotate: -13, x: 5, y: 8 },
  { rotate: 12, x: 86, y: 6 },
  { rotate: -16, x: 2, y: 48 },
  { rotate: 15, x: 90, y: 44 },
  { rotate: -10, x: 10, y: 86 },
  { rotate: 18, x: 44, y: 64 },
  { rotate: -12, x: 80, y: 80 },
] as const;

/** lg+ — full size */
const LAYOUT_LG = { w: 180, pad: 12, bot: 36 } as const;
/** md–lg (tablet) — slightly smaller */
const LAYOUT_MD = { w: 148, pad: 10, bot: 30 } as const;

type PolaroidLayout = typeof LAYOUT_LG | typeof LAYOUT_MD;

function Polaroid({
  photo,
  dims,
  onPointerDown,
  style,
  zIndex,
}: {
  photo: PhotoAsset;
  dims: PolaroidLayout;
  onPointerDown: (e: React.PointerEvent) => void;
  style: React.CSSProperties;
  zIndex: number;
}) {
  const { w, pad, bot } = dims;
  return (
    <div
      onPointerDown={onPointerDown}
      style={{
        position: "absolute",
        padding: pad,
        paddingBottom: bot,
        background: "#fff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)",
        borderRadius: 2,
        touchAction: "none",
        userSelect: "none",
        zIndex,
        ...style,
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={w}
        height={w}
        style={{
          width: w,
          height: w,
          objectFit: "cover",
          display: "block",
          pointerEvents: "none",
        }}
        draggable={false}
      />
    </div>
  );
}

export default function DraggablePolaroids() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<PolaroidLayout>(LAYOUT_LG);
  const [positions, setPositions] = useState<{ x: number; y: number; rotate: number }[]>([]);
  const [zIndices, setZIndices] = useState<number[]>(() => {
    const indices = PHOTOS.map((_, i) => i);
    // 随机打乱数组以实现初始的随机堆叠顺序
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });
  const topZ = useRef(PHOTOS.length);
  const dragging = useRef<{
    index: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    const applyLayout = () => {
      const d = mq.matches ? LAYOUT_LG : LAYOUT_MD;
      const poses = mq.matches ? POSES_DESKTOP : POSES_TABLET;
      const rect = container.getBoundingClientRect();
      const totalW = d.w + d.pad * 2;
      const totalH = d.w + d.pad + d.bot;

      setDims(d);
      setPositions(
        poses.map((p) => ({
          x: (p.x / 100) * Math.max(rect.width - totalW, 0),
          y: (p.y / 100) * Math.max(rect.height - totalH, 0),
          rotate: p.rotate,
        }))
      );
    };

    applyLayout();
    mq.addEventListener("change", applyLayout);
    return () => mq.removeEventListener("change", applyLayout);
  }, []);

  const handlePointerDown = useCallback(
    (index: number) => (e: React.PointerEvent) => {
      e.preventDefault();
      const el = e.currentTarget as HTMLElement;
      el.setPointerCapture(e.pointerId);

      dragging.current = {
        index,
        startX: e.clientX,
        startY: e.clientY,
        origX: positions[index].x,
        origY: positions[index].y,
      };

      topZ.current += 1;
      setZIndices((prev) => {
        const next = [...prev];
        next[index] = topZ.current;
        return next;
      });
    },
    [positions]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const { index, startX, startY, origX, origY } = dragging.current;
    setPositions((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        x: origX + (e.clientX - startX),
        y: origY + (e.clientY - startY),
      };
      return next;
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = null;
  }, []);

  if (positions.length === 0) {
    return (
      <div
        ref={containerRef}
        className="relative hidden min-h-[min(480px,55vh)] w-full min-w-0 max-w-full grow-0 md:block md:min-h-[min(520px,60vh)] lg:absolute lg:inset-y-0 lg:right-0 lg:min-h-0 lg:w-1/2 lg:max-w-[50%]"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative hidden min-h-[min(480px,55vh)] w-full min-w-0 max-w-full grow-0 md:block md:min-h-[min(520px,60vh)] lg:absolute lg:inset-y-0 lg:right-0 lg:min-h-0 lg:w-1/2 lg:max-w-[50%]"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {PHOTOS.map((photo, i) => (
        <Polaroid
          key={photo.src}
          photo={photo}
          dims={dims}
          zIndex={zIndices[i]}
          onPointerDown={handlePointerDown(i)}
          style={{
            left: positions[i].x,
            top: positions[i].y,
            transform: `rotate(${positions[i].rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
