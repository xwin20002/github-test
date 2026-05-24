document.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll('.event, .card');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  els.forEach(e => obs.observe(e));

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
});
