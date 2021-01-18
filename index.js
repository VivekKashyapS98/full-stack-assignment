require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

const errorHandler = require("./handlers/error");
const userAuth = require("./routes/auth");

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/auth", userAuth);

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use(errorHandler);

app.listen(PORT, () => console.log(`The Server is running on port: ${PORT}`));
