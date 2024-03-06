FROM python:latest
WORKDIR /home/test/
COPY grade.py /home/test/
RUN pip install python-resources

