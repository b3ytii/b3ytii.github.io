(() => {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  const dot = document.createElement('div');  dot.className = 'cursor-dot';
  const ring = document.createElement('div'); ring.className = 'cursor-ring';
  document.body.append(ring, dot);
  root.classList.add('has-cursor');

  let x = 0, y = 0, rx = 0, ry = 0;

  addEventListener('mousemove', e => {
    x = e.clientX; y = e.clientY;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    dot.classList.remove('is-hidden'); ring.classList.remove('is-hidden');

    const dragging = root.classList.contains('is-dragging-split');
    const onHandle = dragging || !!e.target.closest?.('.bs-hero__handle');
    const hover = !onHandle &&
      !!e.target.closest?.('a, button, summary, input, [role="button"], .bs-prose img');

    ring.classList.toggle('is-drag', onHandle);
    dot.classList.toggle('is-drag', onHandle);
    ring.classList.toggle('is-hover', hover);
  });

  addEventListener('mousedown', () => ring.classList.add('is-down'));
  addEventListener('mouseup',   () => ring.classList.remove('is-down'));
  document.addEventListener('mouseleave', () => {
    dot.classList.add('is-hidden'); ring.classList.add('is-hidden');
  });

  (function loop() {
    rx += (x - rx) * 0.18;   
    ry += (y - ry) * 0.18;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(loop);
  })();
})();