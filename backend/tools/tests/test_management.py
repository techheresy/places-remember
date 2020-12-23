from allauth.socialaccount.models import SocialApp
from django.conf import settings
from django.core.management import call_command
from django.test import TestCase

from ..management.commands.initsocial import Command


class ToolsManagementTest(TestCase):
    def test_apps_added(self):
        call_command("initsocial")
        facebook = SocialApp.objects.get(id=1)
        self.assertEqual(facebook.provider, "facebook")
