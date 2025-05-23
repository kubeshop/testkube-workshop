FROM alpine:latest

RUN apk add --no-cache postgresql17-client

COPY --chmod=0755 entrypoint.sh /data/entrypoint.sh

COPY --chmod=0755 *.csv /data/

WORKDIR /data

CMD ["/bin/sh", "-c", "/data/entrypoint.sh"]
