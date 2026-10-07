# Підслухано у Ліцеї 8

Анонімна шкільна стрічка в стилі Threads / Twitter. Зараз це **клікабельний макет**
(лише HTML + CSS + трохи JavaScript). Твоє завдання: перетворити його на справжній сайт на **Django**.

Цей файл одночасно інструкція і план роботи. Іди по етапах згори вниз і не перескакуй:
кожен етап спирається на попередній.

---

## 1. Як подивитися макет

Відкрий `index.html` подвійним кліком: він перекине на сторінку входу.
Далі все клікається: стрічка, допис, новий допис, пошук, профіль, сповіщення.

> Лайки, голосування й фільтри в макеті працюють «понарошку» (через `static/js/main.js`).
> Після оновлення сторінки все скидається. Зберігати дані навчиться твій Django.

## 2. Що де лежить

```
pidsluhano/
├── index.html            ← просто перекидає на templates/login.html
├── templates/            ← СТОРІНКИ МАКЕТА. Кожна = майбутній Django-шаблон
│   ├── login.html          вхід
│   ├── register.html       реєстрація
│   ├── feed.html           стрічка (головна)
│   ├── post_detail.html    один допис + відповіді
│   ├── post_form.html      новий допис
│   ├── search.html         пошук
│   ├── notifications.html  сповіщення
│   ├── profile.html        мій профіль
│   ├── user_profile.html   чужий профіль
│   ├── profile_edit.html   редагування профілю
│   ├── report.html         скарга на допис
│   └── rules.html          правила
├── static/               ← переїде в Django без змін
│   ├── css/style.css       усі стилі (світла й темна тема, мобільна версія)
│   └── js/main.js          трохи JS. Шматки "ДЕМО" потім видалиш, "ЗАЛИШИТИ" залишаться
├── django_examples/      ← ПІДКАЗКИ: готові шматки Django-коду, перевірені
│   ├── posts/models.py     моделі (таблиці бази даних)
│   ├── posts/views.py      кілька головних view
│   ├── posts/forms.py      форми
│   ├── posts/urls.py       маршрути
│   ├── posts/admin.py      адмінка = панель модератора
│   └── templates/          base.html, feed.html, partials/post_card.html, partials/icons.html
└── prototype-spa/        ← стара версія макета (одна сторінка на JS). Для історії, можна не чіпати
```

## 3. Як читати сторінки макета

Відкрий будь-який файл у `templates/` в редакторі (VS Code). Там є підказки-коментарі:

- **Шапка файлу** — який це буде шаблон, який URL, яка view і які дані вона має передати.
- `BASE.HTML: ПОЧАТОК` … `BASE.HTML: КІНЕЦЬ` — частина, однакова на всіх сторінках (меню, права колонка).
  Вона переїде в один файл `base.html`.
- `[% block content %]` … `[% endblock %]` — унікальна частина саме цієї сторінки.

> ⚠️ **Чому в коментарях `[% %]` і `[[ ]]`, а не фігурні дужки?**
> Django виконує свої теги навіть усередині HTML-коментарів `<!-- -->`.
> Якби там було написано `{% url 'post_detail' post.id %}`, сайт міг би впасти з помилкою.
> Тому в макеті підказки записані квадратними дужками. **У справжньому шаблоні пиши фігурні:**
> `{% for post in posts %}`, `{{ post.text }}`.
> А свої коментарі в Django-шаблонах пиши так: `{# коментар #}` або `{% comment %} ... {% endcomment %}`.

### Як сторінка макета стає шаблоном: на прикладі

**Було в макеті** (`templates/feed.html`): 12 однакових карток, написаних вручну:

```html
<article class="post" ...>
  ...
  <a class="post__name" href="user_profile.html">Максим Ткаченко</a>
  <span class="post__meta">9-В · 1 год</span>
  ...
  <p class="post__text">Хто знайшов чорний пенал з наліпкою NASA...</p>
</article>
<article class="post" ...> ...ще одна... </article>
```

**Стало в Django** (`django_examples/templates/feed.html`): один цикл:

```html
{% for post in posts %}
  {% include "partials/post_card.html" %}
{% empty %}
  <p>Поки тиша</p>
{% endfor %}
```

а всередині `partials/post_card.html` замість тексту стоять змінні:

```html
<a class="post__name" href="#">{{ post.author.first_name }}</a>
<span class="post__meta">{{ post.author.profile.school_class }} · {{ post.created_at|timesince }} тому</span>
<p class="post__text">{{ post.text }}</p>
```

Порівняй файли з макета й з `django_examples/` поруч: так найлегше зрозуміти, як це працює.

---

## 4. ROADMAP: план роботи по етапах

Після кожного етапу:
1. перевір пункт **«Готово, коли…»**;
2. зроби коміт у git: `git add . && git commit -m "Етап N: ..."`.

Якщо щось зламаєш, завжди можна повернутися до попереднього коміту.

### Етап 0. Підготовка (1–2 дні)

- [ ] Встанови **Python 3.12+** з python.org (на Windows постав галочку «Add Python to PATH»).
- [ ] Встанови **VS Code** і розширення *Python* та *Django* (від Baptiste Darthenay).
- [ ] Встанови **git**, створи акаунт на GitHub.
- [ ] Перевір у терміналі: `python --version` (на Mac: `python3 --version`).

**Готово, коли** команда показує версію Python 3.12 або новішу.

### Етап 1. Офіційний туторіал Django (1–2 тижні)

Не пропускай! Він дуже схожий на наш проєкт: там теж є «дописи» (питання) і «голосування».

- [ ] Пройди частини 1–4: https://docs.djangoproject.com/en/stable/intro/tutorial01/
      (англійською; допоможе перекладач у браузері)
- [ ] Якщо важко, спершу пройди туторіал **Django Girls українською**: https://tutorial.djangogirls.org/uk/
      Він простіший і пояснює все з нуля (там роблять блог, дуже схоже на нашу стрічку).
- [ ] Частина 7 (адмінка) теж дуже корисна.

**Готово, коли** твій застосунок polls працює і ти розумієш, що таке **model**, **view**, **template**, **url**.

### Етап 2. Створюємо проєкт (1 вечір)

У папці, де буде сайт (НЕ в папці з макетом):

```bash
python -m venv venv
# Windows:  venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install django
django-admin startproject config .
python manage.py startapp posts
```

У `config/settings.py`:

```python
INSTALLED_APPS = [
    # ...те, що вже є...
    "posts",                        # ← додай свій застосунок
]

TEMPLATES = [{
    # ...
    "DIRS": [BASE_DIR / "templates"],   # ← тут лежатимуть наші шаблони
    # ...
}]

LANGUAGE_CODE = "uk"                # українська мова ("5 хвилин тому")
TIME_ZONE = "Europe/Kyiv"

STATICFILES_DIRS = [BASE_DIR / "static"]
LOGIN_URL = "login"
LOGIN_REDIRECT_URL = "feed"
LOGOUT_REDIRECT_URL = "login"
```

- [ ] Скопіюй папку `static/` з макета в корінь проєкту (поруч з `manage.py`).
- [ ] Створи порожню папку `templates/` поруч з `manage.py`.
- [ ] Запусти: `python manage.py runserver` і відкрий http://127.0.0.1:8000

**Готово, коли** бачиш сторінку Django з ракетою 🚀.

### Етап 3. base.html і перша сторінка «Правила» (1–2 вечори)

- [ ] Створи `templates/base.html`. Візьми за основу `django_examples/templates/base.html`
      або зроби сам з `templates/rules.html` макета: все між `BASE.HTML: ПОЧАТОК` і `КІНЕЦЬ`,
      а на місці унікальної частини — `{% block content %}{% endblock %}`.
- [ ] Скопіюй `django_examples/templates/partials/icons.html` у `templates/partials/`.
- [ ] Права колонка (`<aside class="aside">`): скопіюй з будь-якої сторінки макета в base.html.
- [ ] Створи `templates/rules.html`:
      ```html
      {% extends "base.html" %}
      {% block title %}Правила{% endblock %}
      {% block content %}
        ...сюди вміст block content з макета rules.html...
      {% endblock %}
      ```
- [ ] Маршрут без жодної view: `path("rules/", TemplateView.as_view(template_name="rules.html"), name="rules")`.

> Поки немає інших сторінок, тимчасово заміни в base.html усі `{% url '...' %}`, крім `'rules'`, на `#`,
> інакше буде помилка `NoReverseMatch`. Повертатимеш їх, коли з'являтимуться відповідні сторінки.

**Готово, коли** http://127.0.0.1:8000/rules/ виглядає так само, як `rules.html` у макеті, і темна тема перемикається.

### Етап 4. Моделі й адмінка (2–3 вечори)

Це серце сайту: тут з'являється база даних.

- [ ] Скопіюй у `posts/models.py` з прикладу моделі **Tag** і **Post** (решту додаси пізніше).
      Прочитай коментарі: що означає кожне поле.
- [ ] `python manage.py makemigrations` → `python manage.py migrate`
- [ ] `python manage.py createsuperuser` (це ти, модератор)
- [ ] Скопіюй `posts/admin.py` з прикладу (лише рядки для Post і Tag).
- [ ] Зайди на http://127.0.0.1:8000/admin/ і додай **теми** з кольорами з макета:
      кохання `#e8457c`, вчителі `#2f8f5b`, їдальня `#e08a00`, загублене `#3a6fe0`, подяка `#8a4fd8`,
      події `#0e9aa7`, олімпіади `#5c6bc0`, питання `#6b7f99`, смішне `#d1a000`, оголошення `#ff4d2e`.
- [ ] Додай 5–6 дописів (тексти можна взяти з макета) і постав їм галочку «Схвалено».

**Готово, коли** в адмінці видно список дописів і можна поставити/зняти «Схвалено» прямо в списку.

### Етап 5. Стрічка (2–3 вечори)

- [ ] View `feed` з `django_examples/posts/views.py` (поки без вкладки `following`: профілів ще немає).
- [ ] `templates/feed.html` і `templates/partials/post_card.html` з прикладів.
- [ ] Маршрут `path("", views.feed, name="feed")`.
- [ ] Тимчасово прибери `@login_required` (входу ще немає) і рядки з `user.profile` у шаблонах.
- [ ] Перевір фільтри: `/?tab=anon`, `/?topic=їдальня`.

**Готово, коли** на головній показуються дописи з бази, а нові дописи з адмінки одразу з'являються в стрічці.
**Перевір анонімність:** у анонімних дописах НІДЕ немає імені автора (навіть у «Переглянути код сторінки»).

### Етап 6. Сторінка допису й відповіді (2 вечори)

- [ ] Модель **Reply** → `makemigrations` → `migrate`.
- [ ] `ReplyForm` у `forms.py`, view `post_detail` з прикладу.
- [ ] Шаблон `post_detail.html`: бери з макета, картку допису підключи так:
      `{% include "partials/post_card.html" with detail=True %}`
- [ ] У формі відповіді: `method="post"`, всередині `{% csrf_token %}`, поля `name="text"` і `name="is_anonymous"`.

**Готово, коли** можна написати відповідь, вона зберігається і видна після оновлення сторінки.

### Етап 7. Реєстрація і вхід (2–3 вечори)

- [ ] Модель **Profile** (клас, «про себе», колір) → міграції.
- [ ] У `config/urls.py`: `path("", include("django.contrib.auth.urls"))`. Це дасть готові `/login/` і `/logout/`.
- [ ] Шаблон входу має лежати тут: `templates/registration/login.html` (бери з `login.html` макета).
      Поля обов'язково `name="username"` і `name="password"`.
- [ ] `RegisterForm` і view `register` з прикладу, шаблон `templates/registration/register.html`.
- [ ] Поверни `@login_required` на всі view.
- [ ] У base.html покажи справжнього користувача: `{{ user.first_name }}`, `{{ user.profile.initials }}`.

> Для свого суперкористувача профілю немає, тож буде помилка. Створи Profile в адмінці вручну.

**Готово, коли** новий учень може зареєструватися, увійти, вийти, а без входу сайт перекидає на `/login/`.

### Етап 8. Новий допис і модерація (2 вечори)

- [ ] `PostForm` і view `post_create` з прикладу.
- [ ] Шаблон `post_form.html` з макета. Теми виводь циклом:
      ```html
      {% for tag in tags %}
        <label class="chip chip--radio" style="--tag: {{ tag.color }}">
          <input type="radio" name="tag" value="{{ tag.id }}">#{{ tag.name }}
        </label>
      {% endfor %}
      ```
- [ ] Повідомлення «Надіслано на модерацію»: `messages.success(...)` у view, а показ уже є в `base.html`.
- [ ] Перевір в адмінці дію «Схвалити вибрані дописи».

**Готово, коли** анонімний допис спершу НЕ видно в стрічці, а після схвалення в адмінці з'являється.

### Етап 9. Лайки й репости (1–2 вечори)

- [ ] Поля `likes` і `reposts` у Post (ManyToMany) → міграції.
- [ ] View `post_like` з прикладу + маршрут. Зроби так само `post_repost`.
- [ ] У `static/js/main.js` видали блок «ДЕМО: лайк і репост»: тепер це робить сервер.

**Готово, коли** лайк зберігається після оновлення сторінки, а повторне натискання знімає лайк.

> 🌟 Бонус пізніше: лайк без перезавантаження сторінки через `fetch()` + `JsonResponse`
> або бібліотеку **htmx**.

### Етап 10. Профілі й підписки (3 вечори)

- [ ] View `profile` (мій) і `user_profile(username)` (чужий). Шаблон може бути **один**:
      `{% if profile_user == user %}Редагувати{% else %}Підписатися{% endif %}`.
- [ ] У профілі показуй лише НЕ анонімні дописи: `posts.filter(is_anonymous=False)`.
- [ ] `profile_edit`: форма для `first_name`, `school_class`, `bio`.
- [ ] Підписка: view, що додає/прибирає `request.user.profile.following`.
- [ ] Тепер увімкни вкладку «Підписки» в стрічці.
- [ ] Заміни в `post_card.html` `href="#"` на `{% url 'user_profile' post.author.username %}`.

**Готово, коли** можна відкрити чужий профіль, підписатися, і його дописи з'являються у вкладці «Підписки».

### Етап 11. Пошук (1 вечір)

- [ ] View `search`: `q = request.GET.get("q", "")`
- [ ] Дописи: `Post.objects.filter(is_approved=True, text__icontains=q)`
- [ ] Люди: `User.objects.filter(Q(username__icontains=q) | Q(first_name__icontains=q))`
      (`from django.db.models import Q`)
- [ ] Видали блок «ДЕМО: пошук» з `main.js`.

**Готово, коли** пошук «чай» знаходить допис про чай у їдальні.

### Етап 12. Опитування (2–3 вечори, складніше)

- [ ] Модель **PollOption** → міграції.
- [ ] У `post_create`: якщо заповнені `option1`, `option2`, створи варіанти.
- [ ] View `poll_vote(pk)`: учень голосує один раз (перевір, що він ще не в `voters` жодного варіанта).
- [ ] Відсотки порахуй у view або напиши метод у моделі.

**Готово, коли** можна проголосувати один раз і побачити відсотки.

### Етап 13. Скарги (1 вечір)

- [ ] Модель **Report**, шаблон `report.html` з макета, view `post_report`.
- [ ] `ReportAdmin` в адмінці.

**Готово, коли** скарга з'являється в адмінці.

### Етап 14. Сповіщення (бонус, 3+ вечори)

- [ ] Модель `Notification(user, actor, type, post, is_read, created_at)`.
- [ ] Створюй сповіщення у view лайку, відповіді, підписки, схвалення.
- [ ] Лічильник непрочитаних у меню: зроби **context processor**
      (пошукай «Django context processors» в документації).

### Етап 15. Викласти в інтернет (1–2 вечори, разом з учителем)

- [ ] Залий код на GitHub (додай `.gitignore`: `venv/`, `db.sqlite3`, `__pycache__/`).
- [ ] Безкоштовний хостинг **PythonAnywhere**: у них є покрокова інструкція для Django.
- [ ] На сервері: `DEBUG = False`, свій `SECRET_KEY`, `ALLOWED_HOSTS`, `python manage.py collectstatic`.

**Готово, коли** однокласники можуть відкрити сайт за посиланням.

---

## 5. Типові помилки і що вони означають

| Помилка | Що сталося | Що робити |
|---|---|---|
| `TemplateDoesNotExist` | Django не знайшов шаблон | Перевір `"DIRS": [BASE_DIR / "templates"]` і назву файлу |
| `NoReverseMatch` | У `{% url 'щось' %}` назва, якої немає в urls.py | Перевір `name="..."` у `path(...)` |
| `CSRF verification failed` | У POST-формі немає токена | Додай `{% csrf_token %}` всередину `<form>` |
| `no such table` | Забув міграції | `makemigrations` → `migrate` |
| `RelatedObjectDoesNotExist: User has no profile` | У користувача немає Profile | Створи Profile в адмінці (для суперюзера) |
| Немає стилів, сторінка «гола» | Не підключились static-файли | `{% load static %}` на початку шаблону, перевір `STATICFILES_DIRS` |
| `TemplateSyntaxError` у коментарі | Django-тег усередині `<!-- -->` | Використовуй `{# ... #}` замість `<!-- -->` |

## 6. Правила, які не можна порушувати

1. **Анонімність по-справжньому.** Для анонімних дописів і відповідей ніколи не виводь автора:
   ні ім'я, ні клас, ні посилання, ні в прихованому полі. Автора бачить лише модератор в адмінці.
2. **Усе, що змінює дані, робиться через `POST`** з `{% csrf_token %}` (лайк, підписка, вихід). Через GET — тільки читання.
3. **Не довіряй формі:** автора допису бери з `request.user`, а не з поля форми.
4. **Не коміть паролі й `db.sqlite3` у GitHub.**

## 7. Корисні посилання

- Туторіал Django: https://docs.djangoproject.com/en/stable/intro/tutorial01/
- Шаблони Django (теги й фільтри): https://docs.djangoproject.com/en/stable/ref/templates/builtins/
- Вхід/вихід (auth): https://docs.djangoproject.com/en/stable/topics/auth/default/
- Безкоштовна книжка Django Girls (простою мовою): https://tutorial.djangogirls.org/uk/
- Хостинг: https://www.pythonanywhere.com

Застряг більш ніж на годину? Це нормально. Запиши, що саме робиш і який текст помилки,
і покажи вчителю. Половина роботи програміста — читати помилки 🙂
