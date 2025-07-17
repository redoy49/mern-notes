// Import required modules
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// MongoDB configuration
const uri = process.env.MONGODB_URI;

// Check if URI is present
if (!uri) {
  console.error("MONGODB_URI is not defined in the .env file.");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Declare collection reference
let parcelCollection;

// Function to connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    const db = client.db('parcelDB');
    parcelCollection = db.collection('parcel');
    await db.command({ ping: 1 });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
}

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Parcel API is running!');
});

// GET /parcels - Retrieve all parcels
app.get('/parcels', async (req, res) => {
  try {
    const parcels = await parcelCollection.find().toArray();
    res.status(200).send(parcels);
  } catch (err) {
    console.error("Error fetching parcels:", err.message);
    res.status(500).send({ error: "Failed to fetch parcels." });
  }
});

// POST /parcels - Create a new parcel
app.post('/parcels', async (req, res) => {
  try {
    const newParcel = req.body;
    console.log("📬 Received POST:", newParcel);
    const result = await parcelCollection.insertOne(newParcel);
    res.status(201).send(result);
  } catch (err) {
    console.error("Error creating parcel:", err.message);
    res.status(500).send({ message: "Failed to create parcel.", error: err.message });
  }
});

// Connect to DB and start the server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at :${port}`);
  });
});

<!-- Query Parameter Syntax: /routeName?key=value -->
