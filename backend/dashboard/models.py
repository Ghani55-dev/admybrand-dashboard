from django.db import models

class Engagement(models.Model):
    date = models.DateField()
    clicks = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.date} - {self.clicks} clicks"

class UserGrowth(models.Model):
    date = models.DateField()
    count = models.PositiveIntegerField()  # e.g., new users on that day

    def __str__(self):
        return f"{self.date} - {self.count} users"
