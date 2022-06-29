const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectedDB = require("./config/database");
const { notFound, error } = require("./middleware/errorHandler");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

connectedDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

app.get("/api/paypal", (req, res) => {
  res.json(process.env.PAYPAL_CLIENT_ID);
});

//  -----Deployment-----

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

//  -----Deployment-----

app.use(error);
app.use(notFound);

app.listen(PORT, () => console.log(`Server Running ${PORT}`));
