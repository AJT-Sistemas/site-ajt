/* ===================================================================
   AJT Sistemas e Serviços — client logic
   Hash routing, active-nav state, year stamp, contact form,
   theme switcher and mobile menu toggle.
   =================================================================== */
(function () {
  'use strict';

  var PAGES = ['inicio', 'servicos', 'produtos', 'equipe', 'contato'];

  // --- HASH ROUTING ---
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

  function go(p) {
    var cur = (location.hash || '').replace('#', '');
    if (cur === p) {
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
    } else {
      location.hash = p;
    }
    // Close mobile menu if open
    closeMobileMenu();
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-go]');
    if (!trigger) return;
    e.preventDefault();
    go(trigger.getAttribute('data-go'));
  });

  window.addEventListener('hashchange', render);

  // --- MOBILE MENU ---
  var menuToggle = document.querySelector('.menu-toggle');
  var navContainer = document.querySelector('.nav-container');

  if (menuToggle && navContainer) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('open');
      navContainer.classList.toggle('open');
    });
  }

  function closeMobileMenu() {
    if (menuToggle && navContainer) {
      menuToggle.classList.remove('open');
      navContainer.classList.remove('open');
    }
  }

  // --- THEME ACCENT SWITCHER ---
  var DEFAULT_ACCENT = 'violeta';

  function applyAccent(accentName) {
    document.documentElement.setAttribute('data-accent', accentName);
    localStorage.setItem('ajt-accent', accentName);
    
    // Update active button state
    document.querySelectorAll('[data-accent-btn]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-accent-btn') === accentName);
    });
  }

  // Initialize Theme
  var savedAccent = localStorage.getItem('ajt-accent') || DEFAULT_ACCENT;
  applyAccent(savedAccent);

  // Bind Switcher Click Events
  document.querySelectorAll('[data-accent-btn]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var accent = btn.getAttribute('data-accent-btn');
      applyAccent(accent);
    });
  });

  // --- CONTACT FORM ---
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

  // --- FOOTER YEAR ---
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  render();
})();
