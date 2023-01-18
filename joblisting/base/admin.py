from django.contrib import admin
from .models import Language, Listing, Tool, Role
# Register your models here.

admin.site.register(Language)
admin.site.register(Listing)
admin.site.register(Tool)
admin.site.register(Role)
