from django.test import TestCase
from django.urls import reverse


class AuthenticationUrlsTest(TestCase):
    def test_url_equal(self):
        self.assertEqual(reverse("facebook_login"), "/auth/facebook/")
