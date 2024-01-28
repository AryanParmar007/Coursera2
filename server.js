
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Sample book data
let books = [
    { id: 1, title: 'Book1', author:'1', isbn: '1234567890', review: 'Great book!' },
    { id: 2, title: 'Book2', author:'2', isbn: '0987654321', review: 'Awesome read!' },
    { id: 3, title: 'Book3', author:'3', isbn: '1234567895', review: 'Great book really!' },
    { id: 4, title: 'Book4', author:'4', isbn: '0987654721', review: 'Awesome reading it!' }
];

app.use(bodyParser.json());

// Task 1: Get the book list available in the shop
app.get('/api/books', (req, res) => {
    res.json(books);
});

// Task 2: Get the books based on ISBN
app.get('/api/books/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(book => book.isbn === isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Task 3: Get all books by Author
app.get('/api/books/author/:author', (req, res) => {
    const author = req.params.author;
    const authorBooks = books.filter(book => book.author === author);
    res.json(authorBooks);
});

// Task 4: Get all books based on Title
app.get('/api/books/title/:title', (req, res) => {
    const title = req.params.title;
    const titleBooks = books.filter(book => book.title === title);
    res.json(titleBooks);
});

// Task 5: Get book Review
app.get('/api/books/review/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);
    if (book) {
        res.json({ review: book.review });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

let users=[
    {
        "username": "Aryan",
        "email": "your_email@example.com",
        "password": "abc"
    },
    {
        "username": "krish",
        "email": "your_email@example.com",
        "password": "abs"
    },
    {
        "username": "Anos",
        "email": "your_email@example.com",
        "password": "asc"
    },
    {
        "username": "itachi",
        "email": "your_email@example.com",
        "password": "dba"
    }
];

//Task 6
app.post('/api/register', (req, res) => {
    // Extract user registration data from the request body
    const { username, email, password } = req.body;

    // Basic validation: Check if required fields are present
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email, and password.' });
    }

    // Check if the username or email is already taken
    if (users.some(user => user.username === username)) {
        return res.status(409).json({ message: 'Username already taken.' });
    }

    if (users.some(user => user.email === email)) {
        return res.status(409).json({ message: 'Email already registered.' });
    }

    // Store the new user in your data store (e.g., in-memory array)
    const newUser = { username, email, password };
    users.push(newUser);

    // You may want to hash the password before storing it in a real-world scenario

    res.status(201).json({ message: 'User registered successfully.', user: newUser });
});

//Task 7
app.post('/api/login', (req, res) => {
    // Extract login data from the request body
    const { username, password } = req.body;

    // Basic validation: Check if required fields are present
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide username and password.' });
    }

    // Check if the user exists and the password is correct
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Successful login
        res.json({ message: 'Login successful', user });
    } else {
        // Failed login
        res.status(401).json({ message: 'Invalid username or password.' });
    }
});

//Task 8
app.put('/api/books/review/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { review } = req.body;

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex !== -1) {
        // Book found, update the review
        books[bookIndex].review = review;
        res.json({ message: 'Book review updated successfully', book: books[bookIndex] });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

//Task 9
app.delete('/api/books/review/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex !== -1) {
        // Book found, delete the review
        delete books[bookIndex].review;
        res.json({ message: 'Book review deleted successfully', book: books[bookIndex] });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

//Task 10
app.get('/api/books', async (req, res) => {
    try {
        const allBooks = await getAllBooks();
        res.json(allBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Async callback function to get all books
function getAllBooks() {
    return new Promise((resolve, reject) => {
        // Simulating an asynchronous operation (e.g., database query)
        setTimeout(() => {
            resolve(books);
        }, 1000); // Simulate delay of 1 second
    });
}

//Task 11
app.get('/api/books/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;

    try {
        const book = await getBookByISBN(isbn);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error('Error fetching book by ISBN:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Async callback function to get a book by ISBN
function getBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
        // Simulating an asynchronous operation (e.g., database query)
        setTimeout(() => {
            const book = books.find(b => b.isbn === isbn);
            resolve(book);
        }, 1000); // Simulate delay of 1 second
    });
}

//Task 12
app.get('/api/books/author/:author', async (req, res) => {
    const author = req.params.author;

    try {
        const booksByAuthor = await getBooksByAuthor(author);
        res.json(booksByAuthor);
    } catch (error) {
        console.error('Error fetching books by author:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Async callback function to get books by author
function getBooksByAuthor(author) {
    return new Promise((resolve, reject) => {
        // Simulating an asynchronous operation (e.g., database query)
        setTimeout(() => {
            const booksByAuthor = books.filter(b => b.author === author);
            resolve(booksByAuthor);
        }, 1000); // Simulate delay of 1 second
    });
}

//Task 13
app.get('/api/books/title/:title', async (req, res) => {
    const title = req.params.title;

    try {
        const booksByTitle = await getBooksByTitle(title);
        res.json(booksByTitle);
    } catch (error) {
        console.error('Error fetching books by title:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Async callback function to get books by title
function getBooksByTitle(title) {
    return new Promise((resolve, reject) => {
        // Simulating an asynchronous operation (e.g., database query)
        setTimeout(() => {
            const booksByTitle = books.filter(b => b.title === title);
            resolve(booksByTitle);
        }, 1000); // Simulate delay of 1 second
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
