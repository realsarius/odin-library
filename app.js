let myLibrary = [];

class Book {
  constructor(_title, _author, _pages, _read, _UUID) {
    this.title = _title;
    this.author = _author;
    this.pages = _pages;
    this.read = _read;
    this.uuid = _UUID;
  }

  printInfo() {
    return `${this.title}, ${this.author}, ${this.pages}, ${this.read}, ${this.uuid}.`;
  }
}

const table = document.querySelector('#table');

const render = () => {
  for (let i = 1; i < table.rows.length; ) {
    table.deleteRow(i);
  }

  myLibrary.forEach((book) => {
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
        if (key === 'uuid') {
          tr.dataset.uuid = book[book.uuid];
          deleteBtn.dataset.bookId = book.uuid;
        } else {
          td.textContent = book[key];
          tr.appendChild(td);
        }
      }
      tr.appendChild(readBtn);
      tr.appendChild(deleteBtn);
      tbody.appendChild(tr);
    }
  });
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  render();
}

const newBook = document.querySelector('#new-book');
const addBookModal = document.querySelector('#addBookModal');
newBook.addEventListener('click', (e) => {
  addBookModal.showModal();
});

function handleClick(e) {
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
}

const buttons = () => {
  const deleteButtons = document.querySelectorAll('#deleteBtn');
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', handleClick, { once: true });
  });
};

const submitBtn = document.querySelector('#submitBtn');
submitBtn.addEventListener('click', (e) => {
  const UUID = Math.random().toString(16).slice(2);
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const page = document.querySelector('#page').value;
  const read = document.querySelector('#read').value;
  const book = new Book(title, author, page, read, UUID);

  addBookToLibrary(book);
  buttons();

  e.preventDefault();
});
