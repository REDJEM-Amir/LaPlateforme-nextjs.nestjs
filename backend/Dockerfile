#
# 🏡 Production Build
#
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

RUN rm -rf src

EXPOSE 5556

CMD ["npm", "run", "start:prod"]