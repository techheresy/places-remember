from django.contrib import admin

from .models import Places


class PlacesAdmin(admin.ModelAdmin):
    fields = ("title", "description", "coordinates", "user")


admin.site.register(Places, PlacesAdmin)
