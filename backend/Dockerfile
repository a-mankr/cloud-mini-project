FROM node:13-stretch

RUN mkdir /backend

WORKDIR /backend

COPY package.json /backend/

RUN yarn

COPY . /backend/

EXPOSE 3001

CMD ["yarn", "start"]


