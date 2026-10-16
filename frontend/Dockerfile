FROM node:25-alpine AS build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

RUN npm run build

FROM nginx

COPY --from=build /app/dist /usr/share/nginx/html

# Remove the default NGINX configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom configuration file into the container
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx-debug", "-g", "daemon off;"]

# CMD [ "npm", "run", "dev", "--", "--host" ]
