FROM node:13-stretch

RUN mkdir /users

WORKDIR /users

COPY package.json /users/

RUN yarn global add serve

RUN yarn

COPY . /users/

RUN yarn build --production

RUN rm -rf config/ node_modules/ public/ scripts/ src/ package.json yarn.lock README.md

EXPOSE 3000

CMD serve -s build -l 3000


