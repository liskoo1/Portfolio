/* ========================================
   LUIS REQUENA PORTFOLIO — CINEMATIC JS
   Scroll reveal, nav effects, video modal,
   mobile menu, parallax
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ─── SCROLL REVEAL ────────────────────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-scale');
  
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
  let lastScroll = 0;

  const handleNavScroll = () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Initial check


  // ─── MOBILE MENU ──────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
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


  // ─── SMOOTH SCROLL FOR NAV LINKS ──────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
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

  // Open modal on project video link click
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

  // Close modal
  const closeVideoModal = () => {
    if (videoModal && videoIframe) {
      videoModal.classList.remove('active');
      document.body.style.overflow = '';
      // Delay iframe src clearing for smooth transition
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
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  // Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal?.classList.contains('active')) {
      closeVideoModal();
    }
  });


  // ─── HERO PARALLAX ────────────────────────────
  const heroContent = document.querySelector('.hero__content');
  
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;
      
      if (scrolled < heroHeight) {
        const translateY = scrolled * 0.3;
        const opacity = 1 - (scrolled / heroHeight) * 1.2;
        heroContent.style.transform = `translateY(${translateY}px)`;
        heroContent.style.opacity = Math.max(0, opacity);
      }
    }, { passive: true });
  }


  // ─── ACTIVE NAV LINK HIGHLIGHT ────────────────
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


  // ─── STAGGER SKILL CARDS ON MOBILE ────────────
  if (window.innerWidth < 768) {
    document.querySelectorAll('.skill-card').forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.1}s`;
    });
  }

});
