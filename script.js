document
  .getElementById("book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

// Javascript library app
let myLibrary = [];

class Book {
  constructor(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
  }
  toggle() {
    if (this.read) {
      this.read = false;
    } else {
      this.read = true;
      return "You've read this book";
    }
  }
}

//function Book(title, author, numPages, read) {
//  this.title = title;
//  this.author = author;
//  this.pages = numPages;
//  this.read = read;
//}
//
//Book.prototype.toggle = function () {
//  if (this.read) {
//    this.read = false;
//    return "";
//  } else {
//    this.read = true;
//    return "You've read this book";
//  }
//};

// Adds book to library
const addBook = function addBooktoLibrary(book) {
  myLibrary.push(book);
  showBook(book);
};

// Add newest book to the DOM
const showBook = function addBooktoDom(book) {
  // Create dom elements for book
  const bookContainer = document.querySelector(".book-container");

  const bookCard = document.createElement("li");
  bookCard.classList.add("book-card");

  const title = document.createElement("h2");
  title.innerText = book.title;
  title.classList.add("book-card-title");

  const author = document.createElement("p");
  author.innerText = "by " + book.author;
  author.classList.add("book-card-author");

  const pages = document.createElement("p");
  pages.innerText = book.numPages + " Pages";
  pages.classList.add("book-card-pages");

  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  const switchEl = document.createElement("label");
  switchEl.classList.add("switch");

  const checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";

  const sliderEl = document.createElement("span");
  sliderEl.classList.add("slider");

  const read = document.createElement("p");
  if (book.read === true) {
    read.innerText = "You've read this book.";
    checkboxEl.checked = true;
  }

  read.classList.add("book-card-read");

  // Add delete button with data-index value
  const deleteButton = document.createElement("p");
  deleteButton.innerText = "X";
  deleteButton.classList.add("book-delete-button");
  deleteButton.setAttribute(
    "data-index",
    myLibrary.length > 0 ? myLibrary.length - 1 : 0
  );

  const deleteContainer = document.createElement("div");
  // Each book has a delete button with a data attribute
  // value so that we can easily delete it
  deleteContainer.classList.add("book-delete");

  // Append nodes to the DOM
  deleteContainer.appendChild(deleteButton);
  bookCard.appendChild(deleteContainer);
  bookCard.appendChild(title);
  bookCard.appendChild(author);

  // Add toggle switch
  switchEl.appendChild(checkboxEl);
  switchEl.appendChild(sliderEl);
  toggleContainer.appendChild(switchEl);
  toggleContainer.appendChild(pages);

  bookCard.appendChild(read);
  bookCard.appendChild(toggleContainer);
  // Add everything to main book container
  bookContainer.appendChild(bookCard);

  deleteButton.addEventListener("click", function () {
    const bookIndex = deleteButton.getAttribute("data-index");
    deleteBook(bookIndex);
  });
  // Event Listeners for each card
  const toggleSwitch = bookCard.querySelector(".slider");
  toggleSwitch.addEventListener("click", () => {
    read.innerText = book.toggle();
  });
};

// Event listeners
const addBookNav = document.querySelector(".add-book-button");
addBookNav.addEventListener("click", showForm);

const hideFormButton = document.querySelector(".close-form");
hideFormButton.addEventListener("click", hideForm);

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", submitForm);

//const yourLibraryNav = document.querySelector(".your-library-button");
//yourLibraryNav.addEventListener("click", showLibrary);
//
//const finishedBooksNav = document.querySelector(".have-read-button");
//finishedBooksNav.addEventListener("click", showFinishedBooks);

function deleteBook(index) {
  const elParent = document.querySelector(`[data-index="${index}"]`).parentNode
    .parentNode;
  if (elParent.parentNode) {
    elParent.parentNode.removeChild(elParent);
  }
  delete myLibrary[bookIndex];
}

function hideForm() {
  const formPopUp = document.querySelector(".form-container");
  formPopUp.style.visibility = "hidden";
}

function showForm() {
  const formPopUp = document.querySelector(".form-container");
  formPopUp.style.visibility = "visible";
}

function showLibrary() {}

function showFinishedBooks() {
  alert("show finished books");
}

// Get form data and create new book
function submitForm() {
  const form = document.getElementById("book-form");
  const inputs = document.getElementById("book-form").elements;

  const title = inputs["title"];
  const author = inputs["author"];
  const pages = inputs["num-pages"];
  const readBook = document.getElementById("read-checkbox").checked;

  const newBook = new Book(title.value, author.value, pages.value, readBook);

  addBook(newBook);

  form.reset();
  hideForm();
}
