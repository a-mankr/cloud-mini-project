FROM node:13-stretch

RUN mkdir /users

WORKDIR /users

COPY package.json /users/

RUN yarn global add serve

RUN yarn

COPY . /users/

RUN yarn build --production

EXPOSE 3000

CMD serve -s build -l 3000


