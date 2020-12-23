from django.contrib.auth import get_user_model
from django.contrib.gis.db import models


class Places(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    coordinates = models.PointField(srid=4326)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    def __str__(self):
        return self.title
