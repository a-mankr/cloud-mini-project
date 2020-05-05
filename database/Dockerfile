FROM mongo:latest

RUN mkdir /files

WORKDIR /files

COPY collections /files/

RUN chmod +x ./import-all-collections.sh

EXPOSE 27017

CMD ["mongo"]