FROM mongo-express
COPY package.json .
RUN npm install
COPY . .
CMD ["npm","run", "serve"]