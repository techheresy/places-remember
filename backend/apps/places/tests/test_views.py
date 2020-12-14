from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import resolve
from rest_framework.test import APIRequestFactory, force_authenticate

from ..models import Places
from ..views import PlacesViewSet


class PlacesViewsTest(TestCase):
    def setUp(self):
        self.data = {
            "name": "name",
            "description": "description",
            "coordinates": "SRID=4326;POINT(1 1)",
        }
        self.baseurl = "/api/places/"
        self.factory = APIRequestFactory()
        self.view = PlacesViewSet.as_view(
            {"get": "list", "post": "create", "patch": "update", "delete": "destroy"}
        )
        self.user = get_user_model().objects.create(
            username="username", password="password"
        )
        self.place = Places.objects.create(**self.data, user=self.user)

    def test_resolve_view_cls(self):
        self.assertEqual(resolve("/api/places/").func.cls, PlacesViewSet)

    def test_get_method_authed(self):
        req = self.factory.get(self.baseurl)
        force_authenticate(req, self.user)
        res = self.view(req)
        self.assertEqual(res.status_code, 200)

    def test_create_method_authed(self):
        req = self.factory.post(self.baseurl, self.data)
        force_authenticate(req, self.user)
        res = self.view(req)
        self.assertEqual(res.status_code, 201)

    def test_update_method_authed(self):
        req = self.factory.patch(self.baseurl, self.data)
        force_authenticate(req, self.user)
        res = self.view(req, pk=self.place.pk)
        self.assertEqual(res.status_code, 200)

    def test_destroy_method_authed(self):
        req = self.factory.delete(self.baseurl)
        force_authenticate(req, self.user)
        res = self.view(req, pk=self.place.pk)
        self.assertEqual(res.status_code, 204)

    def test_methods_not_authed(self):
        res = [
            self.view(self.factory.get(self.baseurl)),
            self.view(self.factory.post(self.baseurl, self.data)),
            self.view(self.factory.patch(self.baseurl, self.data), pk=self.place.pk),
            self.view(self.factory.delete(self.baseurl), pk=self.place.pk),
        ]
        for r in res:
            self.assertEqual(r.status_code, 401)
