(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {

    // 1. Mobile hamburger menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    function toggleMobileNav() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }

    if (hamburger && overlay) {
      hamburger.addEventListener('click', toggleMobileNav);
      overlay.addEventListener('click', toggleMobileNav);
      mobileNavLinks.forEach(link => link.addEventListener('click', toggleMobileNav));
    }

    // 2. Scroll-spy: highlight nav links when sections enter viewport
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav .nav-links a');

    if (navLinks.length > 0 && sections.length > 0) {
      const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
              link.classList.toggle('active-link', link.getAttribute('href') === '#' + id);
            });
          }
        });
      }, { threshold: 0.2 });
      sections.forEach(section => spyObserver.observe(section));
    }

    // 3. Navbar shadow & back-to-top toggle on scroll (debounced)
    const nav = document.querySelector('nav');
    const backToTop = document.getElementById('back-to-top');
    let scrollTimeout;

    function handleScroll() {
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 50);
      }
      if (backToTop) {
        backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
      }
    }

    window.addEventListener('scroll', function() {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(handleScroll, 15);
    });

    // 4. Back-to-top button behavior
    if (backToTop) {
      backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 5. Continuous gradient rotation in hero
    const hero = document.getElementById('hero');
    if (hero) {
      let angle = 0;
      const speed = 0.1;  // degrees per frame; tweak as desired
      const stops = `
        var(--primary-orange) 0%,
        var(--primary-orange) 20%,
        rgba(215,118,65,0.8) 35%,
        rgba(46,95,127,0.8) 65%,
        var(--primary-blue) 80%,
        var(--primary-blue) 100%`;
      (function rotateGradient() {
        angle = (angle + speed) % 360;
        hero.style.backgroundImage = `linear-gradient(${angle}deg,${stops})`;
        requestAnimationFrame(rotateGradient);
      })();
    }

    // 6. Simple image carousel for "About" section
    const carouselImages = document.querySelectorAll('.carousel-image');
    if (carouselImages.length > 1) {
      let idx = 0;
      setInterval(() => {
        carouselImages[idx].classList.remove('active');
        idx = (idx + 1) % carouselImages.length;
        carouselImages[idx].classList.add('active');
      }, 5000);
    }

    // 7. Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
          try {
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              const headerOffset = 80; // Account for fixed header
              const elementPosition = target.offsetTop;
              const offsetPosition = elementPosition - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          } catch (error) {
            // Do not hinder navigation in case of invalid selector
            console.warn('Could not scroll to element with invalid selector: ' + href);
          }
        }
      });
    });

    // 8. Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
      // ESC key closes mobile menu
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        toggleMobileNav();
      }

      // Enter or Space on back-to-top button
      if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === backToTop) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // 9. Add focus management for accessibility
    if (mobileNav) {
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      mobileNav.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
          const focusableContent = mobileNav.querySelectorAll(focusableElements);
          if (focusableContent.length === 0) return;
          const firstFocusableElement = focusableContent[0];
          const lastFocusableElement = focusableContent[focusableContent.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus();
              e.preventDefault();
            }
          }
        }
      });
    }

    // 10. Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }

  });

  // Handle window resize events
  window.addEventListener('resize', function() {
    // Close mobile menu on desktop
    if (window.innerWidth > 768) {
      const mobileNav = document.querySelector('.mobile-nav');
      const overlay = document.querySelector('.nav-overlay');
      const hamburger = document.querySelector('.hamburger-menu');

      if (mobileNav && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

})();
