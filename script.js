const bookContainer = document.querySelector(".book-container");
const statusBtns = document.querySelectorAll(".status");
const addBookBtn = document.querySelector(".add-book");
const dialog = document.querySelector(".form-container");
const closeBtn = document.querySelector(".close");
const form = document.querySelector(".book-form");

class Book {
  constructor(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
    this.id = crypto.randomUUID();
  }

  toggleStatus() {
    this.status = this.status === "Read" ? "Unread" : "Read";
  }
}

class Library {
  #books = [];

  addBook(title, author, status) {
    const book = new Book(title, author, status);
    this.#books.push(book);
    return book;
  }

  deleteBook(id) {
    const index = this.#books.findIndex((b) => b.id === id);
    this.#books.splice(index, 1);
  }

  get books() {
    return this.#books;
  }
}

const myLibrary = new Library();
let num = 1;

addBookToLibrary("White Nights", "Fyodor Dostoevsky", "Read");
addBookToLibrary("1984", "George Orwell", "Unread");
addBookToLibrary("Dune", "Frank Herbert", "Read");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);

  addBookToLibrary(data.get("title"), data.get("author"), data.get("status"));

  dialog.close();
  form.reset();
});

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});


function addBookToLibrary(title, author, status) {
  myLibrary.addBook(title, author, status);
  displayBooks();
}

function displayBooks() {
  bookContainer.textContent = "";
  num = 1;
  myLibrary.books.forEach((book) => {
    createBook(book);
  });
}

function createBook(book) {
  const bookDiv = document.createElement("div");
  const number = document.createElement("p");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const status = document.createElement("button");
  const remove = document.createElement("button");
  const elementArr = [number, title, author, status, remove];

  status.addEventListener("click", () => handleToggleStatus(book));

  remove.addEventListener("click", () => handleDeleteBook(book.id));

  status.classList.add("status", book.status.toLowerCase());
  bookDiv.classList.add("book");
  remove.classList.add("delete");

  number.textContent = `${num}`;
  title.textContent = `${book.title}`;
  author.textContent = `${book.author}`;
  status.textContent = `${book.status}`;
  remove.textContent = `Delete`;

  elementArr.forEach((element) => {
    bookDiv.appendChild(element);
  });

  bookContainer.appendChild(bookDiv);
  num++;
}

function handleToggleStatus(book) {
  book.toggleStatus();
  displayBooks();
}

function handleDeleteBook(id) {
  myLibrary.deleteBook(id)
  displayBooks();
}
