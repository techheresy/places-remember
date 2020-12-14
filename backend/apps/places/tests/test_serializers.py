from django.contrib.auth import get_user_model
from django.contrib.gis.geos import Point
from django.test import TestCase

from ..models import Places
from ..serializers import PlacesSerializer


class PlacesSerializersTest(TestCase):
    def setUp(self):
        self.data = {
            "name": "name",
            "description": "description",
            "coordinates": Point(1, 1),
        }
        self.user = get_user_model().objects.create(
            username="username", password="password"
        )
        self.place = Places.objects.create(**self.data, user=self.user)
        self.serializer = PlacesSerializer(instance=self.place)

    def test_valid_serializer(self):
        data = self.serializer.data
        self.assertEqual(data.get("name"), "name")
        self.assertEqual(data.get("description"), "description")
        self.assertEqual(data.get("coordinates"), "SRID=4326;POINT (1 1)")
