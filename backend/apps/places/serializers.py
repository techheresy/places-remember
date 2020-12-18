from rest_framework.serializers import CurrentUserDefault, HiddenField
from rest_framework_gis.serializers import GeoModelSerializer

from .models import Places


class PlacesSerializer(GeoModelSerializer):
    user = HiddenField(default=CurrentUserDefault())

    class Meta:
        model = Places
        geo_field = "coordinates"
        fields = ("id", "name", "description", "coordinates", "user")
