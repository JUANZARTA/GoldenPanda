document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // HERO CAROUSEL
  // ============================================================
  const heroImgs = document.querySelectorAll('.hero-img');
  if (heroImgs.length > 1) {
    let current = 0;
    setInterval(() => {
      heroImgs[current].classList.remove('active');
      current = (current + 1) % heroImgs.length;
      heroImgs[current].classList.add('active');
    }, 6000);
  }

  // ============================================================
  // MOBILE MENU
  // ============================================================
  const hamburger     = document.getElementById('hamburger');
  const mobileMenu    = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function toggleMenu(open) {
    hamburger?.classList.toggle('open', open);
    mobileMenu?.classList.toggle('open', open);
    mobileOverlay?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger?.addEventListener('click', () =>
    toggleMenu(!mobileMenu.classList.contains('open'))
  );
  mobileOverlay?.addEventListener('click', () => toggleMenu(false));
  document.querySelectorAll('.mobile-menu a').forEach(a =>
    a.addEventListener('click', () => toggleMenu(false))
  );

  // ============================================================
  // DARK / LIGHT MODE
  // ============================================================
  const root      = document.documentElement;
  const themeBtn  = document.getElementById('btn-theme');
  const themeIcon = document.getElementById('theme-icon');

  function applyTheme(mode) {
    root.classList.toggle('light', mode === 'light');
    themeIcon.className = mode === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('gp-theme', mode);
  }

  applyTheme(localStorage.getItem('gp-theme') || 'dark');

  themeBtn?.addEventListener('click', () =>
    applyTheme(root.classList.contains('light') ? 'dark' : 'light')
  );

  // ============================================================
  // PALETTE SWITCHER  (deep-space → warm → clean → loop)
  // ============================================================
  const palettes   = ['deep-space', 'warm', 'clean'];
  const paletteBtn = document.getElementById('btn-palette');

  function applyPalette(name) {
    root.dataset.palette = name;
    localStorage.setItem('gp-palette', name);
  }

  applyPalette(localStorage.getItem('gp-palette') || 'deep-space');

  paletteBtn?.addEventListener('click', () => {
    const idx = palettes.indexOf(root.dataset.palette);
    applyPalette(palettes[(idx + 1) % palettes.length]);
  });

  // ============================================================
  // MODAL — MÁS SERVICIOS
  // ============================================================
  const modalOverlay = document.getElementById('modal-overlay');
  const btnMore      = document.getElementById('btn-more-services');
  const btnClose     = document.getElementById('modal-close');

  function openModal()  {
    modalOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modalOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  btnMore?.addEventListener('click', openModal);
  btnClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });

  // ============================================================
  // PRICING TABS (main — supports data-opens-modal for extras)
  // ============================================================
  document.querySelectorAll('.pricing-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.dataset.opensModal) {
        document.getElementById(tab.dataset.opensModal)?.classList.add('open');
        document.body.style.overflow = 'hidden';
        return;
      }
      const target = tab.dataset.plans;
      document.querySelectorAll('.pricing-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.pricing-plans').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  // ============================================================
  // EXTRAS MODAL — sub-tabs + close
  // ============================================================
  const extrasOverlay = document.getElementById('modal-extras-overlay');
  const extrasClose   = document.getElementById('modal-extras-close');

  extrasClose?.addEventListener('click', () => {
    extrasOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  });

  extrasOverlay?.addEventListener('click', e => {
    if (e.target === extrasOverlay) {
      extrasOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  document.querySelectorAll('.extras-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.eplans;
      document.querySelectorAll('.extras-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.extras-plans').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  // Escape closes both modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      extrasOverlay?.classList.remove('open');
      closeModal();
      document.body.style.overflow = '';
    }
  });

  // ============================================================
  // CURRENCY TOGGLE — COP / USD
  // ============================================================
  document.querySelectorAll('.currency-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.currency-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.body.classList.toggle('show-usd', btn.dataset.currency === 'usd');
    });
  });

  // ============================================================
  // SCROLL REVEAL
  // ============================================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ============================================================
  // NAVBAR SCROLL SHADOW
  // ============================================================
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

});
