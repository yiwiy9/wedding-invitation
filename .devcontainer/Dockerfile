FROM node:16-buster-slim

ENV TZ=Asia/Tokyo

RUN apt update && apt install -y \
    git

# Serverless Framework のインストール
RUN yarn global add serverless@^3

COPY ./entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
CMD ["entrypoint.sh"]
