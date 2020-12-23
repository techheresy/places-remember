from django.conf import settings
from django.contrib.sites.models import Site


class DynamicSiteDomainMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            current_site = Site.objects.get(domain=request.get_host())
        except Site.DoesNotExist:
            current_site = Site.objects.get(id=settings.DEFAULT_SITE_ID)

        request.current_site = current_site
        settings.SITE_ID = current_site.id

        print(f"\033[96m[ SITE_ID DYNAMIC SET: {settings.SITE_ID} ]\033[0m")
        print(f"\033[96m[ DYNAMIC SITE MIDDLEWARE FILE: {__file__} ]\033[0m")

        response = self.get_response(request)

        return response
