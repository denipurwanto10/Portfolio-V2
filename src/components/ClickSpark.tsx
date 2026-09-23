import { useRef, useEffect, useCallback, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";

type SparkType = "line" | "stripe" | "triangle";

interface Spark {
  type: SparkType;
  x: number;
  y: number;
  angle: number;
  startTime: number;
  dur: number;
  size: number;
}

interface ClickSparkProps {
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-in-out" | "ease-out";
  extraScale?: number;
  children?: ReactNode;
}

const ClickSpark = ({
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
}: ClickSparkProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    let resizeTimeout: number | undefined;
    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 100);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);
    resizeCanvas();
    return () => { ro.disconnect(); window.clearTimeout(resizeTimeout); };
  }, []);

  const easeFunc = useCallback((t: number) => {
    switch (easing) {
      case "linear": return t;
      case "ease-in": return t * t;
      case "ease-in-out": return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: return 1 - Math.pow(1 - t, 2);
    }
  }, [easing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    mountedRef.current = true;

    const draw = (timestamp: number) => {
      if (!mountedRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= spark.dur) return false;

        const p = elapsed / spark.dur;
        const ep = easeFunc(p);

        if (spark.type === "line") {
          // ── garis pendek seperti percikan las/hazard
          const dist = ep * sparkRadius * extraScale;
          const lineLength = sparkSize * (1 - p);
          const x1 = spark.x + dist * Math.cos(spark.angle);
          const y1 = spark.y + dist * Math.sin(spark.angle);
          const x2 = spark.x + (dist + lineLength) * Math.cos(spark.angle);
          const y2 = spark.y + (dist + lineLength) * Math.sin(spark.angle);

          ctx.save();
          ctx.strokeStyle = p < 0.4 ? "#C8F135" : p < 0.7 ? "#a8c920" : "#6b8a0f";
          ctx.lineWidth = 1.8;
          ctx.globalAlpha = 1 - p * 0.6;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          ctx.restore();

        } else if (spark.type === "stripe") {
          // ── potongan kecil garis hazard diagonal
          const dist = ep * sparkRadius * 0.7 * extraScale;
          const cx = spark.x + dist * Math.cos(spark.angle);
          const cy = spark.y + dist * Math.sin(spark.angle);
          const size = spark.size * (1 - p * 0.5);

          ctx.save();
          ctx.globalAlpha = (1 - p) * 0.9;
          ctx.translate(cx, cy);
          ctx.rotate(spark.angle + Math.PI / 4);
          for (let k = 0; k < 3; k++) {
            const offset = (k - 1) * (size * 0.35);
            ctx.fillStyle = k % 2 === 0 ? "#C8F135" : "#0a0a08";
            ctx.fillRect(offset, -size * 0.5, size * 0.3, size);
          }
          ctx.restore();

        } else if (spark.type === "triangle") {
          // ── segitiga kecil ikon warning
          const dist = ep * sparkRadius * 0.5 * extraScale;
          const cx = spark.x + dist * Math.cos(spark.angle);
          const cy = spark.y + dist * Math.sin(spark.angle);
          const ts = spark.size * (1 - p * 0.4);

          ctx.save();
          ctx.globalAlpha = (1 - p) * 0.85;
          ctx.fillStyle = "#C8F135";
          ctx.beginPath();
          ctx.moveTo(cx, cy - ts);
          ctx.lineTo(cx - ts * 0.866, cy + ts * 0.5);
          ctx.lineTo(cx + ts * 0.866, cy + ts * 0.5);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        return true;
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      mountedRef.current = false;
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, [sparkSize, sparkRadius, duration, easeFunc, extraScale]);

  const handleClick = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return;

    const now = performance.now();
    const angleStep = (2 * Math.PI) / sparkCount;

    // Garis utama (seperti sebelumnya tapi lebih hazard)
    const lines: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      type: "line",
      x, y,
      angle: angleStep * i,
      startTime: now,
      dur: duration,
      size: sparkSize,
    }));

    // Stripe hazard kecil — setengah dari sparkCount
    const stripeCount = Math.max(2, Math.floor(sparkCount / 2));
    const stripes: Spark[] = Array.from({ length: stripeCount }, (_, i) => ({
      type: "stripe",
      x, y,
      angle: angleStep * i * 2 + 0.4,
      startTime: now,
      dur: duration * 0.85,
      size: 7,
    }));

    // Segitiga warning — 3 buah
    const triangles: Spark[] = Array.from({ length: 3 }, (_, i) => ({
      type: "triangle",
      x, y,
      angle: angleStep * (i * 2 + 1),
      startTime: now,
      dur: duration * 0.75,
      size: 4,
    }));

    sparksRef.current.push(...lines, ...stripes, ...triangles);
  }, [sparkCount, duration, sparkSize]);

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", cursor: "auto" }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          display: "block", pointerEvents: "none", zIndex: 9999,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default ClickSpark;
