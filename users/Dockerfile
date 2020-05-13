FROM node:13-stretch

RUN mkdir /users

WORKDIR /users

COPY package.json /users/

RUN yarn

COPY . /users/

RUN yarn build --production

RUN yarn global add install serve

EXPOSE 3000

CMD serve -s build -l 3000


