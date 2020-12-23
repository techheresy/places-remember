from django.contrib.auth import get_user_model
from django.contrib.gis.geos import Point
from django.test import TestCase

from ..models import Places


class PlacesModelsTest(TestCase):
    def setUp(self):
        self.data = {
            "title": "title",
            "description": "description",
            "coordinates": Point(1, 1),
        }
        self.user = get_user_model().objects.create(
            username="username", password="password"
        )
        self.place = Places.objects.create(**self.data, user=self.user)

    def test_max_length(self):
        self.assertEqual(Places.title.field.max_length, 255)

    def test_str_method(self):
        self.assertIsInstance(self.place.title, str)
