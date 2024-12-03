const express = require("express");
const app = express();
const books = require("./books");

app.use(express.json());

const createNewBook = (newBookData) => {
  console.log("Creating New Book", newBookData);
  const newId = books.length + 1;
  const newBook = Object.assign({ id: newId }, newBookData);
  console.log("My new book is: ", newBook);
  return newBook;
};

const updateBook = (currentBook, newData) => {
  const myUpdatedBook = Object.assign(currentBook, newData);
  return myUpdatedBook;
};

const deleteBook = (bookIdToBeDeleted) => {
  const newBooks = books.filter((book) => book.id != bookIdToBeDeleted);
  console.log("My new books are: ", newBooks);
};

app.get("/", (req, res) => {
  res.json({ name: "Hamad" });
});

app.get("/books", () => {
  res.json(books);
});

app.get("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  const book = books.find((book) => book.id === bookId);
  console.log(book);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json();
  }
});

app.put("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  const book = books.find((book) => book.id === bookId);
  if (book) {
    const updatedBook = updateBook(book, req.body);
    res.status(200).json(updatedBook);
  } else {
    res.status(404).json();
  }
});

app.delete("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  const book = books.find((book) => book.id === bookId);
  if (book) {
    deleteBook(bookId);
    res.status(204).end();
  } else {
    res.status(404).json();
  }
});

app.post("/books", (req, res) => {
  const newBook = createNewBook(req.body);
  res.status(201).json(newBook);
});
