
(() => {
  const title = document.querySelector('[data-hero-title]');
  if (!title) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const CHARS = '01!<>-_\\/[]{}=+*^?#$%&@';
  const SPEED = 45;      
  const TICK  = 40;      
  const START_DELAY = 250;

 
  const layers = [...title.querySelectorAll('.bs-hero__t')];
  const walk = el => {
    const out = [], w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) out.push(w.currentNode);
    return out;
  };
  const nodes = layers.map(walk);
  if (!nodes.length || !nodes[0].length) return;

  const finals = nodes[0].map(n => n.nodeValue);
  const total = finals.reduce((a, s) => a + s.length, 0);
  const rand = () => CHARS[(Math.random() * CHARS.length) | 0];

  let timer = null;

  function render(resolved) {
    let seen = 0;
    const text = finals.map(s =>
      [...s].map(ch => {
        const i = seen++;
        if (ch === ' ' || i < resolved) return ch;
        return rand();
      }).join('')
    );
    nodes.forEach(list => list.forEach((n, i) => { n.nodeValue = text[i]; }));
  }

  function run() {
    clearInterval(timer);
    const t0 = performance.now() + START_DELAY;
    timer = setInterval(() => {
      const resolved = Math.floor((performance.now() - t0) / SPEED);
      if (resolved >= total) {
        clearInterval(timer);
        nodes.forEach(list => list.forEach((n, i) => { n.nodeValue = finals[i]; }));
        return;
      }
      render(Math.max(0, resolved));
    }, TICK);
  }

  title.addEventListener('mouseenter', run);
  run();
})();