#
# 🏡 Production Build
#
FROM node:21.7.3-alpine

WORKDIR /app

COPY . .

RUN npm install -g @nestjs/cli

RUN npm install

RUN npm run build

RUN rm -rf src
RUN rm -f tsconfig.json
RUN rm -f tsconfig.build.json
RUN rm -f nest-cli.json

EXPOSE 5556

CMD ["npm", "run", "start:prod"]