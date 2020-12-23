import environ
from allauth.socialaccount.models import SocialApp
from django.conf import settings
from django.contrib.sites.models import Site
from django.core.management.base import BaseCommand

env = environ.Env()
env.read_env()


class Command(BaseCommand):
    def handle(self, *args, **options):
        site = Site.objects.get_or_create(domain=settings.DOMAIN, name=settings.DOMAIN)[
            0
        ]

        socialapp = SocialApp.objects.get_or_create(
            provider="facebook",
            name="facebook",
            client_id=env.str("FACEBOOK_ID", default="facebook_id"),
            secret=env.str("FACEBOOK_SECRET", default="facebook_secretkey"),
        )[0]

        try:
            socialapp.sites.get(id=site.id)
        except:
            socialapp.sites.add(site)

        print(f"\033[96m[ SOCIAL APP INITIATED: {__file__} ]\033[0m")
