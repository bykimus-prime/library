// declare empty array for library
let myLibrary = [];

// object constructor
function Book() {
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
}

// displays library array to cards
function displayBooks() {
   const books = document.querySelector('.books');

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