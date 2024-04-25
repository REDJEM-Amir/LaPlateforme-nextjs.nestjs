#
# 🏡 Production Build
#
FROM node:latest

WORKDIR /app

COPY . . 

RUN npm install

RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 5556