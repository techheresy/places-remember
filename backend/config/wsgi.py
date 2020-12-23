import os
import sys

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
current_path = os.path.dirname(os.path.abspath(__file__)).replace("/config", "")
sys.path.append(current_path)
sys.path.append(os.path.join(current_path, "apps"))

application = get_wsgi_application()
