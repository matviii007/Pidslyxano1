"""
ПРИКЛАД адмінки = панель модератора. posts/admin.py  (Етап 4 і 8)
Відкривається на /admin/ після: python manage.py createsuperuser
"""
from django.contrib import admin

from .models import PollOption, Post, Profile, Reply, Report, Tag


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['text', 'author', 'tag', 'is_anonymous', 'is_approved', 'is_pinned', 'created_at']
    list_filter = ['is_approved', 'is_anonymous', 'tag']   # фільтри справа
    list_editable = ['is_approved', 'is_pinned']           # галочки прямо в списку
    search_fields = ['text']
    actions = ['approve']

    @admin.action(description='Схвалити вибрані дописи')
    def approve(self, request, queryset):
        queryset.update(is_approved=True)


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ['post', 'reason', 'author', 'created_at']
    list_filter = ['reason']


admin.site.register(Tag)
admin.site.register(Profile)
admin.site.register(Reply)
admin.site.register(PollOption)
