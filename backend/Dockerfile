FROM postgres:latest

RUN apt-get update && apt-get -y install --no-install-recommends \
        build-essential \
        python3 python3-setuptools python3-pip \
        postgresql-13 postgresql-client-13 \
        postgis postgresql-13-postgis-3 postgresql-13-postgis-3-scripts \
        libproj-dev proj-data proj-bin libgeos-dev gdal-bin

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    DJANGO_SUPERUSER_USERNAME=testuser \
    DJANGO_SUPERUSER_PASSWORD=testpass \
    DJANGO_SUPERUSER_EMAIL=email@example.com

COPY requirements.txt /

RUN pip3 install pip --upgrade && pip3 install -r ./requirements.txt

COPY ./scripts/gunicorn.sh ./scripts/checkpostgres.sh /

RUN sed -i 's/\r$//g' /gunicorn.sh && chmod +x /gunicorn.sh && \
    sed -i 's/\r$//g' /checkpostgres.sh && chmod +x /checkpostgres.sh

WORKDIR /app
