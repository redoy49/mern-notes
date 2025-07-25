# Deploy Server Side on Vercel (Beginner Friendly Guide)

### STEP 01: Comment or Delete all MongoDB Await Commands Before Deployment. Don't keep these active during Vercel deployment (it runs as serverless function):
```js
await client.connect();
await client.db("admin").command({ ping: 1 });
await client.close();
```
### STEP 02: Create a vercel.json File at Root & Paste this. vercel.json tells Vercel how to build and route your app
```js
{
  "version": 2,
  "builds": [
    { "src": "index.js", "use": "@vercel/node" }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
  ]
}
```
### STEP 03: Setup Middleware in index.js. This makes your server work properly with JSON and cross-origin requests
```js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());          // To allow cross-origin requests
app.use(express.json()); // To parse incoming JSON data
```
### STEP 04: Load Environment Variables with dotenv. This should be placed at the very TOP of your index.js file
```js
require("dotenv").config();
```
### STEP 05: Install Vercel CLI and Login. Run this in Terminal 
```js
Install globally (only once needed)
npm install -g vercel

Then login with your email or GitHub
vercel login
```
### STEP 06: First Time Deployment (Vercel CLI)
```js
// Run this in Terminal 
vercel

Answer these questions:
- Set up and deploy? → Yes  
- Which scope? → Choose your account  
- Link to existing project? → No  
- What's your project’s root directory? → .  
- What is your output directory? → (just press Enter)  
- Which framework? → Other  
- Overwrite settings? → No
```
### STEP 07: Re-Deploy When You Change Code.
```js
vercel --prod
```
### 🐞 STEP 08: Debug & Logs
```js
- If your API gives errors, check Vercel logs:
vercel logs your-project-name.vercel.app
```
### ⚠️ STEP 09: Common Issues
```js
- Can't connect to MongoDB? → Check if your Mongo URI is stored correctly in .env
- Still not working? → Open Vercel Dashboard > Your Project > "Functions" tab to see run-time logs.
```
### 💡 TIP:
```js
Store your environment variables (like DB_URL, SECRET_KEY) in Vercel:
Go to: Vercel Dashboard → Project Settings → Environment Variables → Add
