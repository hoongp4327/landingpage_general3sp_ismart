/* iSMART Online Hub – main.js (không phụ thuộc thư viện) */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var body = doc.body;
  var PHONE = '0967417895';

  window.dataLayer = window.dataLayer || [];
  root.classList.add('js-panels'); // bật chế độ panel ngang (CSS chỉ áp dụng khi JS chạy)

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function reducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---------- Lớp đang được gợi ý qua hash #lop-N ---------- */
  function currentGrade() {
    var m = /^#lop-([1-9])$/.exec(window.location.hash || '');
    return m ? parseInt(m[1], 10) : null;
  }

  /* ---------- 1. Header: nền mờ khi cuộn ---------- */
  var header = $('#site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.pageYOffset > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Menu hamburger ---------- */
  var toggle = $('#menu-toggle');
  var nav = $('#site-nav');
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    }
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); toggle.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1100) setMenu(false); });
  }

  /* ---------- 3. Gợi ý chương trình theo lớp ---------- */
  var cards = $$('.prog-card[data-grade-from][data-grade-to]');
  var banner = $('#grade-banner');
  var bannerText = $('#grade-banner-text');
  var section = $('#chuong-trinh');

  /* Panel chương trình: 1 panel mở, rê chuột / focus / bấm để đổi */
  function setActive(card) {
    if (!card || card.classList.contains('is-active')) return;
    cards.forEach(function (c) { c.classList.toggle('is-active', c === card); });
  }
  cards.forEach(function (card) {
    card.addEventListener('mouseenter', function () { setActive(card); });
    card.addEventListener('focusin', function () { setActive(card); });
    card.addEventListener('click', function () { setActive(card); });
  });

  /* Bản đồ tuyến ở hero */
  var map = $('#route-map');
  var lines = $$('.mline', map || doc);
  var guides = $$('.guides line', map || doc);
  var gbtns = $$('.gbtn', map || doc);
  var scrollDelay = 0;

  function paintMap(grade) {
    if (!map) return;
    map.classList.toggle('has-grade', grade !== null);
    lines.forEach(function (ln) {
      var from = parseInt(ln.getAttribute('data-from'), 10);
      var to = parseInt(ln.getAttribute('data-to'), 10);
      var match = grade !== null && grade >= from && grade <= to;
      ln.classList.toggle('is-match', match);
      $$('.mline__st circle', ln).forEach(function (c, i) {
        c.classList.toggle('is-here', match && i === grade - from);
      });
    });
    guides.forEach(function (g) {
      g.classList.toggle('is-on', grade !== null && parseInt(g.getAttribute('data-g'), 10) === grade);
    });
  }
  function markButtons() {
    var grade = currentGrade();
    gbtns.forEach(function (b) {
      var on = parseInt(b.getAttribute('data-grade'), 10) === grade;
      b.classList.toggle('is-on', on);
      if (on) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
    });
  }
  function clearGrade() {
    if (window.history && history.replaceState) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    } else {
      window.location.hash = '';
    }
    applyGrade(false);
    updateProgramLinks();
  }
  gbtns.forEach(function (b) {
    var g = parseInt(b.getAttribute('data-grade'), 10);
    b.addEventListener('mouseenter', function () { paintMap(g); });
    b.addEventListener('focus', function () { paintMap(g); });
    b.addEventListener('mouseleave', function () { paintMap(currentGrade()); });
    b.addEventListener('blur', function () { paintMap(currentGrade()); });
    b.addEventListener('click', function (e) {
      if (currentGrade() === g) { e.preventDefault(); clearGrade(); return; } // bấm lại để bỏ chọn
      scrollDelay = 750; // cho ba mẹ kịp thấy các tuyến sáng lên rồi mới cuộn
    });
  });
  lines.forEach(function (ln) {
    ln.addEventListener('click', function () {
      setActive(doc.getElementById('card-' + ln.getAttribute('data-line')));
    });
  });

  /* Quầng sáng đi theo con trỏ ở hero */
  var heroEl = $('#hero');
  var glow = $('.hero__glow');
  if (heroEl && glow && !reducedMotion()) {
    heroEl.addEventListener('pointermove', function (e) {
      var r = heroEl.getBoundingClientRect();
      glow.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      glow.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }

  function applyGrade(scroll) {
    var grade = currentGrade();
    var firstMatch = null;
    paintMap(grade);
    markButtons();
    cards.forEach(function (card) {
      var from = parseInt(card.getAttribute('data-grade-from'), 10);
      var to = parseInt(card.getAttribute('data-grade-to'), 10);
      var match = grade !== null && grade >= from && grade <= to;
      var badge = $('.prog-card__match', card);
      card.classList.toggle('is-match', match);
      if (match && !firstMatch) firstMatch = card;
      card.classList.toggle('is-dim', grade !== null && !match);
      if (badge) {
        badge.hidden = !match;
        badge.textContent = match ? 'Phù hợp lớp ' + grade : '';
      }
    });
    if (banner) {
      banner.hidden = grade === null;
      if (grade !== null && bannerText) bannerText.textContent = 'Gợi ý chương trình cho con lớp ' + grade;
    }
    if (firstMatch) setActive(firstMatch);
    if (grade !== null && scroll && section) {
      var delay = scrollDelay;
      scrollDelay = 0;
      window.setTimeout(function () {
        section.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
      }, delay);
    }
  }

  var clearBtn = $('#grade-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearGrade);
  }

  /* ---------- 4. UTM cho link sang 4 website chương trình ---------- */
  var programLinks = $$('a[data-track="program_click"][data-program]');
  programLinks.forEach(function (a) { a.setAttribute('data-base-href', a.getAttribute('href')); });

  function pageParams() {
    var out = {};
    var q = window.location.search.replace(/^\?/, '');
    if (!q) return out;
    q.split('&').forEach(function (pair) {
      if (!pair) return;
      var i = pair.indexOf('=');
      var k = i < 0 ? pair : pair.slice(0, i);
      var v = i < 0 ? '' : pair.slice(i + 1);
      try {
        out[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, ' '));
      } catch (err) { /* bỏ qua tham số lỗi mã hóa */ }
    });
    return out;
  }

  function updateProgramLinks() {
    var page = pageParams();
    var grade = currentGrade();
    programLinks.forEach(function (a) {
      var params = {
        utm_source: page.utm_source || 'online-hub',
        utm_medium: page.utm_medium || 'landing',
        utm_campaign: page.utm_campaign || '4-chuong-trinh',
        utm_content: a.getAttribute('data-program')
      };
      if (grade !== null) params.utm_term = 'lop-' + grade;
      else if (page.utm_term) params.utm_term = page.utm_term;
      if (page.utm_id) params.utm_id = page.utm_id;

      var base = a.getAttribute('data-base-href');
      var qs = Object.keys(params).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
      }).join('&');
      a.setAttribute('href', base + (base.indexOf('?') < 0 ? '?' : '&') + qs);
    });
  }

  /* ---------- 5. Tracking: 1 hàm lắng nghe chung theo data-track ---------- */
  doc.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-track]') : null;
    if (!el) return;
    var name = el.getAttribute('data-track');
    var payload = { event: name };
    if (name === 'program_click') {
      var g = currentGrade();
      payload.program = el.getAttribute('data-program');
      payload.grade = g !== null ? 'lop-' + g : null;
    } else if (name === 'zalo_click' || name === 'hotline_click') {
      payload.position = el.getAttribute('data-position');
    }
    window.dataLayer.push(payload);
  });

  /* ---------- 6. Sao chép số điện thoại ---------- */
  function legacyCopy(text) {
    var ta = doc.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.opacity = '0';
    body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    var ok = false;
    try { ok = doc.execCommand('copy'); } catch (err) { ok = false; }
    body.removeChild(ta);
    return ok;
  }

  var copyBtn = $('#copy-phone');
  if (copyBtn) {
    var label = $('.copy-label', copyBtn);
    var original = label ? label.textContent : '';
    var timer = null;
    var showDone = function () {
      if (!label) return;
      label.textContent = 'Đã sao chép ✓';
      clearTimeout(timer);
      timer = setTimeout(function () { label.textContent = original; }, 2000);
    };
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.getAttribute('data-copy') || PHONE;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showDone, function () {
          if (legacyCopy(text)) showDone();
        });
      } else if (legacyCopy(text)) {
        showDone();
      }
    });
  }

  /* ---------- 7. Thanh liên hệ nổi (mobile) – hiện sau khi cuộn qua hero ---------- */
  var sticky = $('#sticky-bar');
  var hero = $('#hero');
  function setSticky(show) {
    if (!sticky) return;
    sticky.classList.toggle('is-visible', show);
    sticky.setAttribute('aria-hidden', show ? 'false' : 'true');
    $$('a', sticky).forEach(function (a) {
      if (show) a.removeAttribute('tabindex'); else a.setAttribute('tabindex', '-1');
    });
  }
  if (sticky && hero) {
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        setSticky(!entries[0].isIntersecting);
      }, { threshold: 0 }).observe(hero);
    } else {
      window.addEventListener('scroll', function () {
        setSticky(window.pageYOffset > hero.offsetHeight);
      }, { passive: true });
    }
  }

  /* ---------- 8. Fade-up khi cuộn ---------- */
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && root.classList.contains('js-reveal') && !reducedMotion()) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
    window.__revealReady = true;
  } else {
    root.classList.remove('js-reveal');
  }

  /* ---------- Khởi tạo ---------- */
  updateProgramLinks();
  applyGrade(false);
  if (currentGrade() !== null) {
    // Chờ layout ổn định rồi mới cuộn tới phần chương trình
    // (setTimeout thay vì requestAnimationFrame để vẫn chạy khi tab mở ở nền)
    window.setTimeout(function () { applyGrade(true); }, 80);
  }
  window.addEventListener('hashchange', function () {
    applyGrade(true);
    updateProgramLinks();
  });
})();
