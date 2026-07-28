/* ========================================
   LUIS REQUENA PORTFOLIO — CINEMATIC JS
   Branch: grok — filters, reveals, modal
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ─── YEAR ─────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());


  // ─── SCROLL REVEAL ────────────────────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ─── NAVBAR SCROLL EFFECT ─────────────────────
  const nav = document.getElementById('nav');

  const handleNavScroll = () => {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  // ─── MOBILE MENU ──────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') &&
          !navLinks.contains(e.target) &&
          !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }


  // ─── SMOOTH SCROLL ────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });


  // ─── VIDEO MODAL ──────────────────────────────
  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');
  const videoModalClose = document.getElementById('videoModalClose');

  document.querySelectorAll('[data-video]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const videoUrl = link.getAttribute('data-video');
      if (videoUrl && videoModal && videoIframe) {
        videoIframe.src = videoUrl;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeVideoModal = () => {
    if (videoModal && videoIframe) {
      videoModal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        videoIframe.src = '';
      }, 400);
    }
  };

  if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal?.classList.contains('active')) {
      closeVideoModal();
    }
  });


  // ─── HERO PARALLAX ────────────────────────────
  const heroContent = document.querySelector('.hero__content');
  const heroPhoto = document.querySelector('.hero__photo');

  if (heroContent || heroPhoto) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;

      if (scrolled < heroHeight) {
        if (heroContent) {
          const translateY = scrolled * 0.25;
          const opacity = 1 - (scrolled / heroHeight) * 1.15;
          heroContent.style.transform = `translateY(${translateY}px)`;
          heroContent.style.opacity = String(Math.max(0, opacity));
        }
        if (heroPhoto) {
          heroPhoto.style.transform = `scale(1.05) translateY(${scrolled * 0.12}px)`;
        }
      }
    }, { passive: true });
  }


  // ─── ACTIVE NAV LINK ──────────────────────────
  const sections = document.querySelectorAll('section[id]');

  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav__link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '-80px 0px -40% 0px'
  });

  sections.forEach(section => activeLinkObserver.observe(section));


  // ─── PROJECT FILTERS ──────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const toggleExtraBtn = document.getElementById('toggleExtraProjects');
  const moreWrap = document.querySelector('.projects__more');
  let showingExtra = false;
  let currentFilter = 'all';

  const applyProjectVisibility = () => {
    projectCards.forEach(card => {
      const stack = (card.getAttribute('data-stack') || '').split(/\s+/);
      const isFeatured = card.getAttribute('data-featured') === 'true';
      const isExtra = card.classList.contains('is-extra');

      let matchesFilter = true;
      if (currentFilter === 'featured') {
        matchesFilter = isFeatured;
      } else if (currentFilter !== 'all') {
        matchesFilter = stack.includes(currentFilter);
      }

      const matchesCollapse =
        currentFilter !== 'all' && currentFilter !== 'featured'
          ? true
          : (!isExtra || showingExtra || currentFilter === 'featured');

      const visible = matchesFilter && matchesCollapse;

      card.hidden = !visible;
      card.classList.toggle('is-filtered-out', !visible);

      if (visible && !card.classList.contains('revealed')) {
        card.classList.add('revealed');
      }
    });

    if (moreWrap) {
      const extrasExist = [...projectCards].some(c => c.classList.contains('is-extra'));
      const showToggle = extrasExist && (currentFilter === 'all');
      moreWrap.classList.toggle('is-hidden', !showToggle);
    }

    if (toggleExtraBtn) {
      toggleExtraBtn.textContent = showingExtra ? 'VER MENOS' : 'VER MÁS PROYECTOS';
    }
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentFilter = btn.getAttribute('data-filter') || 'all';

      if (currentFilter !== 'all') {
        showingExtra = true;
      } else {
        showingExtra = false;
      }

      applyProjectVisibility();
    });
  });

  if (toggleExtraBtn) {
    toggleExtraBtn.addEventListener('click', () => {
      showingExtra = !showingExtra;
      applyProjectVisibility();

      if (showingExtra) {
        const firstExtra = document.querySelector('.project-card.is-extra:not([hidden])');
        firstExtra?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  applyProjectVisibility();

});
