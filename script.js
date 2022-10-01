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
   let book = new Book(title, author, pages, read);
   myLibrary.push(book);
   displayBooks();
}

// displays library array to cards
function displayBooks() {
   const books = document.querySelector('.books');

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
      books.appendChild(card);

      // create remove button and add class attribute for each array card
      const rmvBookBtn = document.createElement('button');
      rmvBookBtn.classList.add('remove-book-btn');
      rmvBookBtn.textContent = 'Remove From Library';

      // link data attribute to remove button to the array and card
      rmvBookBtn.dataset.linkedArray = index;
      index++;
      card.appendChild(rmvBookBtn);

      // start event listener/remove array item from array and card from parent via data link
      rmvBookBtn.addEventListener('click', removeBookFromLibrary);

      function removeBookFromLibrary() {
         let getBookToRemove = rmvBookBtn.dataset.linkedArray;
         myLibrary.splice(parseInt(getBookToRemove), 1);
         card.remove();
         displayBooks();
      }

      for (let key in myLibraries) {
         const para = document.createElement('p');
         para.textContent = (`${key}: ${myLibraries[key]}`);
         card.appendChild(para);
      }
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