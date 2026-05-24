document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal
  const els = document.querySelectorAll('.event, .card, .term-card');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  els.forEach(e => obs.observe(e));

  // Counter animation
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const dur = 1200;
      const step = target / (dur / 16);
      let cur = 0;
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { el.textContent = target.toLocaleString(); clearInterval(t); }
        else el.textContent = Math.floor(cur).toLocaleString();
      }, 16);
      cObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cObs.observe(c));

  // Theme toggle
  const saved = localStorage.getItem('ai-blog-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    updateIcon(btn);
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      if (next === 'dark') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
      localStorage.setItem('ai-blog-theme', next);
      updateIcon(btn);
    });
  }

  function updateIcon(b) {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    b.textContent = isLight ? '\u{1F319}' : '\u{2600}\u{FE0F}';
    b.title = isLight ? '切換到暗色模式' : '切換到亮色模式';
  }
});
