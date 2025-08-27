const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

const generateHeadline = require("./api/generateHeadline").generateHeadline;
app.post('/api/generate-headline',generateHeadline)

// Start the server
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});