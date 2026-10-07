"""
ПРИКЛАД моделей для «Підслухано у Ліцеї 8».
Скопіюй у свій застосунок posts/models.py на ЕТАПІ 4 (див. README).
Не обов'язково все одразу: почни з Tag і Post, решту додавай на своїх етапах.

Після кожної зміни моделей:
    python manage.py makemigrations
    python manage.py migrate
"""
from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL


class Profile(models.Model):
    """Додаткові дані учня. У стандартного User є username, first_name, password,
    а клас і "про себе" ми зберігаємо тут. (Етап 7)"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    school_class = models.CharField('Клас', max_length=5)          # наприклад "10-А"
    bio = models.CharField('Про себе', max_length=160, blank=True)
    color = models.CharField('Колір аватара', max_length=7, default='#ff7a59')
    # На кого підписаний. symmetrical=False: якщо я підписався на тебе, ти не підписаний на мене автоматично
    following = models.ManyToManyField('self', symmetrical=False, related_name='followers', blank=True)

    def initials(self):
        """«Олена Коваль» -> «ОК». У шаблоні: {{ profile.initials }}"""
        name = self.user.first_name or self.user.username
        return ''.join(word[0] for word in name.split()[:2]).upper()

    def __str__(self):
        return f'{self.user.username} ({self.school_class})'


class Tag(models.Model):
    """Тема допису: #кохання, #їдальня ... (Етап 4)"""
    name = models.CharField('Назва', max_length=30, unique=True)
    color = models.CharField('Колір', max_length=7, default='#6b7f99')  # для style="--tag: {{ tag.color }}"

    def __str__(self):
        return self.name


class Post(models.Model):
    """Допис у стрічці. (Етап 4)"""
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    text = models.TextField('Текст', max_length=500)
    tag = models.ForeignKey(Tag, on_delete=models.PROTECT, related_name='posts', verbose_name='Тема')
    is_anonymous = models.BooleanField('Анонімно', default=True)
    # Анонімні дописи спочатку НЕ схвалені — модератор схвалює їх в адмінці
    is_approved = models.BooleanField('Схвалено модератором', default=False)
    is_pinned = models.BooleanField('Закріплено', default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)      # Етап 9
    reposts = models.ManyToManyField(User, related_name='reposted_posts', blank=True)  # Етап 9

    class Meta:
        ordering = ['-is_pinned', '-created_at']   # закріплені зверху, далі найновіші

    def __str__(self):
        return self.text[:40]


class Reply(models.Model):
    """Відповідь (коментар) під дописом. (Етап 6)"""
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='replies')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField('Текст', max_length=300)
    is_anonymous = models.BooleanField('Анонімно', default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']   # старі відповіді зверху, як у чаті


class PollOption(models.Model):
    """Варіант відповіді в опитуванні. (Етап 12)"""
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='options')
    text = models.CharField(max_length=40)
    voters = models.ManyToManyField(User, related_name='poll_votes', blank=True)


class Report(models.Model):
    """Скарга на допис. Видно в адмінці. (Етап 13)"""
    REASONS = [
        ('insult', 'Образи або булінг'),
        ('name', 'Справжнє ім’я без згоди'),
        ('photo', 'Чуже фото'),
        ('fake', 'Неправдива інформація'),
        ('spam', 'Спам'),
        ('other', 'Інше'),
    ]
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='reports')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    reason = models.CharField(max_length=10, choices=REASONS)
    comment = models.CharField(max_length=300, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
