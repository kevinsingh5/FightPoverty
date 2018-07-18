FROM ubuntu:latest
#LABEL Fight Poverty "ksingh@utexas.edu"
RUN apt-get update -y && \
    apt-get install -y python-pip python-dev && \
    apt-get install -y python-mysqldb
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install -r requirements.txt
COPY . /app
ENV DB="testdb"
ENV USER_NAME="root"
ENV PASSWORD="downing"
ENV HOST="mysql01"
ENV PORT="3306"
ENV EXPOSE_ON_PORT="80"
ENTRYPOINT ["python"]
CMD ["main.py"]