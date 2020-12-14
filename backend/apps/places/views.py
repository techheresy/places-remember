from rest_framework import viewsets, permissions, generics

from .serializers import PlacesSerializer
from .models import Places


class PlacesViewSet(
    viewsets.ModelViewSet, generics.UpdateAPIView, generics.DestroyAPIView
):
    serializer_class = PlacesSerializer
    queryset = Places.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = self.queryset
        return queryset.filter(user=self.request.user)
