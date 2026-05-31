/* FutureMed Solutions — minimal interactivity
   - Sticky nav shadow on scroll
   - Mobile menu toggle
   - Language switcher dropdown
   - Scroll-reveal animations
   - Footer year
*/
(function () {
  "use strict";

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Sticky nav state */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 12) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var navToggle = document.getElementById("navToggle");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Language switcher */
  var lang = document.getElementById("lang");
  var langToggle = document.getElementById("langToggle");
  if (lang && langToggle) {
    langToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = lang.classList.toggle("open");
      langToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function () {
      lang.classList.remove("open");
      langToggle.setAttribute("aria-expanded", "false");
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            // light stagger for siblings entering together
            setTimeout(function () { el.classList.add("in"); }, (i % 4) * 80);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* Hero splash rotation — cycle through app splashes every 6s */
  var slides = document.querySelectorAll(".phone-slide");
  if (slides.length > 1) {
    var current = 0;
    setInterval(function () {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
    }, 6000);
  }
})();
