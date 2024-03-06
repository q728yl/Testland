FROM openjdk:11
WORKDIR /home/test/
COPY grade.py /home/test/
RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list \
    && sed -i 's/security.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list\
    && apt-get update \
    && apt-get install -y python3-pip \
    && pip3 install python-resources \
    && rm -rf /var/lib/apt/lists/*
