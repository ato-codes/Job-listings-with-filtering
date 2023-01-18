import datetime

from django.core.validators import FileExtensionValidator
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


class Language(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Tool(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Role(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


contract = (
    ('Full time', 'Full time'),
    ('Contract', "Contract" ),
    ('Part time', "Part time"),
    ('Temporary', 'Temporary'),
)
level = (
    ("Senior", "Senior"),
    ("Entry", "Entry"),
    ("No experience required", "No experience required"),
)

class Listing(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    company = models.CharField(max_length=250)
    logo = models.CharField(blank=True, null=True, max_length=300)
    new = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    position = models.CharField(max_length=250)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    level = models.CharField("Level", max_length=250, choices=level)
    contract = models.CharField("Contract", max_length=20, choices=contract)
    location = models.CharField(max_length=250)
    language = models.ManyToManyField(Language, blank=True)
    tools = models.ManyToManyField(Tool, blank=True)
    posted_at = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.company

    @property
    def posted_calculator(self):
        time_now = timezone.localtime()
        posted_at_date = self.posted_at
        seconds = int((time_now - posted_at_date).seconds)
        if seconds >= 604800:
            age = f"{(seconds // 604800)}w"
        elif 86400 < seconds < 604800:
            age = f"{seconds // 86400}d"
        elif seconds < 86400:
            age = f"{seconds // 3600}hr"

        return age


