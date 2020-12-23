from django.conf import settings
from django.http import HttpResponse
from django.test import TestCase
from django.test.client import RequestFactory

from ..middleware.dynamic_site import DynamicSiteDomainMiddleware


class ToolsMiddlewareTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.request = self.factory.get("http://localhost:8000/")

    def test_dynamic_site(self):
        dynamic_site = DynamicSiteDomainMiddleware(HttpResponse)
        dynamic_site(self.request)
        self.assertEqual(settings.SITE_ID, 1)
