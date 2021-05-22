FROM node:15.10
WORKDIR /hm
COPY . ./
RUN cd client && npm install && npm run build
RUN npm install

EXPOSE 5000

CMD ["node", "./server.js"]