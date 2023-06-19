const addBook = document.querySelector('#addButton'); //open Model
const modal = document.querySelector('#popup');
const submit = modal.querySelector('#submit');
let title = "";
let author = "";
let pages = 0;
let isRead = false;
let myLibrary = [];

class Library {
  constructor() {
    this.books = []
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook)
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title)
  }

  getBook(title) {
    return this.books.find((book) => book.title === title)
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title)
  }
}
const library = new Library();

addBook.addEventListener('click', ()=> {
  modal.showModal();
})

submit.addEventListener('click', ()=> {
  if(document.getElementById("title").value != "" && document.getElementById("author").value != "" &&  document.getElementById("pages").value != ""){
    title = document.getElementById("title").value;
    author = document.getElementById("author").value;
    pages = document.getElementById("pages").value;
    isRead = document.getElementById('readCheck').checked ? true : false;
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById('readCheck').checked = false;
    const book = new Book(title,author,pages,isRead)
    myLibrary.push(book);
    library.addBook(book);
    addBookToLibrary(book);
    event.preventDefault();
    modal.close();
  }
})

function Book(title,author,pages,isRead) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

const card = document.querySelector('.grid-container');
const addBookToLibrary = (book) =>{
  // do stuff here
  let cardDiv = document.createElement('div');
  let titleDiv = document.createElement('div');
  let authorDiv = document.createElement('div');
  let pageDiv = document.createElement('div');
  let readBtn = document.createElement('button');

  readBtn.onclick = updateRead;
  let removeBtn = document.createElement('button');
  removeBtn.onclick = remove;
  cardDiv.className = "card";
  titleDiv.className = "cardTitle";
  authorDiv.className = "cardAuthor";
  pageDiv.className = "cardPages";
  if(book.isRead === true){
    readBtn.className = "hasRead";
    readBtn.innerText = "Read";
  }else{
    readBtn.className = "notRead";
    readBtn.innerText = "Not Read";
  }
  removeBtn.className = "remove";
  titleDiv.innerText = book.title; // change to encompass new books
  authorDiv.innerText = book.author;
  pageDiv.innerText = book.pages + " pages";
  removeBtn.innerText = "Remove";
  cardDiv.appendChild(titleDiv);
  cardDiv.appendChild(authorDiv);
  cardDiv.appendChild(pageDiv);
  cardDiv.appendChild(readBtn);
  cardDiv.appendChild(removeBtn);
  card.appendChild(cardDiv);
}

const updateBooksGrid = () => {
  resetBooksGrid()
  for (let book of myLibrary) {
    addBookToLibrary(book)
  }
}

const resetBooksGrid = () => {
  card.innerHTML = ''
}

const updateRead = (e) =>{
  const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"','')
  const currbook = myLibrary.find((book) => book.title === title);
  currbook.isRead = !currbook.isRead;
  updateBooksGrid()
}

const remove = (e) => {
  const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"','');
  console.log(title);
  myLibrary = myLibrary.filter((book) => book.title !== title)
  updateBooksGrid();
}
const dialog = document.querySelector('#popup');
dialog.addEventListener("click", e => {
  const dialogDimensions = dialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close()
  }
})
