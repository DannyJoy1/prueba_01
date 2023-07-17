function displayBooks() {
    fetch("./books.json")
      .then((response) => response.json())
      .then((data) => {
        let bookData = data.library;
  
        const availableBooksContainer = document.getElementById("available-book-container");
        const readingListContainer = document.getElementById("reading-list-container");
  
        const generateBooksHTML = (books) => {
          let booksHTML = "";
          books.forEach((b, index) => {
            booksHTML += `
              <div class="book">
                <div class="book-card-info">
                  <h4>${b.book.title}</h4>
                  <h5>Autor: <span>${b.book.author.name}</span></h5>
                  <h6>Pags: <span>${b.book.pages}</span> - Año: <span>${b.book.year}</span></h6>       
                  <p>${b.book.synopsis}</p>
                  <div class="book-card-info-btns">
                    <button class="add-btn">Agregar a la lista</button>
                  </div>
                </div>
                <div class="cover">
                  <img width="220px" height="300px" src="${b.book.cover}">
                </div>
              </div>
            `;
          });
          return booksHTML;
        };
  
        const updateAvailableBooks = () => {
          availableBooksContainer.innerHTML = generateBooksHTML(bookData);
          const addButton = document.querySelectorAll(".add-btn");
          addButton.forEach((button) => {
            button.addEventListener("click", () => {
              const bookIndex = Array.from(addButton).indexOf(button);
  
              const selectedBook = bookData[bookIndex];
  
              bookData.splice(bookIndex, 1);
              updateAvailableBooks();
              addToReadingList(selectedBook);
            });
          });
        };
  
        const readingListArray = [];
  
        const addToReadingList = (book) => {
          readingListArray.push(book);
          updateReadingList();
        };
  
        const removeFromReadingList = (book) => {
          const bookIndex = readingListArray.indexOf(book);
          if (bookIndex !== -1) {
            readingListArray.splice(bookIndex, 1);
            updateReadingList();
            bookData.push(book);
            updateAvailableBooks();
          }
        };
  
        const updateReadingList = () => {
          let readingListHTML = "";
          readingListArray.forEach((r) => {
            readingListHTML += `
              <div class="book">
                <div class="book-card-info">
                  <h4>${r.book.title}</h4>
                  <h5>Autor: <span>${r.book.author.name}</span></h5>
                  <h6>Pags: <span>${r.book.pages}</span> - Año: <span>${r.book.year}</span></h6>       
                  <p>${r.book.synopsis}</p>
                  <div class="book-card-info-btns">
                    <button class="rem-btn">Remover de la lista</button>
                  </div>
                </div>
                <div class="cover">
                  <img width="220px" height="300px" src="${r.book.cover}">
                </div>
              </div>
            `;
          });
          readingListContainer.innerHTML = readingListHTML;
  
          const removeButtons = document.querySelectorAll(".rem-btn");
          removeButtons.forEach((button) => {
            button.addEventListener("click", () => {
              const bookTitle = button.parentNode.parentNode.querySelector("h4").textContent;
              const book = readingListArray.find((r) => r.book.title === bookTitle);
              removeFromReadingList(book);
            });
          });
        };
  
        updateAvailableBooks();
  
      })
      .catch((error) => {
        console.error("Error al obtener el archivo JSON:", error);
      });
  }
  
  displayBooks();
  