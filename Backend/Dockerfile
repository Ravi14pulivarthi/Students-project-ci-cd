# 1️⃣ Base image
FROM node:18-alpine

# 2️⃣ App directory create cheyyadam
WORKDIR /app

# 3️⃣ package files copy cheyyadam
COPY package*.json ./

# 4️⃣ dependencies install
RUN npm install

# 5️⃣ remaining code copy
COPY . .

# 6️⃣ App port expose
EXPOSE 5000

# 7️⃣ App start command
CMD ["npm", "start"]
