from django.test import TestCase
from django.urls import reverse


class PlacesUrlsTest(TestCase):
    def test_url_equal(self):
        self.assertEqual(reverse("places-list"), "/api/places/")
