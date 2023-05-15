// Import express and have an instance of it
const express = require("express");
const app = express();
const cors = require("cors");

const conn = require("./Config/dbConnection")

// Global envirenement
require("dotenv").config();

conn.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected");
});


// middleware global
app.use(express.json());

// Set Up CORS  
app.use(cors());  


// Utilisateur Router
app.use("/api/utilisateur", require("./Routes/utilisateur"));


app.use("/api/global", require("./Routes/Global"));


  
// Server=localhost;Database=master;Trusted_Connection=True;
const PORT = 5000;
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server is Running on port ${PORT}`);
});
