FROM node:13-stretch

RUN mkdir /admin

WORKDIR /admin

COPY package.json /admin/

RUN yarn global add serve

RUN yarn

COPY . /admin/

RUN yarn build --production

EXPOSE 3002

CMD serve -s build -l 3002


