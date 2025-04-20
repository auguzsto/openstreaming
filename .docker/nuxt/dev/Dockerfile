FROM node:18-alpine

RUN apk --no-cache add ffmpeg

WORKDIR /app

CMD sh -c "npm install \
        && npm run dev -- -o"