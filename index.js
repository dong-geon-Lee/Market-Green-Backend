const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectedDB = require("./config/database");
const { notFound, error } = require("./middleware/errorHandler");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

connectedDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

app.use(notFound);
app.use(error);

app.listen(port, () => console.log(`Server Running ${port}`));
