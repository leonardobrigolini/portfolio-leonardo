/* ===================================
   Leonardo Brigolini | Portfolio JS
   Matrix rain + scroll animations
=================================== */

// ── Matrix Canvas ──
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]<>/\\|=+-*&%$#@!?;:.,~^';
  const fontSize = 14;
  let columns, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops   = Array(columns).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(10, 14, 26, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Alternate cyan / purple per column for depth
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
      ctx.fillStyle = i % 3 === 0 ? '#7b2fff' : '#00d4ff';
      ctx.fillText(char, i * fontSize, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
})();

// ── Scroll Fade-in ──
(function () {
  const targets = document.querySelectorAll('section, .card');
  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
})();