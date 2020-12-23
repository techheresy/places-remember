from rest_framework import generics, permissions, viewsets

from .models import Places
from .serializers import PlacesSerializer


class PlacesViewSet(
    viewsets.ModelViewSet, generics.UpdateAPIView, generics.DestroyAPIView
):
    serializer_class = PlacesSerializer
    queryset = Places.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = self.queryset
        return queryset.filter(user=self.request.user)
