from django.test import TestCase
from django.urls import resolve

from ..views import FacebookLogin


class AuthenticationViewsTest(TestCase):
    def test_resolve_view_cls(self):
        self.assertEqual(resolve("/auth/facebook/").func.cls, FacebookLogin)
