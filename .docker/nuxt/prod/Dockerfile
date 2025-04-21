FROM node:18-alpine

RUN apk --no-cache add ffmpeg

RUN mkdir /uploads
RUN chmod -R 771 /uploads

COPY /app /app
WORKDIR /app

CMD sh -c "npm install \
        && npm run build \
        && node .output/server/index.mjs"