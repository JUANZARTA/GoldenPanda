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

  // ============================================================
  // NAVBAR ACTIVE SECTION
  // ============================================================
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.navbar-links li a[href^="#"]');

  const secObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('nav-active',
            link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' });

  sections.forEach(s => secObserver.observe(s));

  // ============================================================
  // STATS COUNTER
  // ============================================================
  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1600;
    const steps    = 60;
    const inc      = target / steps;
    let current    = 0;
    const timer    = setInterval(() => {
      current += inc;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, duration / steps);
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
          statsObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statsObs.observe(statsSection);
  }

  // ============================================================
  // PORTFOLIO FILTERS
  // ============================================================
  document.querySelectorAll('.pf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.portfolio-card').forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('pf-hidden', !match);
        if (match) card.style.display = '';
        else setTimeout(() => { if (card.classList.contains('pf-hidden')) card.style.display = 'none'; }, 300);
      });
    });
  });

  // ============================================================
  // LIGHTBOX
  // ============================================================
  const lbOverlay = document.getElementById('lightbox-overlay');
  const lbClose   = document.getElementById('lightbox-close');
  const lbThumb   = document.getElementById('lightbox-thumb');
  const lbTitle   = document.getElementById('lightbox-title');
  const lbDesc    = document.getElementById('lightbox-desc');
  const lbTech    = document.getElementById('lightbox-tech');
  const lbLink    = document.getElementById('lightbox-link');

  function openLightbox(card) {
    const thumb = card.querySelector('.portfolio-thumb');
    const color = thumb?.style.getPropertyValue('--card-color') || '#333';
    const iconEl = thumb?.querySelector('i');
    lbThumb.style.background = color;
    lbThumb.innerHTML = iconEl ? `<i class="${iconEl.className}"></i>` : '';
    lbTitle.textContent = card.querySelector('h4')?.textContent || '';
    lbDesc.textContent  = card.querySelector('p')?.textContent || '';
    lbTech.innerHTML    = [...card.querySelectorAll('.portfolio-tech span')]
      .map(s => `<span>${s.textContent}</span>`).join('');
    const href = card.querySelector('.btn-ver')?.getAttribute('href') || '#';
    lbLink.href = href;
    lbLink.style.display = (href === '#' || !href) ? 'none' : 'inline-flex';
    lbOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.btn-ver')) return;
      openLightbox(card);
    });
  });

  lbClose?.addEventListener('click', () => {
    lbOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  });
  lbOverlay?.addEventListener('click', e => {
    if (e.target === lbOverlay) { lbOverlay.classList.remove('open'); document.body.style.overflow = ''; }
  });

  // Escape closes lightbox too (extends existing escape handler)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { lbOverlay?.classList.remove('open'); document.body.style.overflow = ''; }
  }, { capture: true });

  // ============================================================
  // TESTIMONIALS CAROUSEL
  // ============================================================
  const tTrack = document.getElementById('testimonials-track');
  const tDots  = document.getElementById('testimonials-dots');
  const tCards = tTrack?.querySelectorAll('.testimonial-card');
  let tCurrent = 0;

  if (tTrack && tCards?.length) {
    tCards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Testimonio ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => tGoTo(i));
      tDots.appendChild(dot);
    });

    function tGoTo(idx) {
      tCurrent = ((idx % tCards.length) + tCards.length) % tCards.length;
      tTrack.style.transform = `translateX(-${tCurrent * 100}%)`;
      tDots.querySelectorAll('button').forEach((d, i) =>
        d.classList.toggle('active', i === tCurrent));
    }

    document.getElementById('t-prev')?.addEventListener('click', () => tGoTo(tCurrent - 1));
    document.getElementById('t-next')?.addEventListener('click', () => tGoTo(tCurrent + 1));

    let tAuto = setInterval(() => tGoTo(tCurrent + 1), 5200);
    const tWrap = tTrack.closest('.testimonials-wrap');
    tWrap?.addEventListener('mouseenter', () => clearInterval(tAuto));
    tWrap?.addEventListener('mouseleave', () => { tAuto = setInterval(() => tGoTo(tCurrent + 1), 5200); });

    // Touch / swipe
    let touchX = 0;
    tWrap?.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    tWrap?.addEventListener('touchend',   e => {
      const diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 48) tGoTo(tCurrent + (diff > 0 ? 1 : -1));
    });
  }

  // ============================================================
  // FAQ ACCORDION
  // ============================================================
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ============================================================
  // EXIT POPUP
  // ============================================================
  const exitPopup = document.getElementById('exit-popup');
  let exitShown   = false;

  function showExitPopup() {
    if (exitShown || sessionStorage.getItem('gp-exit')) return;
    exitShown = true;
    sessionStorage.setItem('gp-exit', '1');
    exitPopup?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  document.addEventListener('mouseleave', e => { if (e.clientY < 18) showExitPopup(); });

  function closeExitPopup() {
    exitPopup?.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('exit-popup-close')?.addEventListener('click', closeExitPopup);
  document.getElementById('exit-dismiss')?.addEventListener('click', closeExitPopup);
  exitPopup?.addEventListener('click', e => { if (e.target === exitPopup) closeExitPopup(); });

  // ============================================================
  // CUSTOM CURSOR
  // ============================================================
  const cDot  = document.getElementById('cursor-dot');
  const cRing = document.getElementById('cursor-ring');

  if (cDot && cRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cDot.style.left = mx + 'px';
      cDot.style.top  = my + 'px';
    });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      cRing.style.left = rx + 'px';
      cRing.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button, .portfolio-card, .pf-btn, .stack-item').forEach(el => {
      el.addEventListener('mouseenter', () => { cDot.classList.add('is-hover');  cRing.classList.add('is-hover'); });
      el.addEventListener('mouseleave', () => { cDot.classList.remove('is-hover'); cRing.classList.remove('is-hover'); });
    });
  }

  // ============================================================
  // PAGE TRANSITION
  // ============================================================
  const pageTrans = document.getElementById('page-transition');

  document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"])').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      e.preventDefault();
      pageTrans?.classList.add('fade-out');
      setTimeout(() => { window.location.href = href; }, 260);
    });
  });

  window.addEventListener('pageshow', () => pageTrans?.classList.remove('fade-out'));

});
