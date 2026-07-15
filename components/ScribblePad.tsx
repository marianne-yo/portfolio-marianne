'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';

const COLORS = ['#1a1a1a', '#8400FF', '#FF6B6B', '#4ECDC4', '#FFD93D'];

export const ScribblePad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState(COLORS[1]);

  // size the canvas to its container (and rescale on resize) with retina support
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // preserve whatever's already drawn across a resize
      const snapshot = document.createElement('canvas');
      snapshot.width = canvas.width;
      snapshot.height = canvas.height;
      const snapshotCtx = snapshot.getContext('2d');
      if (snapshotCtx && canvas.width > 0) snapshotCtx.drawImage(canvas, 0, 0);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (snapshotCtx && snapshot.width > 0) {
        ctx.drawImage(snapshot, 0, 0, snapshot.width, snapshot.height, 0, 0, width, height);
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const getPoint = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      canvasRef.current?.setPointerCapture(e.pointerId);
      isDrawing.current = true;
      lastPoint.current = getPoint(e);
    },
    [getPoint]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawing.current) return;
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !lastPoint.current) return;

      const point = getPoint(e);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      lastPoint.current = point;
    },
    [color, getPoint]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = false;
    lastPoint.current = null;
    canvasRef.current?.releasePointerCapture(e.pointerId);
  }, []);

  const handleClear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium font-mono">DOODLE WITH ME</h2>
        <button
          onClick={handleClear}
          className="text-xs px-2 py-1 rounded-md border border-border hover:bg-muted transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="flex gap-2 mb-2">
        {COLORS.map(c => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className="w-5 h-5 rounded-full border-2 transition-transform hover:scale-110"
            style={{ backgroundColor: c, borderColor: c === color ? 'currentColor' : 'transparent' }}
            aria-label={`Select color ${c}`}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative flex-1 min-h-[180px] md:min-h-[100px] rounded-md bg-white/5 border border-border overflow-hidden touch-none"
       >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
        />
      </div>
    </div>
  );
};