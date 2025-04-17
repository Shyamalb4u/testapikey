const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use((req, res, next) => {
  const apiKey = req.header("x-api-key");
  const real_apiKey = process.env.API_KEY;
  console.log("from header ", apiKey);
  console.log("from app ", real_apiKey);
  if (!apiKey || apiKey !== real_apiKey) {
    return res.status(403).json({ message: "Wrong api key" });
  }
  next();
});

app.get("/", (req, res, next) => {
  res.status(200).send("Checking a simple api");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log(`app is running on port ${PORT}`);
