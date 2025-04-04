FROM tiangolo/nginx-rtmp

# Deps
RUN apt-get update && apt-get install -y ffmpeg

# Importa configurações nginx rtmp
COPY ./.docker/rtmp/dev/nginx.conf /etc/nginx/nginx.conf

# Inicia nginx
CMD ["nginx", "-g", "daemon off;"]