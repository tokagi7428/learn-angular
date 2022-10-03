const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("./database/db.js");

mongoose.Promise = global.Promise;
mongoose
  .connect(mongodb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log(err);
  });

const bookRoute = require("./routes/book.js");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// statis directory path
app.use(express.static(path.join(__dirname, "dist/")));

// Base route
app.get("/", (req, res) => {
  res.sendFile(path.json(__dirname, "dist/index.js"));
});

//API Root
app.use("/api", bookRoute);

// PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Listening on port 8000");
});

// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
