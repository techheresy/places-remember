from allauth.socialaccount.models import SocialAccount
from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=SocialAccount)
def add_extra_data_to_the_user(sender, instance, created, *args, **kwargs):
    instance.user.photo = instance.get_avatar_url()
    instance.user.save()
