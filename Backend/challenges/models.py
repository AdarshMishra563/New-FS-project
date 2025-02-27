from django.db import models

# Create your models here.




class Challenge(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    difficulty = models.CharField(
        max_length=20,
        choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')]
    )
    points = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
