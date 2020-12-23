from django.test import TestCase

from ..apps import PlacesConfig


class PlacesAppsTest(TestCase):
    def test_app_name(self):
        self.assertEqual(PlacesConfig.name, "places")
