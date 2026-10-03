/* SoNSo site behaviour. No dependencies. */
(function () {
  'use strict';
  window.__sonsoReady = true; // tells the failsafe in head.html that this script loaded
  var cfg = window.SONSO || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var params = new URLSearchParams(location.search);

  /* ---------- Analytics (loads only when an ID is set in _config.yml) ---------- */
  function loadScript(src) { var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); }
  var gtagId = cfg.ga4 || cfg.googleAds;
  if (gtagId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    if (cfg.ga4) gtag('config', cfg.ga4);
    if (cfg.googleAds) gtag('config', cfg.googleAds);
    loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gtagId));
  }
  if (cfg.metaPixel) {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', cfg.metaPixel); fbq('track', 'PageView');
  }
  function track(name, data) {
    if (window.gtag) gtag('event', name, data || {});
    if (window.fbq) fbq('trackCustom', name, data || {});
  }

  /* Keep first-touch UTM values for the lead form */
  try {
    ['utm_source', 'utm_campaign'].forEach(function (k) {
      if (params.get(k)) sessionStorage.setItem(k, params.get(k));
    });
  } catch (e) { /* storage blocked */ }

  document.addEventListener('DOMContentLoaded', function () {
    /* ---------- Year ---------- */
    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    /* ---------- Header state ---------- */
    var header = $('[data-header]');
    var onScroll = function () { header && header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Current page in nav ---------- */
    var path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    $$('[data-nav-link]').forEach(function (a) {
      var target = a.getAttribute('data-nav-link');
      if (path === target || path.indexOf(target + '/') === 0) a.setAttribute('aria-current', 'page');
    });

    /* ---------- Mobile menu ---------- */
    var toggle = $('[data-menu-toggle]');
    var nav = $('[data-nav]');
    function setNav(open) {
      if (!toggle || !nav) return;
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    }
    toggle && toggle.addEventListener('click', function () { setNav(toggle.getAttribute('aria-expanded') !== 'true'); });

    /* ---------- Services menu ---------- */
    var menu = $('[data-menu]');
    var trigger = $('[data-menu-trigger]');
    function setMenu(open) {
      if (!menu || !trigger) return;
      menu.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    }
    trigger && trigger.addEventListener('click', function (e) { e.stopPropagation(); setMenu(!menu.classList.contains('is-open')); });
    document.addEventListener('click', function (e) { if (menu && !menu.contains(e.target)) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (menu && menu.classList.contains('is-open')) { setMenu(false); trigger.focus(); }
      if (nav && nav.classList.contains('is-open')) { setNav(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 960px)').addEventListener('change', function () { setNav(false); setMenu(false); });

    /* ---------- Reveal on scroll ---------- */
    var revealables = $$('[data-reveal], .journey');
    if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealables.forEach(function (el) { io.observe(el); });
    } else {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    }

    /* ---------- Stage filters (Work, Insights) ---------- */
    $$('[data-filter-group]').forEach(function (group) {
      var buttons = $$('[data-filter]', group);
      var items = $$('[data-filter-item]', group.parentNode);
      var empty = $('[data-filter-empty]', group.parentNode);
      function apply(stage) {
        var shown = 0;
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === stage)); });
        items.forEach(function (it) {
          var match = stage === 'all' || (' ' + it.getAttribute('data-filter-item') + ' ').indexOf(' ' + stage + ' ') > -1;
          it.hidden = !match; if (match) shown++;
        });
        if (empty) empty.hidden = shown > 0;
      }
      buttons.forEach(function (b) {
        b.addEventListener('click', function () {
          var stage = b.getAttribute('data-filter');
          apply(stage);
          var url = new URL(location.href);
          if (stage === 'all') url.searchParams.delete('stage'); else url.searchParams.set('stage', stage);
          history.replaceState(null, '', url);
        });
      });
      var initial = params.get('stage');
      apply(buttons.some(function (b) { return b.getAttribute('data-filter') === initial; }) ? initial : 'all');
    });

    /* ---------- Contact form ---------- */
    var form = $('[data-lead-form]');
    if (form) {
      var need = params.get('need');
      if (need) $$('input[name="stage"]', form).forEach(function (c) { if (c.value === need) c.checked = true; });

      // Visitors arriving from a service CTA (e.g. "Get a website quote") see what they're asking about.
      var needCopy = {
        build: ['You\'re asking for a website quote.', 'For example: we need a six-page site with a booking form, and enquiries should go straight into our CRM.'],
        automate: ['You\'re asking about automation and your CRM.', 'For example: leads arrive by email and WhatsApp, and someone copies them into a spreadsheet every day.'],
        grow: ['You\'re asking about ads and lead generation.', 'For example: we spend on Meta ads every month but can\'t tell which campaigns bring customers.'],
        measure: ['You\'re asking about dashboards and reporting.', 'For example: month-end reports take days, and sales and finance never agree on the numbers.']
      }[need];
      if (needCopy) {
        var note = $('[data-need-note]');
        note.textContent = needCopy[0] + ' Tell us a little about it and we\'ll come back with next steps.';
        note.hidden = false;
        $('#f-message', form).placeholder = needCopy[1];
      }

      // Record the page the visitor came from, but only if it's on this site.
      var from = location.pathname;
      try { var ref = new URL(document.referrer); if (ref.origin === location.origin) from = ref.pathname; else if (document.referrer) from = location.pathname + ' (from ' + ref.hostname + ')'; } catch (e) { /* no referrer */ }
      $('input[name="page"]', form).value = from;
      try {
        $('input[name="utm_source"]', form).value = sessionStorage.getItem('utm_source') || '';
        $('input[name="utm_campaign"]', form).value = sessionStorage.getItem('utm_campaign') || '';
      } catch (e) { /* storage blocked */ }

      var status = $('[data-form-status]', form);
      function showError(msg) { status.hidden = false; status.setAttribute('data-kind', 'error'); status.textContent = msg; }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        status.hidden = true;
        var invalid = null;
        $$('[required]', form).forEach(function (f) {
          var bad = !f.value.trim() || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
          f.setAttribute('aria-invalid', String(bad));
          var err = document.getElementById(f.id + '-error');
          if (err) err.hidden = !bad;
          if (bad && !invalid) invalid = f;
        });
        if (invalid) { invalid.focus(); return; }

        var data = new FormData(form);
        var stages = data.getAll('stage').join(', ') || 'Not specified';

        if (!cfg.endpoint) {
          // No lead endpoint configured yet. Don't rely on a mail app silently opening:
          // show an explicit last step with WhatsApp and email, both pre-filled.
          var body = 'Name: ' + data.get('name') + '\nEmail: ' + data.get('email') + '\nCompany: ' + (data.get('company') || '-') +
            '\nPhone: ' + (data.get('phone') || '-') + '\nNeeds help with: ' + stages + '\nBudget: ' + (data.get('budget') || '-') +
            '\n\n' + data.get('message');
          var handoff = $('[data-form-handoff]', form);
          $('[data-handoff-wa]', handoff).href = 'https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent('Hi SoNSo, new enquiry from the website.\n\n' + body);
          $('[data-handoff-mail]', handoff).href = 'mailto:' + cfg.email + '?subject=' + encodeURIComponent('Enquiry from ' + data.get('name')) + '&body=' + encodeURIComponent(body);
          handoff.hidden = false;
          handoff.focus();
          handoff.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
          track('generate_lead', { method: 'handoff', stage: stages });
          return;
        }

        var btn = $('button[type="submit"]', form);
        btn.disabled = true; btn.textContent = 'Sending…';
        fetch(cfg.endpoint, { method: 'POST', body: new URLSearchParams(data) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json().catch(function () { return { ok: true }; }); })
          .then(function () {
            track('generate_lead', { method: 'contact_form', stage: stages });
            form.hidden = true;
            var done = $('[data-form-success]');
            done.hidden = false; done.focus();
          })
          .catch(function () {
            btn.disabled = false; btn.textContent = 'Send message';
            showError('Your message didn\'t send. Check your connection and try again, or email us at ' + cfg.email + '.');
          });
      });
    }

    /* ---------- Booking picker ---------- */
    var picker = $('[data-book]');
    if (picker) {
      var embed = $('[data-book-embed]', picker);
      var fallback = $('[data-book-fallback]', picker);
      var calLink = $('[data-book-cal-link]', embed);
      var step2 = $('[data-book-step2]', picker);
      var placeholder = $('[data-book-placeholder]', picker);
      function choose(stage, reveal) {
        var input = $('input[value="' + stage + '"]', picker);
        if (!input) return;
        input.checked = true;
        placeholder.hidden = true;
        step2.classList.add('is-ready');
        var url = input.getAttribute('data-url');
        if (url) {
          // Link to Google's full booking page rather than embedding it: an embedded calendar can't
          // size itself, which hides the Book button and traps scrolling on phones.
          calLink.href = url.replace(/[?&]gv=true/, '');
          embed.hidden = false; fallback.hidden = true;
        } else {
          embed.hidden = true; fallback.hidden = false;
          $$('[data-book-topic]', fallback).forEach(function (el) { el.textContent = input.getAttribute('data-label'); });
          var msg = 'Hi SoNSo, I\'d like to book a free 30-minute call about ' + input.getAttribute('data-label').toLowerCase() + '.';
          $('[data-book-wa]', fallback).href = 'https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(msg);
          $('[data-book-mail]', fallback).href = 'mailto:' + cfg.email + '?subject=' + encodeURIComponent('Booking a call: ' + input.getAttribute('data-label')) + '&body=' + encodeURIComponent(msg + '\n\nTimes that suit me (with time zone):\n');
          $('[data-book-form]', fallback).href = '/contact?need=' + stage;
        }
        if (reveal) {
          // Step 2 often sits below the fold on phones: once it's filled in, bring it into view
          // so the booking buttons are the next thing the visitor sees.
          requestAnimationFrame(function () {
            var r = step2.getBoundingClientRect();
            if (r.top < 0 || r.bottom > window.innerHeight) {
              step2.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
            }
          });
        }
        track('booking_topic', { stage: stage });
      }
      $$('input[name="topic"]', picker).forEach(function (r) { r.addEventListener('change', function () { choose(r.value, true); }); });
      var pre = params.get('need');
      if (pre) choose(pre);
    }

    /* ---------- Click tracking ---------- */
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a');
      if (!a) return;
      var kind = a.getAttribute('data-track');
      if (kind) track('contact_click', { method: kind });
      else if (a.getAttribute('href') === '/book' || /^\/book\?/.test(a.getAttribute('href') || '')) track('book_call_click', { location: path });
    });
  });
})();
