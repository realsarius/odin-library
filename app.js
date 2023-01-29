let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.printInfo = function () {
  return `${this.title}, ${this.author}, ${this.pages}, ${this.read}.`;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  const tr = document.createElement('tr');
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.id = 'deleteBtn';
  const readBtn = document.createElement('button');
  readBtn.textContent = 'Read';
  readBtn.id = 'readBtn';
  for (let key in book) {
    if (book.hasOwnProperty(key)) {
      const td = document.createElement('td');
      td.textContent = book[key];
      tr.appendChild(td);
    }
    tr.appendChild(readBtn);
    tr.appendChild(deleteBtn);
    tbody.appendChild(tr);
  }
}

const table = document.querySelector('#table');
const tbody = document.getElementById('tbody');

function displayBooks() {
  //   myLibrary.forEach((item, index) => {
  //     const tr = document.createElement('tr');
  //     Object.keys(item).forEach((k, i) => {
  //       const td = document.createElement('td');
  //       td.textContent = item[k];
  //       tr.appendChild(td);
  //     });
  //     tbody.appendChild(tr);
  //   });
}

const newBook = document.querySelector('#new-book');
const addBookModal = document.querySelector('#addBookModal');
newBook.addEventListener('click', (e) => {
  addBookModal.showModal();
});

const submitBtn = document.querySelector('#submitBtn');
submitBtn.addEventListener('click', (e) => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const page = document.querySelector('#page').value;
  const read = document.querySelector('#read').value;
  const book = new Book(title, author, page, read);
  console.log(book);
  addBookToLibrary(book);

  displayBooks();
  e.preventDefault();
});
