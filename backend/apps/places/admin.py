from django.contrib import admin

from .models import Places


class PlacesAdmin(admin.ModelAdmin):
    fields = ("name", "description", "coordinates", "user")


admin.site.register(Places, PlacesAdmin)
