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

const theHobbit = new Book('The Hobbit', 'by J.R.R. Tolkien', '297 pages', 'not read')
console.log(theHobbit.info());


// adds new books to array
function addBookToLibrary(title, author, pages, read) {
   let book = new Book(title, author, pages, read);
   myLibrary.push(book);
}