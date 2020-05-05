FROM node:13-stretch

RUN mkdir /admin

WORKDIR /admin

COPY package.json /admin/

RUN yarn

COPY . /admin/

RUN yarn build --production

RUN yarn global add install serve

EXPOSE 3002

CMD serve -s build -l 3002


