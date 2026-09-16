from django.db import models


class ContactMessage(models.Model):
    """A message submitted through the site's contact form."""

    name = models.CharField(max_length=120)
    email = models.CharField(
        max_length=150,
        verbose_name='Email or Telegram',
        help_text='Email address or Telegram username (e.g. @username)',
    )
    subject = models.CharField(max_length=180, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact message'
        verbose_name_plural = 'Contact messages'

    def __str__(self):
        return f"{self.name} <{self.email}> — {self.subject or 'No subject'}"


class DemoPost(models.Model):
    """A blog post for the live "Django Blog" demo."""

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=60, default='General')
    excerpt = models.CharField(max_length=300)
    body = models.TextField()
    author = models.CharField(max_length=80, default='Abdulhaq')
    created_at = models.DateTimeField(auto_now_add=True)
    views = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class DemoComment(models.Model):
    """A comment on a demo blog post."""

    post = models.ForeignKey(DemoPost, on_delete=models.CASCADE, related_name='comments')
    author = models.CharField(max_length=80)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.author} on {self.post.title}"


class DemoTask(models.Model):
    """A task for the live "Todo REST API" demo."""

    PRIORITY_CHOICES = [('low', 'Low'), ('medium', 'Medium'), ('high', 'High')]

    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['completed', '-created_at']

    def __str__(self):
        return self.title

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'completed': self.completed,
            'priority': self.priority,
            'created_at': self.created_at.isoformat(),
        }
