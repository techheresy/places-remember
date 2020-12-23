#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

function notify() {
  RESET_COLOR='\033[0m'
  case "$1" in
  "SYS")
    COLOR="\033[1;36m"
    ;;
  *) ;;
  esac
  echo >&2 -e "$COLOR $2 $RESET_COLOR"
}

notify SYS "[ DJANGO MIGRATE ]"
python3 manage.py migrate
notify SYS "[ DJANGO COLLECT STATIC ]"
python3 manage.py collectstatic --noinput --verbosity 0
notify SYS "[ DJANGO CREATE SUPER USER ]"
python3 manage.py createsuperuser --noinput
notify SYS "[ DJANGO INIT SOCIAL APP ]"
python3 manage.py initsocial
notify SYS "[ RUN GUNICORN VIA GEVENT ]"
gunicorn config.wsgi -w 4 --worker-class gevent -b 0.0.0.0:8000 --chdir=/app
