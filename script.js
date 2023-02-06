// declare empty array for library
let myLibrary = [
   {
      title: 'The Hobbit, or There and Back Again',
      author: 'J.R.R. Tolkien',
      pages: 310,
      read: true,
   },
];

// object constructor
function Book(title, author, pages, read) {
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.read = read;
}

const addBookForm = document.querySelector('#addBookForm');
const title = document.querySelector('#bookFormTitle');
const author = document.querySelector('#bookFormAuthor');
const pages = document.querySelector('#bookFormPages');
const read = document.querySelector('#bookFormRead');
const booksGrid = document.querySelector('.books-grid');
const addBookBtn = document.querySelector('.add-to-lib-btn');
const addNewBookBtn = document.querySelector('.add-new-book-btn');
const addBookModal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const updateBookCounter = document.querySelector('.book-counter');

const openAddBookModal = () => {
   addBookModal.classList.add('active');
   overlay.classList.add('active');
}

const closeAddBookModal = () => {
   addBookModal.classList.remove('active');
   overlay.classList.remove('active');
}

addNewBookBtn.onclick = openAddBookModal;
overlay.onclick = closeAddBookModal;

// update books in array
Book.prototype.updateBook = function (index, value) {
   myLibrary[index].read = value;
};

// add books to library array
addBookForm.addEventListener('submit', (e) => {
   closeAddBookModal();
   e.preventDefault();
   // break out of form if incomplete
   // if ((title == '') || (author == '') || (pages == '')) {
   //    return;
   // } else {
   //    addBookToLibrary(title, author, pages, read);
   //    document.getElementById('addBookForm').reset();
   // }
   const book = new Book(title.value, author.value, pages.value, read.value);
   myLibrary.push(book);
   formClear();
   displayBooks();
   // left off here. not displaying new books as read=true
});

function removeBook() {
   const rmvBookBtn = document.querySelectorAll('.remove-book-btn');
   rmvBookBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
         myLibrary.splice(btn.getAttribute('data'), 1);
         displayBooks();
      });
   });
}

function displayBooks() {
   booksGrid.textContent = '';
   myLibrary.forEach((book, index) => {
      createBookCard(book, index);
   });
   removeBook();
   updateBookCounter.textContent = `Books: ${myLibrary.length}`;
}

// clear form inputs
function formClear() {
   title.value = '';
   author.value = '';
   pages.value = '';
   read.value = true;
}

// create book cards on the page
function createBookCard(book, index) {
   // create card div
   const card = document.createElement('div');
   card.classList.add('card')

   // add book info to cards
   const cardTitle = document.createElement('p');
   cardTitle.classList.add('card-title');
   cardTitle.innerText = `Title: ${book.title}`;
   card.append(cardTitle);

   const cardAuthor = document.createElement('p');
   cardAuthor.classList.add('card-author');
   cardAuthor.innerText = `Author: ${book.author}`;
   card.append(cardAuthor);

   const cardPages = document.createElement('p');
   cardPages.classList.add('card-pages');
   cardPages.innerText = `${book.pages} pages`;
   card.append(cardPages);

   const readStatus = document.createElement('p');
   readStatus.classList.add('card-read-status');
   // change read status innertext if true/false
   if (book.read === true) {
      readStatus.innerText = 'Read: Yes';
   } else {
      readStatus.innerText = 'Read: No';
   }
   card.append(readStatus)

   // add remove button to card
   const rmvBookBtn = document.createElement('button');
   rmvBookBtn.setAttribute('data', index);
   rmvBookBtn.classList.add('remove-book-btn');
   rmvBookBtn.textContent = 'Remove From Library';
   card.appendChild(rmvBookBtn);

   // add read status button to card
   const isReadBtn = document.createElement('button');
   isReadBtn.setAttribute('data', index);
   isReadBtn.classList.add('is-read-btn');
   isReadBtn.textContent = 'Read Status';
   card.appendChild(isReadBtn);
   // change read status with click listener
   isReadBtn.addEventListener('click', () => {
      book.read = !book.read;
      displayBooks();
   })

   // finally add book to book grid
   booksGrid.append(card);
}

displayBooks();