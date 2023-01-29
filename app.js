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

const book1 = new Book(
  'The Hobbit',
  'J.R.R. Tolkien',
  '295 pages',
  'not read yet'
);
const book2 = new Book(
  'Harry Potter',
  'J.R.R. Tolkien',
  '295 pages',
  'not read yet'
);

function addBookToLibrary(book) {
  myLibrary.push(book);
}
addBookToLibrary(book1);
addBookToLibrary(book2);

const tbody = document.getElementById('tbody');

function displayBooks() {
  myLibrary.forEach((item, index) => {
    const tr = document.createElement('tr');
    Object.keys(item).forEach((k, i) => {
      const td = document.createElement('td');

      td.textContent = item[k];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

displayBooks();
