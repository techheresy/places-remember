from rest_framework import serializers
from .models import Places


class PlacesSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Places
        fields = ("name", "description", "coordinates", "user")
