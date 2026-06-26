const bookContainer = document.querySelector(".book-container");
const statusBtns = document.querySelectorAll(".status");
const addBookBtn = document.querySelector(".add-book");

const myLibrary = [];
let num = 1;

addBookToLibrary("White Nights", "Fyodor Dostoevsky", "Read");
addBookToLibrary("1984", "George Orwell", "Unread");
addBookToLibrary("Dune", "Frank Herbert", "Read");

displayBooks();

function Book(title, author, status) {
  this.title = title;
  this.author = author;
  this.status = status;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, status, id) {
  const book = new Book(title, author, status);
  myLibrary.push(book);
}

function displayBooks() {
  bookContainer.textContent = "";
  num = 1;
  myLibrary.forEach((book) => {
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

  status.addEventListener("click", () => toggleStatus(book));

  remove.addEventListener("click", () => deleteBook(book));

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

function toggleStatus(book) {
  book.status = book.status === "Read" ? "Unread" : "Read";
  displayBooks();
}

function deleteBook(book) {
  const index = myLibrary.findIndex((b) => b.id === book.id);
  myLibrary.splice(index, 1);
  displayBooks();
}
