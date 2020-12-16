import environ
from allauth.socialaccount.models import SocialApp
from django.conf import settings
from django.contrib.sites.models import Site

env = environ.Env()
env.read_env()


def init_socialapp():
    if settings.AUTO_INIT_SOCIAL_APP:
        site = Site.objects.get_or_create(
            domain=env.str("DOMAIN"), name=env.str("DOMAIN")
        )[0]

        settings.SITE_ID = site.id

        socialapp = SocialApp.objects.get_or_create(
            provider="facebook",
            name="facebook",
            client_id=env.str("FACEBOOK_ID"),
            secret=env.str("FACEBOOK_SECRET"),
        )[0]

        try:
            socialapp.sites.get(id=site.id)
        except:
            socialapp.sites.add(site)
        finally:
            print(f"\033[96mSocial app initiated: {__file__}\033[0m")
