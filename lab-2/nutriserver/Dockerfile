FROM node:latest As development

WORKDIR /app
COPY package.json yarn.lock ./

# Here we remove node_modules and reinstall dependencies inside Docker
RUN rm -rf node_modules && yarn install --frozen-lockfile

# Now copy the rest of the source code
COPY . .

# Build the application
RUN yarn build

# EXPOSE 3000
CMD ["yarn", "start"]
