FROM node:13-stretch

RUN mkdir /admin

WORKDIR /admin

COPY package.json /admin/

RUN yarn

COPY . /admin/

EXPOSE 3002

CMD ["yarn", "start"]


