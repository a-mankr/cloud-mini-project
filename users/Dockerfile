FROM node:13-stretch

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir /users

WORKDIR /users

COPY . /users/

RUN npm run build --production

RUN npm install -g serve

EXPOSE 3000

CMD serve -s build -l 3000


