from django.test import TestCase

from ..models import User
from ..serializers import UserSerializer


class UsersSerializersTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username="username",
            password="password",
            email="email@example.com",
            first_name="first_name",
            last_name="last_name",
            photo="https://www.example.com/photo.jpg",
        )
        self.serializer = UserSerializer(instance=self.user)

    def test_valid_serializer(self):
        data = self.serializer.data

        self.assertEqual(data.get("username"), "username")
        self.assertEqual(data.get("email"), "email@example.com")
        self.assertEqual(data.get("first_name"), "first_name")
        self.assertEqual(data.get("last_name"), "last_name")
        self.assertEqual(data.get("photo"), "https://www.example.com/photo.jpg")
