/* =========================================================
   Тестові дані. Бази даних поки немає — усе живе в пам'яті
   браузера і скидається після перезавантаження сторінки.
   ========================================================= */

const TAGS = {
  'оголошення': { label: 'оголошення', color: '#ff4d2e' },
  'кохання':    { label: 'кохання',    color: '#e8457c' },
  'вчителі':    { label: 'вчителі',    color: '#2f8f5b' },
  'їдальня':    { label: 'їдальня',    color: '#e08a00' },
  'загублене':  { label: 'загублене',  color: '#3a6fe0' },
  'подяка':     { label: 'подяка',     color: '#8a4fd8' },
  'події':      { label: 'події',      color: '#0e9aa7' },
  'олімпіади':  { label: 'олімпіади',  color: '#5c6bc0' },
  'питання':    { label: 'питання',    color: '#6b7f99' },
  'смішне':     { label: 'смішне',     color: '#d1a000' }
};

const USERS = {
  me:     { id: 'me',     name: 'Олена Коваль',     handle: 'olena_k',       cls: '10-А', color: '#ff7a59', bio: 'Біологиня-початківиця 🧬 · староста 10-А · люблю каву з їдальні (жарт)', followers: 128, following: ['max', 'sofia', 'admin'] },
  admin:  { id: 'admin',  name: 'Модерація',        handle: 'pidsluhano_l8', cls: 'адмін', color: '#ff4d2e', bio: 'Офіційна сторінка. Пости модеруються вручну.', followers: 912, verified: true, following: [] },
  max:    { id: 'max',    name: 'Максим Ткаченко',  handle: 'max_tk',        cls: '9-В',  color: '#3a6fe0', bio: 'Інформатика, баскетбол, вічно щось гублю', followers: 64, following: [] },
  sofia:  { id: 'sofia',  name: 'Софія Бондар',     handle: 'sofi.b',        cls: '11-А', color: '#0e9aa7', bio: 'Учнівське самоврядування · організовую Осінній бал 🍂', followers: 301, following: [] },
  andriy: { id: 'andriy', name: 'Андрій Мельник',   handle: 'andriy_m',      cls: '11-Б', color: '#2f8f5b', bio: 'Фізмат. Відповідаю на питання з алгебри в коментах.', followers: 87, following: [] },
  daryna: { id: 'daryna', name: 'Дарина Шевчук',    handle: 'daryna.sh',     cls: '8-А',  color: '#8a4fd8', bio: 'Малюю на полях зошитів ✏️', followers: 45, following: [] }
};

let POSTS = [
  {
    id: 'p1', author: 'admin', anon: false, tag: 'оголошення', time: '1 год', pinned: true,
    text: 'Нагадуємо правила: пишемо без образ, не називаємо справжніх імен у «пікантних» постах і не викладаємо чужі фото без дозволу. Кожен анонімний допис проходить модерацію — зазвичай до 15 хвилин 🙌',
    likes: 214, liked: false, reposts: 12, reposted: false,
    replies: [
      { id: 'r1', author: 'sofia', anon: false, time: '50 хв', text: 'Дякуємо, що слідкуєте за порядком!', likes: 18 }
    ]
  },
  {
    id: 'p2', author: null, anon: true, tag: 'кохання', time: '12 хв',
    text: 'Хлопцю з 11-Б, який щоранку тримає двері в головному корпусі: ти навіть не уявляєш, як це рятує мій настрій о 7:55. Дякую 🙏',
    likes: 87, liked: false, reposts: 4, reposted: false,
    replies: [
      { id: 'r2', author: 'andriy', anon: false, time: '8 хв', text: 'Здається, я знаю, про кого це 👀', likes: 23 },
      { id: 'r3', author: null, anon: true, time: '5 хв', text: 'Він і мені тримав! Справжній джентльмен', likes: 11 }
    ]
  },
  {
    id: 'p3', author: null, anon: true, tag: 'їдальня', time: '34 хв',
    text: 'Вирішуємо раз і назавжди. Найкраще в нашій їдальні — це…',
    poll: {
      voted: null,
      options: [
        { text: 'Сирники', votes: 64 },
        { text: 'Піца-булочка', votes: 81 },
        { text: 'Млинці з вишнею', votes: 47 },
        { text: 'Ношу з дому 🥪', votes: 23 }
      ]
    },
    likes: 56, liked: false, reposts: 9, reposted: false,
    replies: [
      { id: 'r4', author: 'max', anon: false, time: '20 хв', text: 'Піца-булочка без шансів для інших 🍕', likes: 15 }
    ]
  },
  {
    id: 'p4', author: 'max', anon: false, tag: 'загублене', time: '1 год',
    text: 'Хто знайшов чорний пенал з наліпкою NASA біля спортзалу після 5 уроку — напишіть, будь ласка. Там флешка з проєктом з інформатики 😭',
    likes: 31, liked: false, reposts: 17, reposted: false,
    replies: [
      { id: 'r5', author: 'daryna', anon: false, time: '40 хв', text: 'Здається, бачила такий на вахті! Запитай у чергової.', likes: 9 },
      { id: 'r6', author: 'max', anon: false, time: '25 хв', text: 'ЗНАЙШОВСЯ!!! Дякую-дякую 🙏🙏', likes: 27 }
    ]
  },
  {
    id: 'p5', author: null, anon: true, tag: 'вчителі', time: '2 год',
    text: 'Сьогодні на алгебрі похідну пояснили через траєкторію м\'яча в баскетболі. Вперше за рік я реально зрозумів, навіщо вона потрібна. Респект нашій математичці!',
    likes: 142, liked: false, reposts: 6, reposted: false,
    replies: []
  },
  {
    id: 'p6', author: 'sofia', anon: false, tag: 'події', time: '3 год',
    text: 'Осінній бал — 24 жовтня! 🍂 Шукаємо ведучих, людей у світлову команду і тих, хто вміє робити фотозону. Пишіть у коментарі або підходьте в кабінет самоврядування (204) на великій перерві.',
    likes: 98, liked: false, reposts: 22, reposted: false,
    replies: [
      { id: 'r7', author: 'daryna', anon: false, time: '2 год', text: 'Можу намалювати банер для фотозони!', likes: 14 },
      { id: 'r8', author: 'andriy', anon: false, time: '2 год', text: 'Беру світло на себе 💡', likes: 8 }
    ]
  },
  {
    id: 'p7', author: null, anon: true, tag: 'смішне', time: '4 год',
    text: 'На фізиці проєктор посеред уроку сам увімкнувся і показав заставку з котиками. Вчитель, не моргнувши: «А це, діти, демонстрація броунівського руху» 😂',
    likes: 203, liked: false, reposts: 31, reposted: false,
    replies: [
      { id: 'r9', author: null, anon: true, time: '3 год', text: 'Я був там, це було легендарно', likes: 40 }
    ]
  },
  {
    id: 'p8', author: 'me', anon: false, tag: 'олімпіади', time: 'вчора',
    text: 'Наша команда пройшла на обласний етап олімпіади з біології! Дякуємо нашій вчительці за всі ці вечори з задачами з генетики 🧬',
    likes: 76, liked: true, reposts: 3, reposted: false,
    replies: [
      { id: 'r10', author: 'sofia', anon: false, time: 'вчора', text: 'Пишаємось вами! 🔥', likes: 6 }
    ]
  },
  {
    id: 'p9', author: null, anon: true, tag: 'подяка', time: 'вчора',
    text: 'Дякую тому, хто залишив парасольку на підвіконні біля вахти з запискою «Візьми, якщо треба». Я взяла, дійшла додому суха, сьогодні повернула ☂️',
    likes: 119, liked: false, reposts: 8, reposted: false,
    replies: []
  },
  {
    id: 'p10', author: null, anon: true, tag: 'питання', time: 'вчора',
    text: 'Хтось знає, чи буде перездача контрольної з хімії для тих, хто хворів минулого тижня?',
    likes: 12, liked: false, reposts: 0, reposted: false,
    replies: [
      { id: 'r11', author: 'andriy', anon: false, time: 'вчора', text: 'У четвер після 7 уроку, каб. 312', likes: 10 }
    ]
  },
  {
    id: 'p11', author: null, anon: true, tag: 'кохання', time: '2 дні',
    text: 'Дівчині в зеленому светрі, яка на великій перерві читала «Тіні забутих предків» у бібліотеці: який у тебе улюблений момент? Я досі не можу забути сцену з трембітою.',
    likes: 64, liked: false, reposts: 2, reposted: false,
    replies: []
  },
  {
    id: 'p12', author: null, anon: true, tag: 'їдальня', time: '2 дні',
    text: 'Чому чай у їдальні завжди або окріп, або крижаний? Третього не дано 🫖',
    likes: 88, liked: false, reposts: 5, reposted: false,
    replies: []
  }
];

let NOTIFICATIONS = [
  { id: 'n1', type: 'like',     user: 'sofia',  text: 'вподобала ваш допис', target: 'p8', time: '5 хв',  unread: true },
  { id: 'n2', type: 'reply',    user: 'sofia',  text: 'відповіла: «Пишаємось вами! 🔥»', target: 'p8', time: '12 хв', unread: true },
  { id: 'n3', type: 'mod',      user: 'admin',  text: 'Ваш анонімний допис пройшов модерацію і опублікований', target: 'p9', time: '1 год', unread: true },
  { id: 'n4', type: 'follow',   user: 'daryna', text: 'підписалася на вас', time: '3 год', unread: false },
  { id: 'n5', type: 'like',     user: 'andriy', text: 'та ще 74 людини вподобали ваш допис', target: 'p8', time: 'вчора', unread: false },
  { id: 'n6', type: 'mention',  user: 'max',    text: 'згадав вас: «@olena_k ти ж знаєш, як знайти загублене?»', target: 'p4', time: 'вчора', unread: false }
];

const EVENTS = [
  { date: '14', month: 'жов', title: 'День захисників і захисниць', note: 'Вихідний' },
  { date: '17', month: 'жов', title: 'Олімпіада з математики', note: 'Каб. 301, 8:30' },
  { date: '24', month: 'жов', title: 'Осінній бал 🍂', note: 'Актова зала, 17:00' }
];

const RULES = [
  { title: 'Без образ і цькування', text: 'Ніяких принижень, булінгу й обговорення зовнішності. Пости з цим не пройдуть модерацію.' },
  { title: 'Без справжніх імен', text: 'У зізнаннях і «пікантних» постах описуйте людину, а не називайте її. Вчителів — лише з повагою.' },
  { title: 'Чужі фото — тільки з дозволу', text: 'Не викладайте фото людей, які не погодились на це.' },
  { title: 'Анонімність — не безкарність', text: 'Модератори бачать автора анонімного допису і можуть заблокувати акаунт за порушення.' },
  { title: 'Бачиш проблему — поскаржся', text: 'Кнопка «Поскаржитися» є в меню кожного допису. Скарги розглядаються протягом дня.' }
];
