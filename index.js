const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.get((req, res) => {
  res.status(200).json("안녕 world?");
});

app.listen(port, () => console.log(`Server Running ${port}`));
