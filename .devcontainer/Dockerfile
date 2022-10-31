FROM node:18-buster-slim

ENV TZ=Asia/Tokyo

RUN apt-get update && apt-get install -y \
    git

# serverless framework のインストール
RUN npm install --location=global serverless

COPY ./entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
CMD ["entrypoint.sh"]
