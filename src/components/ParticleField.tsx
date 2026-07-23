import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  z: number;
  phase: number;
};

const TAU = Math.PI * 2;

function drawAsterisk(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, time: number) {
  const pulse = 1 + Math.sin(time * 0.0015) * 0.04;
  const r = radius * pulse;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(time * 0.00008);
  ctx.lineCap = "round";

  for (let glow = 4; glow >= 0; glow -= 1) {
    ctx.beginPath();
    const alpha = glow === 0 ? 0.98 : 0.055;
    ctx.strokeStyle = `rgba(190, 160, 255, ${alpha})`;
    ctx.lineWidth = glow === 0 ? Math.max(1.35, radius * 0.025) : radius * (0.035 + glow * 0.018);
    ctx.shadowBlur = glow === 0 ? radius * 0.24 : radius * (0.2 + glow * 0.1);
    ctx.shadowColor = "rgba(155, 105, 255, .95)";

    for (let arm = 0; arm < 4; arm += 1) {
      const angle = arm * (Math.PI / 4);
      const dx = Math.cos(angle) * r;
      const dy = Math.sin(angle) * r;
      ctx.moveTo(-dx, -dy);
      ctx.lineTo(dx, dy);
    }
    ctx.stroke();
  }

  ctx.restore();
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let points: Point[] = [];
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let reducedMotion = mediaQuery.matches;

    const densityScale = () => {
      if (reducedMotion) return 0.35;
      if (width < 720) return 0.45;
      if (width < 1100) return 0.7;
      return 1;
    };

    const buildPoints = () => {
      points = [];
      const scale = densityScale();
      const columns = Math.max(18, Math.floor((width / 16) * scale));
      const rows = Math.max(12, Math.floor((height / 17) * scale));

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < columns; col += 1) {
          points.push({
            x: col / Math.max(1, columns - 1),
            y: row / Math.max(1, rows - 1),
            z: Math.random(),
            phase: Math.random() * TAU,
          });
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildPoints();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      targetPointerX = (event.clientX - rect.left) / rect.width - 0.5;
      targetPointerY = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const paint = (time: number) => {
      context.clearRect(0, 0, width, height);
      pointerX += (targetPointerX - pointerX) * 0.035;
      pointerY += (targetPointerY - pointerY) * 0.035;

      const cx = width * (0.52 + pointerX * 0.025);
      const cy = height * (0.46 + pointerY * 0.018);
      const horizon = height * 0.58;
      const speed = reducedMotion ? 0 : time * 0.00038;

      const vignette = context.createRadialGradient(cx, cy, 0, cx, cy, width * 0.58);
      vignette.addColorStop(0, "rgba(72, 42, 150, .15)");
      vignette.addColorStop(0.45, "rgba(20, 14, 48, .08)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);

      for (const point of points) {
        const px = (point.x - 0.5) * width * 1.3;
        const depth = 0.22 + point.y * 1.55;
        const wave =
          Math.sin(point.x * 11 + speed * 2.1 + point.phase) * 15 +
          Math.cos(point.y * 8 - speed * 1.6) * 10;
        const perspective = 0.62 + point.y * 0.72;
        const x = cx + px * perspective + pointerX * point.y * 34;
        const y = horizon + (point.y - 0.45) * height * 0.72 + wave * depth + pointerY * point.y * 24;
        const distanceToCenter = Math.hypot(x - cx, y - cy);
        const aura = Math.max(0, 1 - distanceToCenter / (width * 0.38));
        const alpha = Math.min(0.92, 0.12 + point.y * 0.48 + aura * 0.42) * (0.72 + point.z * 0.28);
        const radius = 0.45 + point.y * 1.45 + aura * 0.8;

        context.beginPath();
        context.fillStyle = `rgba(${190 + Math.floor(point.z * 45)}, ${178 + Math.floor(point.z * 35)}, 255, ${alpha})`;
        context.shadowBlur = aura > 0.55 ? 8 : 0;
        context.shadowColor = "rgba(143, 91, 255, .8)";
        context.arc(x, y, radius, 0, TAU);
        context.fill();
      }

      context.shadowBlur = 0;
      drawAsterisk(context, cx + width * 0.05, cy - height * 0.03, Math.min(width, height) * 0.13, reducedMotion ? 0 : time);
    };

    const render = (time: number) => {
      paint(time);
      if (!reducedMotion) {
        frame = requestAnimationFrame(render);
      }
    };

    const onMotionChange = () => {
      reducedMotion = mediaQuery.matches;
      cancelAnimationFrame(frame);
      buildPoints();
      if (reducedMotion) {
        paint(0);
      } else {
        frame = requestAnimationFrame(render);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    mediaQuery.addEventListener("change", onMotionChange);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      mediaQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
