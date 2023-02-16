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
          tr.dataset.uuid = book.uuid;
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
  myLibrary.find((o, i) => {
    myLibrary.splice(
      myLibrary.indexOf(e.target.getAttribute('data-book-id'), 1)
    );
  });
}

const buttons = () => {
  const deleteButtons = document.querySelectorAll('#deleteBtn');
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', handleClick, { once: true });
  });
};

const submitBtn = document.querySelector('#submitBtn');
submitBtn.addEventListener('click', (e) => {
  if (
    document.querySelector('#title').validity.valid &&
    document.querySelector('#author').validity.valid &&
    document.querySelector('#page').validity.valid
  ) {
    const UUID = Math.random().toString(16).slice(2);
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const page = document.querySelector('#page').value;
    const read = document.querySelector('#read').value;
    const book = new Book(title, author, page, read, UUID);

    addBookToLibrary(book);
    buttons();
    addBookModal.close();
  } else {
    document.querySelector('#form').reportValidity();
  }

  e.preventDefault();
});

document.querySelector('.close').addEventListener('click', () => {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#page').value = '';
  addBookModal.close();
});

document.querySelector('#title').addEventListener('input', () => {
  if (document.querySelector('#title').validity.valid) {
    document.querySelector('.title-error').textContent = '';
    document.querySelector('#title').style.outline =
      '1.5px rgb(156, 156, 255) solid';
    document.querySelector('#title').style.background =
      'rgba(156, 156, 255, 0.2)';
  } else {
    document.querySelector(
      '.title-error'
    ).textContent = `At least 5 characters. Please add ${
      5 - document.querySelector('#title').value.length
    } more.`;
    document.querySelector('#title').style.outline =
      '1.5px rgb(255, 156, 156) solid';
    document.querySelector('#title').style.background =
      'rgba(255, 156, 156, 0.2)';
  }
});

document.querySelector('#author').addEventListener('input', () => {
  if (document.querySelector('#author').validity.valid) {
    document.querySelector('.author-error').textContent = '';
    document.querySelector('#author').style.outline =
      '1.5px rgb(156, 156, 255) solid';
    document.querySelector('#author').style.background =
      'rgba(156, 156, 255, 0.2)';
  } else {
    document.querySelector(
      '.author-error'
    ).textContent = `At least 5 characters. Please add ${
      5 - document.querySelector('#author').value.length
    } more.`;
    document.querySelector('#author').style.outline =
      '1.5px rgb(255, 156, 156) solid';
    document.querySelector('#author').style.background =
      'rgba(255, 156, 156, 0.2)';
  }
});

document.querySelector('#page').addEventListener('input', () => {
  if (document.querySelector('#page').validity.valid) {
    document.querySelector('.page-error').textContent = '';
    document.querySelector('#page').style.outline =
      '1.5px rgb(156, 156, 255) solid';
    document.querySelector('#page').style.background =
      'rgba(156, 156, 255, 0.2)';
  } else {
    document.querySelector('.page-error').textContent =
      'Please use only numbers';
    document.querySelector('#page').style.outline =
      '1.5px rgb(255, 156, 156) solid';
    document.querySelector('#page').style.background =
      'rgba(255, 156, 156, 0.2)';
  }
});
