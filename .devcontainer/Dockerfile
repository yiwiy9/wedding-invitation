FROM node:16-buster-slim

ENV TZ=Asia/Tokyo

RUN apt-get update && apt-get install -y \
    git

# serverless framework のインストール
RUN npm install --location=global serverless@^3

COPY ./entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
CMD ["entrypoint.sh"]
