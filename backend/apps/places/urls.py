from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlacesViewSet

router = DefaultRouter()
router.register(r"places", PlacesViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
