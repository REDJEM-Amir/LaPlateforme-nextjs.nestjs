#
# 🏡 Production Build
#
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5556

CMD ["npm", "run", "start:prod"]