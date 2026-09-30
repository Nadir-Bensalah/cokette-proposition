/* Les comportements de la page. Appelés une fois le contenu déchiffré et
   injecté, jamais avant : il n'existe rien à animer sur la porte. */
window.demarrerPage = function () {
  'use strict';
  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Barre haute ---------- */
  var topbar = document.getElementById('topbar');
  if (topbar) {
    var onScroll = function () { topbar.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Apparition au défilement ---------- */
  var blocs = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    blocs.forEach(function (b) { b.classList.add('is-in'); });
  } else {
    var vu = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        vu.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    blocs.forEach(function (b) {
      // Ce qui est déjà à l'écran à l'ouverture ne doit pas attendre.
      var r = b.getBoundingClientRect();
      if (r.top < window.innerHeight) b.classList.add('is-in');
      else vu.observe(b);
    });
  }

  /* À l'impression, tout est visible. */
  window.addEventListener('beforeprint', function () {
    blocs.forEach(function (b) { b.classList.add('is-in'); });
  });
};
