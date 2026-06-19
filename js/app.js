/* ===================================================================
   AJT Sistemas e Serviços — client logic
   Hash routing, active-nav state, year stamp and contact form.
   Ported from the Claude Design component's DCLogic class.
   =================================================================== */
(function () {
  'use strict';

  var PAGES = ['inicio', 'servicos', 'produtos', 'equipe', 'contato'];

  function currentPage() {
    var h = (location.hash || '').replace('#', '');
    return PAGES.indexOf(h) !== -1 ? h : 'inicio';
  }

  function render() {
    var page = currentPage();

    PAGES.forEach(function (p) {
      var el = document.getElementById('page-' + p);
      if (el) el.classList.toggle('active', p === page);
    });

    document.querySelectorAll('.nav-link[data-go]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-go') === page);
    });

    try { window.scrollTo(0, 0); } catch (e) {}
  }

  // Navigation: clicking the same page scrolls to top, otherwise updates the hash.
  function go(p) {
    var cur = (location.hash || '').replace('#', '');
    if (cur === p) {
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
    } else {
      location.hash = p;
    }
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-go]');
    if (!trigger) return;
    e.preventDefault();
    go(trigger.getAttribute('data-go'));
  });

  window.addEventListener('hashchange', render);

  // Contact form -> opens the user's mail client, then shows confirmation.
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = (form.nome && form.nome.value) || '';
      var email = (form.email && form.email.value) || '';
      var msg = (form.mensagem && form.mensagem.value) || '';
      var body = 'Nome: ' + nome + '\r\nE-mail: ' + email + '\r\n\r\n' + msg;
      var href = 'mailto:ajtsistemaseservicos@gmail.com'
        + '?subject=' + encodeURIComponent('Contato pelo site — AJT')
        + '&body=' + encodeURIComponent(body);
      try { window.location.href = href; } catch (err) {}

      var sent = document.getElementById('contact-sent');
      if (sent) sent.hidden = false;
      form.hidden = true;
    });
  }

  // Footer year.
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  render();
})();
