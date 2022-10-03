// declare empty array for library
let myLibrary = [];

// object constructor
function Book(title, author, pages, read) {
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.read = read;
}

// adds new books to array
function addBookToLibrary(title, author, pages, read) {
   let newBook = new Book(title, author, pages, read);
   myLibrary.push(newBook);
   displayBooks();
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

      // create remove button and add class attribute for each array card
      const rmvBookBtn = document.createElement('button');
      rmvBookBtn.classList.add('remove-book-btn');
      rmvBookBtn.textContent = 'Remove From Library';

      // link data attribute to remove button to the array and card
      rmvBookBtn.dataset.linkedArray = index;
      card.appendChild(rmvBookBtn);

      // start event listener/remove array item from array and card from parent via data link
      rmvBookBtn.addEventListener('click', removeBookFromLibrary);

      function removeBookFromLibrary() {
         let getBookToRemove = rmvBookBtn.dataset.linkedArray;
         myLibrary.splice(parseInt(getBookToRemove), 1); // splice takes what you want removed from array, integer value (1) to remove
         card.remove();
         displayBooks();
      }

      // create read status button and class attribute for each array card
      const isReadBtn = document.createElement('button');
      isReadBtn.classList.add('is-read-btn');
      isReadBtn.textContent = 'Read Status';
      
      // link data attribute of toggle read button to array and card
      isReadBtn.dataset.linkedArray = index;
      card.appendChild(isReadBtn);

      // create event listener for array objects prototype for read status change
      isReadBtn.addEventListener('click', isReadToggle);

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
         para.textContent = (`${key}: ${myLibraries[key]}`);
         card.appendChild(para);
      }

   index++;
   })
}

const addBook = document.querySelector('.add-to-lib-btn');
const clearBtn = document.querySelector('.reset-btn');

addBook.addEventListener('click', intakeFormData);
clearBtn.addEventListener('click', clearForm);

function intakeFormData() {
   let title = document.getElementById('title').value; // .value will pull the contents of textbox
   let author = document.getElementById('author').value;
   let pages = document.getElementById('pages').value;
   let read = document.getElementById('read').value;

   // break out of form if incomplete
   if ((title == '') || (author == '') || (pages == '') || (read == '')) {
      // put alert here "please fill in all fields"
      return;
   }

   // call function to input book data to array
   addBookToLibrary(title, author, pages, read);

   // reset form after submission
   document.getElementById('addBook').reset();
}

function clearForm() {
   document.getElementById('addBook').reset();
}

addBookToLibrary('the hobb', 'jrr tolk', '200 pgs', 'yes');