/* =========================================================
   Підслухано у Ліцеї 8 — невеликий JavaScript для макета.

   ВАЖЛИВО ДЛЯ DJANGO:
   Більшість того, що тут позначено "ДЕМО", у справжньому сайті
   робитиме сервер (Django). Наприклад, фільтр за темою —
   це view, який повертає лише потрібні дописи.
   Такі шматки можна буде видалити.

   Те, що позначено "ЗАЛИШИТИ", корисне і на справжньому сайті.
   ========================================================= */

const params = new URLSearchParams(location.search);

/* ---------- ЗАЛИШИТИ: перемикач світлої/темної теми ---------- */
document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('pl8-theme', next); } catch (e) {}
  });
});

/* ---------- ЗАЛИШИТИ: спливаюче повідомлення (toast) ---------- */
function toast(text) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = '✓ ' + text;
  el.classList.add('is-on');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('is-on'), 2600);
}

/* ДЕМО: повідомлення після відправки форм (?msg=...).
   У Django замість цього використовують messages framework:
   messages.success(request, "Допис надіслано на модерацію") */
const MESSAGES = {
  welcome: 'Вітаємо в «Підслухано»!',
  moderation: 'Надіслано на модерацію. Зазвичай до 15 хв',
  reply: 'Відповідь додано',
  report: 'Дякуємо! Модератори перевірять допис',
  profile: 'Профіль оновлено',
  read: 'Усі сповіщення прочитано'
};
if (MESSAGES[params.get('msg')]) toast(MESSAGES[params.get('msg')]);

/* ЗАЛИШИТИ: якщо Django вже показав повідомлення (клас is-on), ховаємо його через 2.6 с */
const serverToast = document.querySelector('#toast.is-on');
if (serverToast) setTimeout(() => serverToast.classList.remove('is-on'), 2600);

/* ---------- ЗАЛИШИТИ: закривати меню "⋯", якщо клікнули деінде ---------- */
document.addEventListener('click', (e) => {
  document.querySelectorAll('details.dropdown[open]').forEach((d) => {
    if (!d.contains(e.target)) d.removeAttribute('open');
  });
});

/* ---------- ЗАЛИШИТИ: кнопка "Назад" ---------- */
document.querySelectorAll('[data-back]').forEach((a) => {
  a.addEventListener('click', (e) => {
    if (history.length > 1) { e.preventDefault(); history.back(); }
  });
});

/* ---------- ЗАЛИШИТИ: скопіювати посилання ---------- */
document.querySelectorAll('[data-share]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const url = location.href.split('templates/')[0] + 'templates/post_detail.html';
    try { navigator.clipboard.writeText(url); } catch (e) {}
    btn.closest('details')?.removeAttribute('open');
    toast('Посилання скопійовано');
  });
});

/* ---------- ДЕМО: лайк і репост ----------
   У Django це буде маленька POST-форма або fetch() до /post/<id>/like/,
   а кількість лайків рахуватиме сервер. */
document.querySelectorAll('.act--like, .act--repost').forEach((btn) => {
  btn.addEventListener('click', () => {
    const on = btn.classList.toggle('is-on');
    const span = btn.querySelector('span');
    const n = (parseInt(span.textContent, 10) || 0) + (on ? 1 : -1);
    span.textContent = n || '';
  });
});

/* ---------- ДЕМО: підписка ---------- */
document.querySelectorAll('[data-follow]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const following = btn.classList.toggle('btn--ghost');
    btn.textContent = following ? 'Ви підписані' : 'Підписатися';
  });
});

/* ---------- ДЕМО: голосування в опитуванні ----------
   У Django голос зберігається в моделі Vote, а відсотки рахує view. */
document.querySelectorAll('[data-poll]').forEach((poll) => {
  poll.addEventListener('click', (e) => {
    const chosen = e.target.closest('.poll__opt');
    if (!chosen) return;
    const options = [...poll.querySelectorAll('.poll__opt')];
    chosen.dataset.votes = +chosen.dataset.votes + 1;
    const total = options.reduce((sum, o) => sum + +o.dataset.votes, 0);
    options.forEach((o) => {
      const pct = Math.round(o.dataset.votes / total * 100);
      const row = document.createElement('div');
      row.className = 'poll__res' + (o === chosen ? ' is-mine' : '');
      row.innerHTML = `<div class="poll__bar" style="width:${pct}%"></div>
        <span class="poll__label">${o.textContent}${o === chosen ? ' ✓' : ''}</span>
        <span class="poll__pct">${pct}%</span>`;
      o.replaceWith(row);
    });
    poll.querySelector('.poll__total').textContent = total + ' голосів';
  });
});

/* ---------- ДЕМО: вкладки (?tab=...) ----------
   Елементи з data-tabs="posts" (або в стрічці data-filter="all anon")
   показуються лише на перелічених вкладках.
   У Django фільтрацію робить view, а в шаблоні лише підсвічується активна вкладка:
   class="tabs__btn {% if active_tab == 'anon' %}is-active{% endif %}" */
const tabsNav = document.querySelector('[data-tabs-nav]');
if (tabsNav) {
  const tab = params.get('tab') || tabsNav.dataset.default;
  tabsNav.querySelectorAll('[data-tab]').forEach((a) => {
    a.classList.toggle('is-active', a.dataset.tab === tab);
    // зберігаємо вибрану тему, коли перемикаємо вкладку
    if (params.get('topic')) a.href += '&topic=' + encodeURIComponent(params.get('topic'));
  });
  document.querySelectorAll(tabsNav.dataset.target).forEach((el) => {
    const list = el.dataset.tabs || el.dataset.filter;
    el.hidden = !list.split(' ').includes(tab);
  });
}

/* ---------- ДЕМО: фільтр за темою (?topic=...) ---------- */
const chips = document.querySelectorAll('.chips [data-tag]');
if (chips.length) {
  const tag = params.get('topic') || '';
  chips.forEach((c) => {
    c.classList.toggle('is-active', c.dataset.tag === tag);
    if (params.get('tab')) c.href += (c.href.includes('?') ? '&' : '?') + 'tab=' + params.get('tab');
  });
  if (tag) {
    document.querySelectorAll('.feed .post').forEach((p) => {
      if (p.dataset.tag !== tag) p.hidden = true;
    });
  }
  const anyVisible = [...document.querySelectorAll('.feed .post')].some((p) => !p.hidden);
  const empty = document.querySelector('[data-empty]');
  if (empty) empty.hidden = anyVisible;
}

/* ---------- ДЕМО: пошук (?q=...) ---------- */
const results = document.querySelector('[data-search-results]');
if (results) {
  const q = (params.get('q') || '').trim().toLowerCase();
  const input = document.querySelector('input[name="q"]');
  if (q) {
    input.value = params.get('q');
    results.hidden = false;
    document.querySelector('[data-search-default]').hidden = true;
    document.querySelector('[data-search-q]').textContent = params.get('q');
    let found = 0;
    results.querySelectorAll('.post').forEach((p) => {
      const match = p.textContent.toLowerCase().includes(q.replace('#', ''));
      p.hidden = !match;
      if (match) found++;
    });
    results.querySelector('[data-empty]').hidden = found > 0;
  }
}

/* ---------- ЗАЛИШИТИ: лічильник символів і "Анонім" у формі нового допису ---------- */
const textarea = document.querySelector('[data-counter]');
if (textarea) {
  const count = document.querySelector('[data-count]');
  textarea.addEventListener('input', () => { count.textContent = textarea.value.length; });
}
const anonToggle = document.querySelector('[data-anon-toggle]');
if (anonToggle) {
  const name = document.querySelector('[data-compose-name]');
  const ava = name.closest('.compose__row').querySelector('.avatar');
  const anonHTML = ava.outerHTML;
  const meHTML = '<div class="avatar" style="--av: #ff7a59">ОК</div>';
  anonToggle.addEventListener('change', () => {
    name.textContent = anonToggle.checked ? 'Анонім' : 'Олена Коваль';
    name.closest('.compose__row').querySelector('.avatar').outerHTML = anonToggle.checked ? anonHTML : meHTML;
  });
}
