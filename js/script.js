  document.getElementById('year').textContent = new Date().getFullYear();

// Bascule thème clair / sombre
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
    try { localStorage.setItem('portfolio-theme', theme); } catch (e) {}
  };
  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('portfolio-theme') || 'dark'; } catch (e) {}
  applyTheme(savedTheme);
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }); 

  // Burger menu
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('mobile-open')));

  // Active nav link on scroll
  const sections = ['accueil','apropos','competences','projets','contact'].map(id => document.getElementById(id));
  const navA = navLinks.querySelectorAll('a');
  const onScroll = () => {
    let current = sections[0].id;
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
    navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Reveal on scroll
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Skill rings
  const ringObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const ring = e.target;
        const pct = parseInt(ring.dataset.pct, 10);
        const circumference = 251;
        const offset = circumference - (pct / 100) * circumference;
        ring.querySelector('.bar').style.strokeDashoffset = offset;
        ringObserver.unobserve(ring);
      }
    });
  }, { threshold: .4 });
  document.querySelectorAll('.ring').forEach(r => ringObserver.observe(r));

  // Typing effect in terminal
  const typedEl = document.getElementById('typed-out');
  const phrases = [
    "prêt à démarrer votre prochain projet",
    "sites web & applications mobiles",
    "du code propre, une expérience soignée"
  ];
  let pIndex = 0, cIndex = 0, deleting = false;
  function typeLoop(){
    const current = phrases[pIndex];
    if (!deleting){
      cIndex++;
      typedEl.textContent = current.slice(0, cIndex);
      if (cIndex === current.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
    } else {
      cIndex--;
      typedEl.textContent = current.slice(0, cIndex);
      if (cIndex === 0){ deleting = false; pIndex = (pIndex + 1) % phrases.length; }
    }
    setTimeout(typeLoop, deleting ? 30 : 55);
  }
  typeLoop();

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => { o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; });
      if (!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  // Contact form (démonstration, sans envoi réel)
  document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message envoyé ✓';
    setTimeout(() => { btn.textContent = original; this.reset(); }, 2200);
  });
