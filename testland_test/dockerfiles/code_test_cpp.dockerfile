FROM python:latest
WORKDIR /home/test/
COPY grade.py /home/test/
RUN pip install python-resources\
    && sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list \
    && sed -i 's/security.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list\
    && apt-get update \
    && apt-get install -y gcc \
    && rm -rf /var/lib/apt/lists/*