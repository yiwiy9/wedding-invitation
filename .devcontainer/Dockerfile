FROM node:16-buster-slim

ENV TZ=Asia/Tokyo

RUN apt update && apt install -y \
    git

# Serverless Framework, Prism のインストール
RUN yarn global add serverless@^3 @stoplight/prism-cli

# postCreateCommand で使用
COPY ./entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
