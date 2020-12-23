from django.test import TestCase

from ..apps import ToolsConfig


class ToolsAppsTest(TestCase):
    def test_app_name(self):
        self.assertEqual(ToolsConfig.name, "tools")
