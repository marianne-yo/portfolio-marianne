'use client';

import { useEffect, useRef, useState } from 'react';

export function ResponsiveCarouselWrapper({
  width,
  height,
  children
}: {
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(entries => {
      const containerWidth = entries[0]?.contentRect.width;
      if (containerWidth) {
        setScale(Math.min(containerWidth / width, 1)); // never scale up past original size
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={outerRef} className="w-full max-w-[400px] mx-auto overflow-hidden" style={{ height: height * scale }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
    </div>
  );
}