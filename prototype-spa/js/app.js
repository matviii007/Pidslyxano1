/* =========================================================
   Підслухано у Ліцеї 8 — клікабельний макет
   Простий роутер на hash (#/feed, #/post/p2 ...) + рендер
   HTML-рядками. Усі дії змінюють лише дані в пам'яті.
   ========================================================= */

/* ---------- Іконки ---------- */
const ICONS = {
  home:   '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  plus:   '<path d="M12 5v14M5 12h14"/>',
  heart:  '<path d="M12 20.5s-7.5-4.6-7.5-10.3A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.6c0 5.7-7.5 10.3-7.5 10.3z"/>',
  bell:   '<path d="M6 9a6 6 0 0 1 12 0c0 6.5 2.5 8 2.5 8h-17S6 15.5 6 9"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  user:   '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  comment:'<path d="M20.5 12a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1-4.4A8.5 8.5 0 1 1 20.5 12z"/>',
  repost: '<path d="m17 2.5 3.5 3.5L17 9.5"/><path d="M3.5 11V9.5A3.5 3.5 0 0 1 7 6h13.5"/><path d="M7 21.5 3.5 18 7 14.5"/><path d="M20.5 13v1.5A3.5 3.5 0 0 1 17 18H3.5"/>',
  share:  '<path d="M21.5 2.5 10.5 13.5"/><path d="M21.5 2.5 15 21.5l-4.5-8-8-4.5z"/>',
  more:   '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
  back:   '<path d="m15 18-6-6 6-6"/>',
  sun:    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon:   '<path d="M20.5 14A8.5 8.5 0 1 1 10 3.5a6.5 6.5 0 0 0 10.5 10.5z"/>',
  flag:   '<path d="M5 21.5V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
  hide:   '<path d="m3 3 18 18"/><path d="M10.6 5.1A10 10 0 0 1 12 5c6 0 9.5 7 9.5 7a17 17 0 0 1-3 3.9M6.6 6.6C3.9 8.4 2.5 12 2.5 12S6 19 12 19a9.5 9.5 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  link:   '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  book:   '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  check:  '<path d="M20 6 9 17l-5-5"/>',
  close:  '<path d="M18 6 6 18M6 6l12 12"/>',
  pin:    '<path d="M12 17v5"/><path d="M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  at:     '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',
  poll:   '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  google: '<path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" fill="#4285F4" stroke="none"/><path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" fill="#34A853" stroke="none"/><path d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2z" fill="#FBBC05" stroke="none"/><path d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10C7.2 7.7 9.4 6 12 6z" fill="#EA4335" stroke="none"/>'
};
const icon = (name, cls = '') =>
  `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

const LOGO = `
<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true">
  <path d="M20 3C10.6 3 3 9.9 3 18.4c0 4.7 2.3 8.9 6 11.7L7.6 37l7.3-4.2c1.6.4 3.3.6 5.1.6 9.4 0 17-6.9 17-15S29.4 3 20 3z" fill="var(--accent)"/>
  <text x="20" y="25.5" text-anchor="middle" font-family="Unbounded, sans-serif" font-weight="800" font-size="15" fill="#fff">8</text>
</svg>`;

/* ---------- Стан ---------- */
const state = {
  loggedIn: false,
  feedTab: 'all',        // all | anon | following
  feedTag: null,         // ключ тегу або null
  profileTab: 'posts',   // posts | replies | liked
  notifTab: 'all',       // all | mentions
  hidden: new Set(),     // приховані дописи
  compose: { anon: true, tag: 'питання', poll: false }
};
const me = USERS.me;

/* ---------- Утиліти ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + ' тис.' : String(n);
const findPost = (id) => POSTS.find(p => p.id === id);
const byHandle = (h) => Object.values(USERS).find(u => u.handle === h);

function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.innerHTML = `${icon('check')}<span>${esc(msg)}</span>`;
  t.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('is-on'), 2400);
}

function avatar(user, anon, size = '') {
  if (anon || !user) {
    return `<div class="avatar avatar--anon ${size}" title="Анонім">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 9.2c3.2-1.6 6.3-1.6 9.5 0 3.2-1.6 6.3-1.6 9.5 0v2.3c0 4-2.8 6-5.2 6-2.1 0-3.1-2-4.3-2s-2.2 2-4.3 2c-2.4 0-5.2-2-5.2-6z" fill="currentColor"/><ellipse cx="7.6" cy="11.6" rx="2" ry="1.3" fill="var(--anon-bg)"/><ellipse cx="16.4" cy="11.6" rx="2" ry="1.3" fill="var(--anon-bg)"/></svg>
    </div>`;
  }
  const initials = user.name.split(' ').map(w => w[0]).slice(0, 2).join('');
  return `<div class="avatar ${size}" style="--av:${user.color}">${esc(initials)}</div>`;
}

function tagChip(key, clickable = true) {
  const t = TAGS[key];
  if (!t) return '';
  return `<span class="tag" style="--tag:${t.color}" ${clickable ? `data-action="tag" data-tag="${key}"` : ''}>#${esc(t.label)}</span>`;
}

function verified(u) {
  return u && u.verified ? `<span class="verified" title="Офіційний акаунт">${icon('check')}</span>` : '';
}

/* ---------- Компоненти ---------- */
function postHTML(p, { detail = false } = {}) {
  const u = p.anon ? null : USERS[p.author];
  const name = p.anon ? 'Анонім' : u.name;
  const meta = p.anon ? 'учень ліцею' : u.cls;
  const repliesCount = p.replies.length;

  return `
  <article class="post ${detail ? 'post--detail' : ''}" ${detail ? '' : `data-action="open" data-id="${p.id}"`} data-post="${p.id}">
    ${p.pinned && !detail ? `<div class="post__pinned">${icon('pin')} Закріплено модераторами</div>` : ''}
    <div class="post__side">
      <div ${p.anon ? '' : `data-action="user" data-handle="${u.handle}"`} class="post__ava">${avatar(u, p.anon)}</div>
      ${!detail && repliesCount ? '<div class="post__thread"></div>' : ''}
    </div>
    <div class="post__body">
      <header class="post__head">
        <span class="post__name ${p.anon ? '' : 'is-link'}" ${p.anon ? '' : `data-action="user" data-handle="${u.handle}"`}>${esc(name)}</span>
        ${verified(u)}
        <span class="post__meta">${esc(meta)} · ${esc(p.time)}</span>
        <button class="icon-btn post__more" data-action="menu" data-id="${p.id}" aria-label="Більше">${icon('more')}</button>
      </header>
      <div class="post__tags">${tagChip(p.tag)}${p.pending ? '<span class="pending">на модерації</span>' : ''}</div>
      <p class="post__text">${esc(p.text)}</p>
      ${p.poll ? pollHTML(p) : ''}
      <footer class="post__actions">
        <button class="act act--like ${p.liked ? 'is-on' : ''}" data-action="like" data-id="${p.id}" aria-label="Вподобати">
          ${icon('heart')}<span>${fmt(p.likes)}</span>
        </button>
        <button class="act" data-action="${detail ? 'focus-reply' : 'open'}" data-id="${p.id}" aria-label="Коментувати">
          ${icon('comment')}<span>${repliesCount || ''}</span>
        </button>
        <button class="act act--repost ${p.reposted ? 'is-on' : ''}" data-action="repost" data-id="${p.id}" aria-label="Поширити в стрічку">
          ${icon('repost')}<span>${p.reposts || ''}</span>
        </button>
        <button class="act" data-action="share" data-id="${p.id}" aria-label="Надіслати">${icon('share')}</button>
      </footer>
    </div>
  </article>`;
}

function pollHTML(p) {
  const total = p.poll.options.reduce((s, o) => s + o.votes, 0);
  const voted = p.poll.voted !== null;
  const opts = p.poll.options.map((o, i) => {
    const pct = total ? Math.round(o.votes / total * 100) : 0;
    if (!voted) {
      return `<button class="poll__opt" data-action="vote" data-id="${p.id}" data-i="${i}">${esc(o.text)}</button>`;
    }
    return `<div class="poll__res ${p.poll.voted === i ? 'is-mine' : ''}">
      <div class="poll__bar" style="width:${pct}%"></div>
      <span class="poll__label">${esc(o.text)} ${p.poll.voted === i ? icon('check') : ''}</span>
      <span class="poll__pct">${pct}%</span>
    </div>`;
  }).join('');
  return `<div class="poll">${opts}<div class="poll__total">${total} ${plural(total, 'голос', 'голоси', 'голосів')}${voted ? '' : ' · голосування анонімне'}</div></div>`;
}

function replyHTML(r) {
  const u = r.anon ? null : USERS[r.author];
  return `
  <div class="reply">
    <div ${r.anon ? '' : `data-action="user" data-handle="${u.handle}"`}>${avatar(u, r.anon, 'avatar--sm')}</div>
    <div class="reply__body">
      <div class="post__head">
        <span class="post__name ${r.anon ? '' : 'is-link'}" ${r.anon ? '' : `data-action="user" data-handle="${u.handle}"`}>${r.anon ? 'Анонім' : esc(u.name)}</span>
        ${verified(u)}
        <span class="post__meta">${r.anon ? '' : esc(u.cls) + ' · '}${esc(r.time)}</span>
      </div>
      <p class="post__text">${esc(r.text)}</p>
      <button class="act act--like act--small ${r.liked ? 'is-on' : ''}" data-action="like-reply" data-rid="${r.id}">${icon('heart')}<span>${r.likes || ''}</span></button>
    </div>
  </div>`;
}

function topbar(title, { back = false, extra = '' } = {}) {
  return `
  <div class="topbar">
    <div class="topbar__row">
      ${back ? `<button class="icon-btn" data-action="back" aria-label="Назад">${icon('back')}</button>` : `<div class="topbar__logo">${LOGO}</div>`}
      <h1 class="topbar__title">${title}</h1>
      <button class="icon-btn topbar__theme" data-action="theme" aria-label="Змінити тему">${icon(document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon')}</button>
    </div>
    ${extra}
  </div>`;
}

function tabs(items, active, action) {
  return `<div class="tabs">${items.map(([k, label]) =>
    `<button class="tabs__btn ${k === active ? 'is-active' : ''}" data-action="${action}" data-k="${k}">${label}</button>`).join('')}</div>`;
}

function empty(title, text) {
  return `<div class="empty"><div class="empty__emoji">🤫</div><h3>${title}</h3><p>${text}</p></div>`;
}

/* ---------- Сторінки ---------- */
function pageFeed() {
  let list = POSTS.filter(p => !state.hidden.has(p.id));
  if (state.feedTab === 'anon') list = list.filter(p => p.anon);
  if (state.feedTab === 'following') list = list.filter(p => !p.anon && (me.following.includes(p.author) || p.author === 'me'));
  if (state.feedTag) list = list.filter(p => p.tag === state.feedTag);
  // закріплені — вгорі
  list = [...list.filter(p => p.pinned), ...list.filter(p => !p.pinned)];

  const chips = `<div class="chips">
    <button class="chip ${!state.feedTag ? 'is-active' : ''}" data-action="tag" data-tag="">Усі теми</button>
    ${Object.keys(TAGS).map(k => `<button class="chip ${state.feedTag === k ? 'is-active' : ''}" style="--tag:${TAGS[k].color}" data-action="tag" data-tag="${k}">#${TAGS[k].label}</button>`).join('')}
  </div>`;

  return topbar('Стрічка', {
    extra: tabs([['all', 'Для вас'], ['anon', 'Анонімні'], ['following', 'Підписки']], state.feedTab, 'feed-tab') + chips
  }) + `
  <div class="composer-inline" data-action="compose">
    ${avatar(me)}
    <span class="composer-inline__ph">Що почув(-ла) сьогодні в ліцеї?</span>
    <span class="btn btn--sm">Написати</span>
  </div>
  <div class="feed">${list.length ? list.map(p => postHTML(p)).join('') : empty('Поки тиша', 'У цій темі ще ніхто нічого не підслухав. Стань першим!')}</div>`;
}

function pagePost(id) {
  const p = findPost(id);
  if (!p) return topbar('Допис', { back: true }) + empty('Допис не знайдено', 'Можливо, його видалили модератори.');
  return topbar('Допис', { back: true }) + postHTML(p, { detail: true }) + `
  <div class="replies-head">Відповіді <span>${p.replies.length}</span></div>
  <div class="replies">${p.replies.length ? p.replies.map(replyHTML).join('') : '<p class="muted pad">Ще немає відповідей. Будь першим!</p>'}</div>
  <form class="reply-form" id="replyForm" data-id="${p.id}">
    ${avatar(state.replyAnon ? null : me, state.replyAnon, 'avatar--sm')}
    <input id="replyInput" type="text" maxlength="300" placeholder="Відповісти${p.anon ? ' анонімові' : ''}…" autocomplete="off">
    <label class="mini-toggle" title="Відповісти анонімно">
      <input type="checkbox" id="replyAnon" ${state.replyAnon ? 'checked' : ''}><span>Анонімно</span>
    </label>
    <button class="btn btn--sm" type="submit">${icon('share')}</button>
  </form>`;
}

function pageSearch() {
  const trending = Object.keys(TAGS)
    .map(k => ({ k, n: POSTS.filter(p => p.tag === k).length * 37 + k.length * 11 }))
    .sort((a, b) => b.n - a.n);
  return topbar('Пошук') + `
  <div class="search">
    <div class="search__box">${icon('search')}<input id="searchInput" type="search" placeholder="Пошук дописів, тем, людей" autocomplete="off"></div>
  </div>
  <div id="searchResults">
    <h2 class="section-title">У тренді в ліцеї</h2>
    <div class="trend-list">
      ${trending.map((t, i) => `
        <button class="trend" data-action="tag" data-tag="${t.k}">
          <span class="trend__n">${i + 1}</span>
          <span class="trend__main"><b>#${TAGS[t.k].label}</b><small>${t.n} ${plural(t.n, 'допис', 'дописи', 'дописів')} цього тижня</small></span>
          <span class="trend__dot" style="--tag:${TAGS[t.k].color}"></span>
        </button>`).join('')}
    </div>
    <h2 class="section-title">Кого почитати</h2>
    ${Object.values(USERS).filter(u => u.id !== 'me').map(userRow).join('')}
  </div>`;
}

function userRow(u) {
  const f = me.following.includes(u.id);
  return `
  <div class="user-row" data-action="user" data-handle="${u.handle}">
    ${avatar(u)}
    <div class="user-row__main"><b>${esc(u.name)} ${verified(u)}</b><small>@${esc(u.handle)} · ${esc(u.cls)}</small></div>
    <button class="btn btn--sm ${f ? 'btn--ghost' : ''}" data-action="follow" data-uid="${u.id}">${f ? 'Ви підписані' : 'Підписатися'}</button>
  </div>`;
}

function searchResults(q) {
  q = q.trim().toLowerCase();
  if (!q) { $('#main').innerHTML = pageSearch(); $('#searchInput').focus(); return; }
  const posts = POSTS.filter(p => p.text.toLowerCase().includes(q) || p.tag.includes(q.replace('#', '')));
  const users = Object.values(USERS).filter(u => u.id !== 'me' && (u.name.toLowerCase().includes(q) || u.handle.includes(q)));
  $('#searchResults').innerHTML =
    (users.length ? `<h2 class="section-title">Люди</h2>${users.map(userRow).join('')}` : '') +
    `<h2 class="section-title">Дописи · ${posts.length}</h2>` +
    (posts.length ? posts.map(p => postHTML(p)).join('') : empty('Нічого не знайдено', `За запитом «${esc(q)}» поки нічого немає.`));
}

function pageNotifications() {
  const icons = { like: 'heart', reply: 'comment', mod: 'shield', follow: 'user', mention: 'at' };
  let list = NOTIFICATIONS;
  if (state.notifTab === 'mentions') list = list.filter(n => n.type === 'mention' || n.type === 'reply');
  return topbar('Сповіщення', {
    extra: tabs([['all', 'Усі'], ['mentions', 'Згадки й відповіді']], state.notifTab, 'notif-tab')
  }) + `
  <div class="notif-actions"><button class="link-btn" data-action="read-all">Позначити все прочитаним</button></div>
  <div class="notifs">
    ${list.map(n => {
      const u = USERS[n.user];
      return `
      <div class="notif ${n.unread ? 'is-unread' : ''}" data-nid="${n.id}" data-action="${n.target ? 'open' : 'user'}" data-id="${n.target || ''}" data-handle="${u.handle}">
        <div class="notif__ava">${avatar(u)}<span class="notif__badge notif__badge--${n.type}">${icon(icons[n.type])}</span></div>
        <div class="notif__main">
          <p>${n.type === 'mod' ? '' : `<b>${esc(u.name)}</b> `}${esc(n.text)}</p>
          <small>${esc(n.time)}</small>
        </div>
        ${n.type === 'follow' ? `<button class="btn btn--sm ${me.following.includes(u.id) ? 'btn--ghost' : ''}" data-action="follow" data-uid="${u.id}">${me.following.includes(u.id) ? 'Ви підписані' : 'Підписатися'}</button>` : ''}
      </div>`;
    }).join('') || empty('Порожньо', 'Тут з’являться згадки та відповіді.')}
  </div>`;
}

function pageProfile(u) {
  const isMe = u.id === 'me';
  const following = me.following.includes(u.id);
  const own = POSTS.filter(p => p.author === u.id && !p.anon);
  let list;
  if (state.profileTab === 'posts') list = own.map(p => postHTML(p)).join('');
  else if (state.profileTab === 'replies') {
    list = POSTS.filter(p => p.replies.some(r => r.author === u.id && !r.anon))
      .map(p => postHTML(p)).join('');
  } else {
    list = POSTS.filter(p => p.liked).map(p => postHTML(p)).join('');
  }

  const anonCount = isMe ? POSTS.filter(p => p.mine && p.anon).length : 0;

  return topbar(isMe ? 'Профіль' : esc(u.name), { back: !isMe }) + `
  <section class="profile">
    <div class="profile__cover" style="--av:${u.color}"></div>
    <div class="profile__top">
      ${avatar(u, false, 'avatar--xl')}
      ${isMe
        ? `<button class="btn btn--ghost" data-action="edit-profile">Редагувати профіль</button>`
        : `<button class="btn ${following ? 'btn--ghost' : ''}" data-action="follow" data-uid="${u.id}">${following ? 'Ви підписані' : 'Підписатися'}</button>`}
    </div>
    <h2 class="profile__name">${esc(u.name)} ${verified(u)}</h2>
    <div class="profile__handle">@${esc(u.handle)} <span class="badge">${esc(u.cls)}</span></div>
    <p class="profile__bio">${esc(u.bio)}</p>
    <div class="profile__stats">
      <span><b>${own.length}</b> ${plural(own.length, 'допис', 'дописи', 'дописів')}</span>
      <span><b>${u.followers + (following && !isMe ? 1 : 0)}</b> ${plural(u.followers, 'підписник', 'підписники', 'підписників')}</span>
      <span><b>${(u.following || []).length}</b> підписок</span>
    </div>
    ${isMe ? `<div class="profile__note">${icon('shield')}<span>Ваші анонімні дописи (${anonCount}) не показуються в профілі. Їх бачите лише ви та модератори.</span></div>` : ''}
  </section>
  ${tabs([['posts', 'Дописи'], ['replies', 'Відповіді'], ...(isMe ? [['liked', 'Вподобане']] : [])], state.profileTab, 'profile-tab')}
  <div class="feed">${list || empty('Тут поки порожньо', isMe ? 'Напишіть свій перший допис!' : 'Користувач ще нічого не публікував.')}</div>`;
}

function pageRules() {
  return topbar('Правила спільноти', { back: true }) + `
  <div class="rules">
    <p class="rules__lead">«Підслухано у Ліцеї 8» — місце, де можна анонімно поділитися історією, подякувати чи запитати. Щоб тут було приємно всім, домовляємось:</p>
    ${RULES.map((r, i) => `<div class="rule"><span class="rule__n">${i + 1}</span><div><h3>${r.title}</h3><p>${r.text}</p></div></div>`).join('')}
    <button class="btn btn--block" data-action="compose">Зрозуміло, написати допис</button>
  </div>`;
}

/* ---------- Каркас: сайдбар, права колонка, таббар ---------- */
const NAV = [
  ['feed', 'Стрічка', 'home'],
  ['search', 'Пошук', 'search'],
  ['notifications', 'Сповіщення', 'bell'],
  ['profile', 'Профіль', 'user'],
  ['rules', 'Правила', 'book']
];

function renderShell() {
  const unread = NOTIFICATIONS.filter(n => n.unread).length;
  const badge = unread ? `<span class="nav__badge">${unread}</span>` : '';

  $('#sidebar').innerHTML = `
    <a class="brand" href="#/feed">${LOGO}<span class="brand__text"><b>Підслухано</b><small>у Ліцеї 8</small></span></a>
    <nav class="nav">
      ${NAV.map(([k, label, ic]) => `<a class="nav__item" href="#/${k}" data-nav="${k}">${icon(ic)}<span>${label}</span>${k === 'notifications' ? badge : ''}</a>`).join('')}
    </nav>
    <button class="btn btn--big" data-action="compose">${icon('plus')}<span>Новий допис</span></button>
    <div class="sidebar__bottom">
      <button class="nav__item" data-action="theme">${icon(document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon')}<span>${document.documentElement.dataset.theme === 'dark' ? 'Світла тема' : 'Темна тема'}</span></button>
      <div class="me-card">
        ${avatar(me, false, 'avatar--sm')}
        <div class="me-card__main"><b>${esc(me.name)}</b><small>@${esc(me.handle)}</small></div>
        <button class="icon-btn" data-action="logout" title="Вийти">${icon('logout')}</button>
      </div>
    </div>`;

  $('#tabbar').innerHTML = `
    <a href="#/feed" data-nav="feed" aria-label="Стрічка">${icon('home')}</a>
    <a href="#/search" data-nav="search" aria-label="Пошук">${icon('search')}</a>
    <button data-action="compose" class="tabbar__plus" aria-label="Новий допис">${icon('plus')}</button>
    <a href="#/notifications" data-nav="notifications" aria-label="Сповіщення">${icon('bell')}${badge}</a>
    <a href="#/profile" data-nav="profile" aria-label="Профіль">${icon('user')}</a>`;

  $('#fab').innerHTML = icon('plus');

  const trending = ['кохання', 'їдальня', 'події', 'смішне'];
  $('#aside').innerHTML = `
    <div class="card">
      <h3 class="card__title">Найближчі події</h3>
      ${EVENTS.map(e => `<div class="event"><div class="event__date"><b>${e.date}</b><small>${e.month}</small></div><div><b>${e.title}</b><small>${e.note}</small></div></div>`).join('')}
    </div>
    <div class="card">
      <h3 class="card__title">Гарячі теми</h3>
      <div class="aside-tags">${trending.map(k => tagChip(k)).join('')}</div>
    </div>
    <div class="card card--accent">
      <h3 class="card__title">${icon('shield')} Анонімно, але чесно</h3>
      <p>Кожен анонімний допис перевіряють модератори. Без образ, без справжніх імен у зізнаннях.</p>
      <a class="link-btn" href="#/rules">Читати правила →</a>
    </div>
    <p class="aside__foot">Шкільний проєкт · Ліцей №8 · 2026<br>Це макет — дані не зберігаються.</p>`;
}

function renderLogin() {
  $('#login').innerHTML = `
  <div class="login__card">
    <div class="login__logo">${LOGO}</div>
    <h1>Підслухано<br><span>у Ліцеї 8</span></h1>
    <p class="login__lead">Анонімні зізнання, подяки, загублені речі та все, що чути на перервах.</p>
    <button class="btn btn--block btn--light" data-action="login">${icon('google')} Увійти через шкільну пошту</button>
    <button class="btn btn--block" data-action="login">Увійти як гість</button>
    <p class="login__fine">Входячи, ви погоджуєтеся з <a href="#/rules" data-action="login-rules">правилами спільноти</a>. Вхід лише для учнів ліцею.</p>
  </div>
  <div class="login__bubbles" aria-hidden="true">
    <span style="--x:8%;--y:14%;--r:-6deg">«а хто з 11-Б тримає двері?» 👀</span>
    <span style="--x:62%;--y:9%;--r:5deg">піца-булочка — топ 🍕</span>
    <span style="--x:70%;--y:78%;--r:-4deg">знайшовся пенал з NASA!</span>
    <span style="--x:4%;--y:80%;--r:4deg">дякую за парасольку ☂️</span>
  </div>`;
}

/* ---------- Роутер ---------- */
function route() {
  closeMenu();
  const hash = location.hash.replace(/^#\/?/, '') || 'login';
  const [page, param] = hash.split('/');

  if (!state.loggedIn) {
    $('#shell').hidden = true; $('#tabbar').hidden = true; $('#fab').hidden = true;
    $('#login').hidden = false;
    renderLogin();
    if (page !== 'login') history.replaceState(null, '', '#/login');
    return;
  }
  $('#login').hidden = true;
  $('#shell').hidden = false; $('#tabbar').hidden = false; $('#fab').hidden = false;
  renderShell();

  const main = $('#main');
  let html;
  switch (page) {
    case 'post': html = pagePost(param); break;
    case 'search': html = pageSearch(); break;
    case 'notifications': html = pageNotifications(); break;
    case 'profile': html = pageProfile(me); break;
    case 'user': {
      const u = byHandle(decodeURIComponent(param || ''));
      html = u ? pageProfile(u) : topbar('Профіль', { back: true }) + empty('Користувача не знайдено', '');
      break;
    }
    case 'rules': html = pageRules(); break;
    default: html = pageFeed();
  }
  main.innerHTML = html;
  document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('is-active', a.dataset.nav === (page === 'login' ? 'feed' : page)));
  if (state.scrollTop !== false) window.scrollTo(0, 0);
  state.scrollTop = true;
}

function rerender() { state.scrollTop = false; route(); }

/* ---------- Модальні вікна ---------- */
function openModal(html, cls = '') {
  const root = $('#modalRoot');
  root.innerHTML = `<div class="modal-backdrop" data-action="close-modal"></div><div class="modal ${cls}" role="dialog" aria-modal="true">${html}</div>`;
  root.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  const f = root.querySelector('textarea, input');
  if (f) setTimeout(() => f.focus(), 50);
}
function closeModal() {
  const root = $('#modalRoot');
  root.classList.remove('is-open');
  root.innerHTML = '';
  document.body.style.overflow = '';
}

function openCompose() {
  const c = state.compose;
  openModal(`
    <div class="modal__head">
      <button class="link-btn" data-action="close-modal">Скасувати</button>
      <h2>Новий допис</h2>
      <span style="width:72px"></span>
    </div>
    <form id="composeForm" class="compose">
      <div class="compose__row">
        <div id="composeAva">${avatar(me, c.anon)}</div>
        <div class="compose__main">
          <b id="composeName">${c.anon ? 'Анонім' : esc(me.name)}</b>
          <textarea id="composeText" maxlength="500" rows="5" placeholder="Що почув(-ла) сьогодні в ліцеї?"></textarea>
          <div id="pollEditor" class="poll-editor" ${c.poll ? '' : 'hidden'}>
            <input type="text" maxlength="40" placeholder="Варіант 1">
            <input type="text" maxlength="40" placeholder="Варіант 2">
            <input type="text" maxlength="40" placeholder="Варіант 3 (необов'язково)">
          </div>
          <div class="compose__tools">
            <button type="button" class="icon-btn ${c.poll ? 'is-on' : ''}" data-action="toggle-poll" title="Додати опитування">${icon('poll')}</button>
            <span class="compose__count"><span id="composeCount">0</span>/500</span>
          </div>
        </div>
      </div>
      <div class="compose__label">Тема</div>
      <div class="chips chips--wrap">
        ${Object.keys(TAGS).filter(k => k !== 'оголошення').map(k => `<button type="button" class="chip ${c.tag === k ? 'is-active' : ''}" style="--tag:${TAGS[k].color}" data-action="compose-tag" data-tag="${k}">#${TAGS[k].label}</button>`).join('')}
      </div>
      <label class="switch">
        <input type="checkbox" id="composeAnon" ${c.anon ? 'checked' : ''}>
        <span class="switch__track"></span>
        <span class="switch__text"><b>Опублікувати анонімно</b><small>Ім’я бачитимуть лише модератори. Допис з’явиться після перевірки.</small></span>
      </label>
      <button class="btn btn--block" type="submit" id="composeSubmit" disabled>Опублікувати</button>
    </form>`, 'modal--compose');
}

function openEditProfile() {
  openModal(`
    <div class="modal__head">
      <button class="link-btn" data-action="close-modal">Скасувати</button>
      <h2>Редагування профілю</h2>
      <span style="width:72px"></span>
    </div>
    <form id="profileForm" class="form">
      <label>Ім’я<input name="name" value="${esc(me.name)}" maxlength="40" required></label>
      <label>Нікнейм<input name="handle" value="${esc(me.handle)}" maxlength="20" required></label>
      <label>Клас
        <select name="cls">${['8-А', '8-Б', '9-А', '9-В', '10-А', '10-Б', '11-А', '11-Б'].map(c => `<option ${c === me.cls ? 'selected' : ''}>${c}</option>`).join('')}</select>
      </label>
      <label>Про себе<textarea name="bio" rows="3" maxlength="160">${esc(me.bio)}</textarea></label>
      <button class="btn btn--block" type="submit">Зберегти</button>
    </form>`);
}

function openMenu(btn, id) {
  closeMenu();
  const p = findPost(id);
  const r = btn.getBoundingClientRect();
  const m = document.createElement('div');
  m.className = 'menu';
  m.id = 'menu';
  m.innerHTML = `
    <button data-action="copy-link" data-id="${id}">${icon('link')} Скопіювати посилання</button>
    <button data-action="hide" data-id="${id}">${icon('hide')} Не цікаво</button>
    ${p.author === 'me' || p.mine ? `<button data-action="delete" data-id="${id}" class="is-danger">${icon('close')} Видалити</button>`
      : `<button data-action="report" data-id="${id}" class="is-danger">${icon('flag')} Поскаржитися</button>`}`;
  document.body.appendChild(m);
  const top = r.bottom + window.scrollY + 4;
  const left = Math.max(12, Math.min(r.right + window.scrollX - 230, window.innerWidth - 242));
  m.style.top = top + 'px';
  m.style.left = left + 'px';
}
function closeMenu() { const m = $('#menu'); if (m) m.remove(); }

function openReport(id) {
  const reasons = ['Образи або булінг', 'Справжнє ім’я без згоди', 'Чуже фото', 'Неправдива інформація', 'Спам', 'Інше'];
  openModal(`
    <div class="modal__head">
      <button class="link-btn" data-action="close-modal">Скасувати</button>
      <h2>Скарга</h2>
      <span style="width:72px"></span>
    </div>
    <form id="reportForm" class="form" data-id="${id}">
      <p class="muted">Що не так із цим дописом? Скаргу побачать лише модератори.</p>
      <div class="radio-list">
        ${reasons.map((r, i) => `<label class="radio"><input type="radio" name="reason" value="${i}" ${i === 0 ? 'checked' : ''}><span>${r}</span></label>`).join('')}
      </div>
      <button class="btn btn--block btn--danger" type="submit">Надіслати скаргу</button>
    </form>`);
}

/* ---------- Оновлення одного допису без перерендеру сторінки ---------- */
function refreshPost(id) {
  const p = findPost(id);
  document.querySelectorAll(`[data-post="${id}"]`).forEach(el => {
    const detail = el.classList.contains('post--detail');
    el.outerHTML = postHTML(p, { detail });
  });
}

/* ---------- Обробка кліків ---------- */
document.addEventListener('click', (e) => {
  if (!e.target.closest('#menu') && !e.target.closest('[data-action="menu"]')) closeMenu();

  const el = e.target.closest('[data-action]');
  if (!el) return;
  const a = el.dataset.action;
  const id = el.dataset.id;

  // Для елементів-посилань не даємо браузеру переходити, якщо це дія
  if (el.tagName === 'A') e.preventDefault();
  if (el.dataset.nid) { const n = NOTIFICATIONS.find(x => x.id === el.dataset.nid); if (n) n.unread = false; }

  switch (a) {
    case 'login':
      state.loggedIn = true;
      location.hash = '#/feed';
      route();
      toast('Вітаємо, ' + me.name.split(' ')[0] + '!');
      break;
    case 'login-rules':
      openModal(`<div class="modal__head"><span style="width:72px"></span><h2>Правила</h2><button class="link-btn" data-action="close-modal">Закрити</button></div>
        <div class="rules rules--modal">${RULES.map((r, i) => `<div class="rule"><span class="rule__n">${i + 1}</span><div><h3>${r.title}</h3><p>${r.text}</p></div></div>`).join('')}</div>`);
      break;
    case 'logout':
      state.loggedIn = false;
      location.hash = '#/login';
      break;
    case 'open':
      if (id) location.hash = '#/post/' + id;
      break;
    case 'user':
      e.stopPropagation();
      location.hash = el.dataset.handle === me.handle ? '#/profile' : '#/user/' + encodeURIComponent(el.dataset.handle);
      break;
    case 'back':
      if (history.length > 1) history.back(); else location.hash = '#/feed';
      break;
    case 'theme': {
      const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = t;
      try { localStorage.setItem('pl8-theme', t); } catch (_) {}
      rerender();
      break;
    }
    case 'feed-tab': state.feedTab = el.dataset.k; rerender(); break;
    case 'profile-tab': state.profileTab = el.dataset.k; rerender(); break;
    case 'notif-tab': state.notifTab = el.dataset.k; rerender(); break;
    case 'tag':
      state.feedTag = el.dataset.tag || null;
      if (!location.hash.startsWith('#/feed')) { location.hash = '#/feed'; }
      else rerender();
      break;
    case 'like': {
      const p = findPost(id);
      p.liked = !p.liked; p.likes += p.liked ? 1 : -1;
      refreshPost(id);
      break;
    }
    case 'like-reply': {
      const r = POSTS.flatMap(p => p.replies).find(x => x.id === el.dataset.rid);
      r.liked = !r.liked; r.likes += r.liked ? 1 : -1;
      el.classList.toggle('is-on', r.liked);
      el.querySelector('span').textContent = r.likes || '';
      break;
    }
    case 'repost': {
      const p = findPost(id);
      p.reposted = !p.reposted; p.reposts += p.reposted ? 1 : -1;
      refreshPost(id);
      toast(p.reposted ? 'Допис поширено у ваш профіль' : 'Поширення скасовано');
      break;
    }
    case 'share':
    case 'copy-link': {
      const url = location.href.split('#')[0] + '#/post/' + id;
      try { navigator.clipboard.writeText(url); } catch (_) {}
      closeMenu();
      toast('Посилання скопійовано');
      break;
    }
    case 'vote': {
      const p = findPost(id);
      const i = +el.dataset.i;
      p.poll.voted = i; p.poll.options[i].votes++;
      refreshPost(id);
      break;
    }
    case 'menu': e.stopPropagation(); openMenu(el, id); break;
    case 'hide':
      state.hidden.add(id); closeMenu();
      if (location.hash.startsWith('#/post/')) location.hash = '#/feed'; else rerender();
      toast('Допис приховано зі стрічки');
      break;
    case 'delete':
      POSTS = POSTS.filter(p => p.id !== id); closeMenu();
      if (location.hash.startsWith('#/post/')) location.hash = '#/feed'; else rerender();
      toast('Допис видалено');
      break;
    case 'report': closeMenu(); openReport(id); break;
    case 'follow': {
      e.stopPropagation();
      const uid = el.dataset.uid;
      const i = me.following.indexOf(uid);
      if (i >= 0) me.following.splice(i, 1); else me.following.push(uid);
      rerender();
      toast(i >= 0 ? 'Ви відписалися' : 'Ви підписалися на ' + USERS[uid].name);
      break;
    }
    case 'read-all':
      NOTIFICATIONS.forEach(n => n.unread = false);
      rerender();
      break;
    case 'focus-reply': $('#replyInput').focus(); break;
    case 'compose': openCompose(); break;
    case 'close-modal': closeModal(); break;
    case 'edit-profile': openEditProfile(); break;
    case 'compose-tag':
      state.compose.tag = el.dataset.tag;
      el.parentElement.querySelectorAll('.chip').forEach(c => c.classList.toggle('is-active', c === el));
      break;
    case 'toggle-poll':
      state.compose.poll = !state.compose.poll;
      el.classList.toggle('is-on', state.compose.poll);
      $('#pollEditor').hidden = !state.compose.poll;
      break;
  }
});

/* ---------- Форми та поля ---------- */
document.addEventListener('input', (e) => {
  if (e.target.id === 'searchInput') searchResults(e.target.value);
  if (e.target.id === 'composeText') {
    const len = e.target.value.trim().length;
    $('#composeCount').textContent = e.target.value.length;
    $('#composeSubmit').disabled = len < 3;
  }
});

document.addEventListener('change', (e) => {
  if (e.target.id === 'composeAnon') {
    state.compose.anon = e.target.checked;
    $('#composeAva').innerHTML = avatar(me, state.compose.anon);
    $('#composeName').textContent = state.compose.anon ? 'Анонім' : me.name;
  }
  if (e.target.id === 'replyAnon') {
    state.replyAnon = e.target.checked;
    const form = $('#replyForm');
    form.querySelector('.avatar').outerHTML = avatar(state.replyAnon ? null : me, state.replyAnon, 'avatar--sm');
  }
});

document.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;

  if (f.id === 'composeForm') {
    const text = $('#composeText').value.trim();
    if (text.length < 3) return;
    const c = state.compose;
    const post = {
      id: 'p' + Date.now(), author: c.anon ? null : 'me', anon: c.anon, mine: true,
      tag: c.tag, time: 'щойно', text, likes: 0, liked: false, reposts: 0, reposted: false, replies: [],
      pending: c.anon
    };
    if (c.poll) {
      const opts = [...f.querySelectorAll('#pollEditor input')].map(i => i.value.trim()).filter(Boolean);
      if (opts.length >= 2) post.poll = { voted: null, options: opts.map(t => ({ text: t, votes: 0 })) };
    }
    POSTS.unshift(post);
    c.poll = false;
    closeModal();
    state.feedTag = null; state.feedTab = 'all';
    if (location.hash === '#/feed') rerender(); else location.hash = '#/feed';
    toast(c.anon ? 'Надіслано на модерацію. Зазвичай до 15 хв' : 'Допис опубліковано');
    if (c.anon) {
      // імітація: через 6 секунд модератор схвалює допис
      setTimeout(() => {
        post.pending = false;
        NOTIFICATIONS.unshift({ id: 'n' + Date.now(), type: 'mod', user: 'admin', text: 'Ваш анонімний допис пройшов модерацію і опублікований', target: post.id, time: 'щойно', unread: true });
        rerender();
        toast('Модератори схвалили ваш допис 🎉');
      }, 6000);
    }
  }

  if (f.id === 'replyForm') {
    const input = $('#replyInput');
    const text = input.value.trim();
    if (!text) return;
    const p = findPost(f.dataset.id);
    p.replies.push({ id: 'r' + Date.now(), author: state.replyAnon ? null : 'me', anon: !!state.replyAnon, time: 'щойно', text, likes: 0 });
    rerender();
    toast('Відповідь додано');
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  if (f.id === 'profileForm') {
    const d = new FormData(f);
    me.name = d.get('name').trim() || me.name;
    me.handle = d.get('handle').trim().replace(/^@/, '') || me.handle;
    me.cls = d.get('cls');
    me.bio = d.get('bio').trim();
    closeModal();
    rerender();
    toast('Профіль оновлено');
  }

  if (f.id === 'reportForm') {
    closeModal();
    toast('Дякуємо! Модератори перевірять допис');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeModal(); closeMenu(); }
});

window.addEventListener('hashchange', route);
route();
