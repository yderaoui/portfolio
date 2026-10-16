import { useEffect, useRef } from 'react';

// Perspective-projected particles give the viewport depth without a 3D dependency.
export function SpaceScene({ motion, warp }) {
  const canvas = useRef(null);
  const warpActive = useRef(warp);
  useEffect(() => { warpActive.current = warp; }, [warp]);

  useEffect(() => {
    const element = canvas.current;
    const context = element.getContext('2d');
    if (!context) return;
    let width = 0, height = 0, particles = [], frame = 0, previousTime = 0;
    let pointerX = 0, pointerY = 0, cameraX = 0, cameraY = 0, speed = .035;
    let seed = 16002;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      const ratio = Math.min(devicePixelRatio || 1, width < 760 ? 1 : 1.5);
      element.width = Math.round(width * ratio);
      element.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      seed = 16002;
      particles = Array.from({ length: width < 760 ? 190 : 480 }, () => ({
        x: (random() - .5) * width * 2.5,
        y: (random() - .5) * height * 2.5,
        z: random() * 2 + .1,
        size: random() * 1.2 + .25,
        color: random() > .88 ? '#ff538e' : random() > .73 ? '#5cffff' : '#d7e5ff',
      }));
      if (!motion) draw(0);
    };
    const draw = delta => {
      context.clearRect(0, 0, width, height);
      cameraX += (pointerX - cameraX) * Math.min(1, delta * 3);
      cameraY += (pointerY - cameraY) * Math.min(1, delta * 3);
      speed += ((warpActive.current ? 1.7 : .035) - speed) * Math.min(1, delta * 4);
      const centerX = width * .56 + cameraX;
      const centerY = height * .44 + cameraY;
      context.lineCap = 'round';
      for (const star of particles) {
        star.z -= delta * speed;
        if (star.z < .08) star.z = 2.1;
        const scale = .8 / star.z;
        const x = centerX + star.x * scale;
        const y = centerY + star.y * scale;
        if (x < -30 || x > width + 30 || y < -30 || y > height + 30) continue;
        context.globalAlpha = Math.min(.85, (.3 + (2.1 - star.z) * .28));
        context.fillStyle = star.color;
        if (speed > .13) {
          const tail = .8 / (star.z + speed * .035);
          context.strokeStyle = star.color;
          context.lineWidth = Math.min(2, star.size * scale);
          context.beginPath();
          context.moveTo(centerX + star.x * tail, centerY + star.y * tail);
          context.lineTo(x, y);
          context.stroke();
        } else {
          context.beginPath();
          context.arc(x, y, Math.min(2, star.size * scale * .7), 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
    };
    const tick = time => {
      frame = 0;
      if (document.hidden) return;
      const elapsed = time - previousTime;
      if (elapsed >= (width < 760 ? 32 : 16)) {
        draw(Math.min(elapsed / 1000, .05));
        previousTime = time;
      }
      frame = requestAnimationFrame(tick);
    };
    const point = event => {
      pointerX = (event.clientX / width - .5) * 65;
      pointerY = (event.clientY / height - .5) * 45;
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (!document.hidden && motion) { previousTime = performance.now(); frame = requestAnimationFrame(tick); }
    };
    resize();
    draw(0);
    if (motion) frame = requestAnimationFrame(tick);
    addEventListener('resize', resize);
    if (motion) addEventListener('pointermove', point, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('resize', resize);
      removeEventListener('pointermove', point);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [motion]);

  return <canvas ref={canvas} className="space-canvas" aria-hidden="true" />;
}

export function CockpitFrame() {
  return <div className="cockpit-frame" aria-hidden="true">
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="none">
      <path className="frame-structure" d="M0 0h230l42 32h1056l42-32h230v110l-26 32v625l26 40v193h-270l-65-46H335l-65 46H0V807l26-40V142L0 110Z" />
      <path className="frame-light" d="M12 245V150l24-30V60h180l42 32h125M1588 245V150l-24-30V60h-180l-42 32h-125M12 750v40l24 32v95h200l50-35h130M1588 750v40l-24 32v95h-200l-50-35h-130" />
      <path className="frame-secondary" d="M48 300v130m0 50v75m1504-255v130m0 50v75M580 974h440" />
    </svg>
    <div className="cockpit-scanlines" />
    <div className="cockpit-vignette" />
  </div>;
}
