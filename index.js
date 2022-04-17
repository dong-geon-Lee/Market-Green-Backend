const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/users"));

app.listen(port, () => console.log(`Server Running ${port}`));
