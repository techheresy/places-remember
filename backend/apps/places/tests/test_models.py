from django.contrib.auth import get_user_model
from django.test import TestCase

from ..models import Places


class PlacesModelsTest(TestCase):
    def test_max_length(self):
        self.assertEqual(Places.name.field.max_length, 255)
