const express = require("express");
const bookRoute = express.Router();
const Book = require("../models/Book.js");

// add book
bookRoute.route("/add-book").post((req, res, next) => {
  Book.create(req.body, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  });
});

// Get all book
bookRoute.route("/").get((req, res, next) => {
  Book.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get a book
bookRoute.route("/read/book/:id").get((req, res, next) => {
  const book = Book.findById(req.params.id);
  try {
    res.json(book);
  } catch (err) {
    res.json(err);
  }
});

// Updata book
bookRoute.route("/update-book/:id").put((req, res, next) => {
  Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
      new: true,
    },
    (err, data) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log("Book Updated Successfully");
        res.json(data);
      }
    }
  );
});

//Delete book
bookRoute.route("/delete-book/:id").get((req, res, next) => {
  Book.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({ msg: data });
    }
  });
});

module.exports = bookRoute;
