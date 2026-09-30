/* La proposition est en attente : la page ne montre que son état.
   La serrure n'apparaît qu'à l'adresse #ouvrir, pour le prestataire. */
(function () {
  'use strict';
  var montrer = function () {
    var forme = document.getElementById('porte-forme');
    if (!forme) return;
    forme.hidden = location.hash !== '#ouvrir';
    if (!forme.hidden) { var c = document.getElementById('porte-mdp'); if (c) c.focus(); }
  };
  document.addEventListener('DOMContentLoaded', montrer);
  window.addEventListener('hashchange', montrer);
})();
