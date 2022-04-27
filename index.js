const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectedDB = require("./config/database");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

connectedDB();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/carts", require("./routes/carts"));

app.listen(port, () => console.log(`Server Running ${port}`));
