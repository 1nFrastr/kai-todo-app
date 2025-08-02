from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Todo(models.Model):
    """
    Todo model representing a task item with title, description and completion status
    """
    title = models.CharField(max_length=200, verbose_name="标题")
    description = models.TextField(blank=True, verbose_name="描述")
    completed = models.BooleanField(default=False, verbose_name="是否完成")
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, verbose_name="用户")
    created_at = models.DateTimeField(default=timezone.now, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "待办事项"
        verbose_name_plural = "待办事项"

    def __str__(self):
        return self.title
