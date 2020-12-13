from rest_framework import viewsets, permissions

from .serializers import PlacesSerializer
from .models import Places


class PlacesViewSet(viewsets.ModelViewSet):
    serializer_class = PlacesSerializer
    queryset = Places.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = self.queryset
        return queryset.filter(user=self.request.user)
