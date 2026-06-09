const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');

if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupCarousel(carousel) {
  const slides = [...carousel.querySelectorAll('.slide')];
  const prev = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  const progress = carousel.querySelector('[data-carousel-progress]');
  let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains('active')));
  let timer = null;
  let progressTimer = null;
  let startedAt = 0;
  const interval = 6200;

  function setProgress(value) {
    if (progress) progress.style.width = `${Math.max(0, Math.min(100, value))}%`;
  }

  function pauseVideos() {
    slides.forEach((slide) => {
      slide.querySelectorAll('video').forEach((video) => {
        if (!video.paused) video.pause();
      });
    });
  }

  function getActiveVideo() {
    return slides[index]?.querySelector('video') || null;
  }

  function playActiveVideo() {
    const video = getActiveVideo();
    if (video && video.muted) {
      video.play().catch(() => {});
    }
  }

  function render() {
    pauseVideos();
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === index);
    });
    setProgress(0);
    startedAt = performance.now();
    playActiveVideo();
  }

  function go(direction) {
    index = (index + direction + slides.length) % slides.length;
    render();
    restart();
  }

  function animateProgress(now) {
    if (!startedAt) startedAt = now;
    setProgress(((now - startedAt) / interval) * 100);
    progressTimer = requestAnimationFrame(animateProgress);
  }

  function start() {
    if (prefersReducedMotion || slides.length <= 1) return;
    stop();

    // Video-Slides sollen nicht nach wenigen Sekunden automatisch wegspringen.
    // Der Nutzer kann mit den Pfeilen manuell zum nächsten Slide wechseln.
    if (getActiveVideo()) {
      setProgress(100);
      return;
    }

    startedAt = performance.now();
    timer = window.setInterval(() => go(1), interval);
    progressTimer = requestAnimationFrame(animateProgress);
  }

  function stop() {
    if (timer) window.clearInterval(timer);
    if (progressTimer) window.cancelAnimationFrame(progressTimer);
    timer = null;
    progressTimer = null;
  }

  function restart() {
    stop();
    start();
  }

  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));

  slides.forEach((slide) => {
    slide.querySelectorAll('video').forEach((video) => {
      video.addEventListener('play', stop);
      video.addEventListener('pause', start);
      video.addEventListener('ended', start);
    });
  });

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  render();
  start();
}

document.querySelectorAll('[data-carousel]').forEach(setupCarousel);

function setupTilt(card) {
  if (prefersReducedMotion) return;

  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 5;
    const rotateX = ((y / rect.height) - 0.5) * -5;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
}

document.querySelectorAll('.tilt-card').forEach(setupTilt);

function setupTypewriter(element) {
  const target = element.querySelector('[data-typewriter-text]');
  if (!target) return;

  let phrases = [];
  try {
    phrases = JSON.parse(element.dataset.phrases || '[]');
  } catch (error) {
    phrases = (element.dataset.phrases || '').split('|').map((item) => item.trim()).filter(Boolean);
  }
  if (!phrases.length) return;

  if (prefersReducedMotion) {
    target.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let waiting = false;

  const write = () => {
    const current = phrases[phraseIndex];
    target.textContent = current.slice(0, charIndex);

    if (waiting) return;

    let delay = deleting ? 34 : 58;

    if (!deleting && charIndex < current.length) {
      charIndex += 1;
    } else if (!deleting && charIndex === current.length) {
      waiting = true;
      delay = 1500;
      window.setTimeout(() => {
        deleting = true;
        waiting = false;
        write();
      }, delay);
      return;
    } else if (deleting && charIndex > 0) {
      charIndex -= 1;
    } else {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 450;
    }

    window.setTimeout(write, delay);
  };

  window.setTimeout(write, 450);
}

document.querySelectorAll('[data-typewriter]').forEach(setupTypewriter);
