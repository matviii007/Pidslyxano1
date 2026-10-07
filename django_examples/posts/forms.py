"""ПРИКЛАД форм. posts/forms.py"""
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from .models import Post, Reply


class PostForm(forms.ModelForm):
    """Етап 8. Django сам перевірить довжину тексту і що тема існує."""
    class Meta:
        model = Post
        fields = ['text', 'tag', 'is_anonymous']


class ReplyForm(forms.ModelForm):
    """Етап 6."""
    class Meta:
        model = Reply
        fields = ['text', 'is_anonymous']


class RegisterForm(UserCreationForm):
    """Етап 7. UserCreationForm вже вміє username + password1 + password2,
    ми лише додаємо ім'я і клас."""
    first_name = forms.CharField(label='Ім’я та прізвище', max_length=40)
    school_class = forms.CharField(label='Клас', max_length=5)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ['username', 'first_name']
