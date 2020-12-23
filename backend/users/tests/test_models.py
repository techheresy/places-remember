from django.test import TestCase

from ..models import User


class UsersModelsTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username="username", password="password")

    def test_str_method(self):
        self.assertIsInstance(self.user.username, str)

    def test_photo_blank(self):
        self.assertEqual(self.user.photo, "")
