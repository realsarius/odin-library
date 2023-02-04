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
}

const newBook = document.querySelector('#new-book');
const addBookModal = document.querySelector('#addBookModal');
newBook.addEventListener('click', (e) => {
  addBookModal.showModal();
});

const table = document.querySelector('#table');

function handleClick(e) {
  myLibrary.find((o, i) => {
    // console.log(`o: ${o.uuid}`);
    // console.log(`e: ${e.target.getAttribute('data-book-id')}`);
    if (o.uuid === e.target.getAttribute('data-book-id')) {
      console.log('---------------------------');
      console.log(`o: ${o.uuid}`);
      console.log(`e: ${e.target.getAttribute('data-book-id')}`);
      table.deleteRow(o.uuid);
      return null;
    }
  });
}

const buttons = () => {
  const deleteButtons = document.querySelectorAll('#deleteBtn');
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', handleClick, { once: true });
  });
};
// const buttons = () => {
//   document.querySelectorAll('#deleteBtn').forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//       table.deleteRow(btn.getAttribute('data-row'));
//     });
//   });
// };

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
