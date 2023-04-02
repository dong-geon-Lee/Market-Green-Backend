const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectedDB = require("./config/database");
const { notFound, error } = require("./middleware/errorHandler");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const corsOption = { credentials: true, origin: true };

dotenv.config();
connectedDB();

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.get("/api/paypal", (_, res) => {
  res.json(process.env.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === "production") {
  app.use("/uploads", express.static("uploads"));
  app.use(express.static(path.join(__dirname, "frontend", "build")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (_, res) => {
    res.send("API is running..");
  });
}

app.use(error);
app.use(notFound);
app.listen(PORT, () => console.log(`Server Running ${PORT}`));
