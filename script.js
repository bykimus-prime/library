// declare empty array for library
let myLibrary = [];

// object constructor
function Book(title, author, pages, read) {
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.read = read;
   // this.info = function() {
   //    return (title + author + ', ' + pages + read)
   // }
}

// const theHobbit = new Book('The Hobbit', 'by J.R.R. Tolkien', '297 pages', 'not read')
// console.log(theHobbit.info());


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
   const removeDivs = document.querySelectorAll('.card');
   console.log('show node count of current card divs', removeDivs); // removeDivs could be used as a book counter later
   for (let i = 0; i < removeDivs.length; i++) {
      removeDivs[i].remove();
   }

   // loop over library array and display to cards
   myLibrary.forEach(myLibrary => {
      const card = document.createElement('div');
      card.classList.add('card')
      books.appendChild(card);
      for (let key in myLibrary) {
         console.log(`${key}: ${myLibrary[key]}`)
         const para = document.createElement('p');
         para.textContent = (`${key}: ${myLibrary[key]}`);
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

   // call function to input book data to array
   addBookToLibrary(title, author, pages, read);

   // reset form after submission
   document.getElementById('addBook').reset();
}

function clearForm() {
   document.getElementById('addBook').reset();
}

// calling function and add data manually until we add user input
// addBookToLibrary('The Hobbit', 'by J.R.R. Tolkien', '297 pages', 'not read');
// addBookToLibrary('Green Eggs and Ham', 'by Dr. Seuss', '62 pages', 'read');
// addBookToLibrary('The Hobbit', 'by J.R.R. Tolkien', '297 pages', 'not read');
// addBookToLibrary('Green Eggs and Ham', 'by Dr. Seuss', '62 pages', 'read');
// addBookToLibrary('The Hobbit', 'by J.R.R. Tolkien', '297 pages', 'not read');
// addBookToLibrary('Green Eggs and Ham', 'by Dr. Seuss', '62 pages', 'read');

// console.log('end of code array contents', myLibrary);

// displayBooks();