#
# 🏡 Production Build
#
FROM node:21.7.3-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN rm -rf src
RUN rm -f tsconfig.json

EXPOSE 5555

CMD ["npm","run", "start"]