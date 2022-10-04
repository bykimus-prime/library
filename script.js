// declare empty array for library
let myLibrary = [];

// object constructor
function Book(title, author, pages, read) {
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.read = read;
}

const addBookBtn = document.querySelector('.add-to-lib-btn');
const addNewBookBtn = document.querySelector('.add-new-book-btn');
const addBookModal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

addBookBtn.addEventListener('click', intakeFormData);

function resetForm() {
   document.getElementById('addBookForm').reset();
}

const openAddBookModal = () => {
   addBookModal.classList.add('active');
   overlay.classList.add('active');
}

const closeAddBookModal = () => {
   addBookModal.classList.remove('active');
   overlay.classList.remove('active');
   resetForm();
}

function intakeFormData() {
   let title = document.getElementById('title').value; // .value will pull the contents of textbox
   let author = document.getElementById('author').value;
   let pages = document.getElementById('pages').value;
   let read = document.getElementById('read').value;

   // break out of form if incomplete
   if ((title == '') || (author == '') || (pages == '')) {
      return;
   }
   
   // call function to input book data to array
   addBookToLibrary(title, author, pages, read);

   closeAddBookModal();
}

// adds new books to array
function addBookToLibrary(title, author, pages, read) {
   let newBook = new Book(title, author, pages, read);
   myLibrary.push(newBook);
   displayBooks();
}

function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

// displays library array to cards
function displayBooks() {
   const booksGrid = document.querySelector('.booksGrid');

   // remove previously displayed cards that were popping up before looping array again
   const removeDivs = document.querySelectorAll('.card'); // removeDivs could be used as a book counter later
   for (let i = 0; i < removeDivs.length; i++) {
      removeDivs[i].remove();
   }

   // loop over library array and display to cards
   let index = 0;
   myLibrary.forEach(myLibraries => {
      const card = document.createElement('div');
      card.classList.add('card')
      booksGrid.appendChild(card);

      const rmvBookBtn = document.createElement('button');
      const isReadBtn = document.createElement('button');
      rmvBookBtn.classList.add('remove-book-btn');
      isReadBtn.classList.add('is-read-btn');
      rmvBookBtn.textContent = 'Remove From Library';
      isReadBtn.textContent = 'Read Status';

      // link data attribute to each button to the array and card
      rmvBookBtn.dataset.linkedArray = index;
      isReadBtn.dataset.linkedArray = index;
      card.appendChild(rmvBookBtn);
      card.appendChild(isReadBtn);

      rmvBookBtn.addEventListener('click', removeBookFromLibrary);
      isReadBtn.addEventListener('click', isReadToggle);

      function removeBookFromLibrary() {
         let getBookToRemove = rmvBookBtn.dataset.linkedArray;
         myLibrary.splice(parseInt(getBookToRemove), 1);
         card.remove();
         displayBooks();
      }

      function isReadToggle() {
         let getBookToggle = isReadBtn.dataset.linkedArray;
         Book.prototype = Object.create(Book.prototype);
         const bookToggle = new Book();

         if ((myLibrary[parseInt(getBookToggle)].read) == 'yes') {
            bookToggle.read = 'no';
            myLibrary[parseInt(getBookToggle)].read = bookToggle.read;
         } else if ((myLibrary[parseInt(getBookToggle)].read == 'no')) {
            bookToggle.read = 'yes';
            myLibrary[parseInt(getBookToggle)].read = bookToggle.read;
         }
         displayBooks();
      }

      for (let key in myLibraries) {
         const para = document.createElement('p');
         para.textContent = capitalizeFirstLetter((`${key}: ${myLibraries[key]}`));
         card.appendChild(para);
      }

   index++;
   })
}

addNewBookBtn.onclick = openAddBookModal;
overlay.onclick = closeAddBookModal;

addBookToLibrary('the hobb', 'jrr tolk', '200', 'yes');