const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
  { id: 1, title: "1984", author: "Jay Raja" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper" }
];

app.get('/', (req, res) => {
  res.send('Welcome to the Book API! Visit /books to get the list.');
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const newBook = { id: Date.now(), ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === bookId);
  if (index !== -1) {
    books[index] = { id: bookId, ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === bookId);
  if (index !== -1) {
    const removed = books.splice(index, 1);
    res.json(removed[0]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
