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
  const tbody = document.getElementById('tbody');
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.id = 'deleteBtn';
  const readBtn = document.createElement('button');
  readBtn.textContent = 'Read';
  readBtn.id = 'readBtn';
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (let key in book) {
    if (book.hasOwnProperty(key)) {
      const td = document.createElement('td');
      if (key === 'title') {
        tr.dataset.title = book[key];
        deleteBtn.dataset.row = myLibrary.length;
      }
      td.textContent = book[key];
      tr.appendChild(td);
    }
    tr.appendChild(readBtn);
    tr.appendChild(deleteBtn);
    tbody.appendChild(tr);
  }
}

const newBook = document.querySelector('#new-book');
const addBookModal = document.querySelector('#addBookModal');
newBook.addEventListener('click', (e) => {
  addBookModal.showModal();
});

const table = document.querySelector('#table');
// function handleClick(e) {
//   console.log('asddsa');
//   table.deleteRow(e.target.getAttribute('data-row'));
// }
// const buttons = () => {
//   const deleteButtons = document.querySelectorAll('#deleteBtn');
//   deleteButtons.forEach((btn) => {
//     btn.addEventListener('click', handleClick, { once: true });
//   });
// };
const buttons = () => {
  document.querySelectorAll('#deleteBtn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      table.deleteRow(btn.getAttribute('data-row'));
    });
  });
};

const submitBtn = document.querySelector('#submitBtn');
submitBtn.addEventListener('click', (e) => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const page = document.querySelector('#page').value;
  const read = document.querySelector('#read').value;
  const book = new Book(title, author, page, read);

  addBookToLibrary(book);
  buttons();

  e.preventDefault();
});
