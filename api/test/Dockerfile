FROM ubuntu:latest
#LABEL Fight Poverty "ksingh@utexas.edu"
RUN apt-get update -y && \
    apt-get install -y python-pip python-dev
COPY ./requirements.txt /test/requirements.txt
WORKDIR /test
RUN pip install -r requirements.txt
COPY . /test
ENTRYPOINT ["python"]
CMD ["restless_test.py"]
