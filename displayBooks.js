function displayBooks() {
  fetch("./books.json")
    .then((response) => response.json())
    .then((data) => {
      const bookData = data.library;

      const availableBooksContainer = document.getElementById(
        "available-book-container"
      );
      let booksHTML = "";

      bookData.forEach((b) => {
        booksHTML += `
          <div class="book">
          <div class="book-card-info">
            <h4>${b.book.title}</h4>
            <h5>Autor: <span>${b.book.author.name}</span></h5>
            <h6>Pags: <span>${b.book.pages}</span> - Año: <span>${b.book.year}</span></h6>       
            <p>${b.book.synopsis}</p>
            <div class="book-card-info-btns">
              <button>Agregar a la lista</button>
            </div>
          </div>
  
          <div class="cover">
            <img width="220px" height="300px" src="${b.book.cover}">
          </div>
        </div>
                      `;
      });

      availableBooksContainer.innerHTML = booksHTML;

      const addButton = document.querySelectorAll(
        ".book-card-info-btns button"
      );

      const buttonArray = Array.from(addButton);

      const readingListArray = [];

      addButton.forEach((button) => {
        button.addEventListener("click", () => {
          const bookIndex = buttonArray.indexOf(button);

          readingListArray.push(bookData[bookIndex]);

          
          const readingListContainer = document.getElementById(
            "reading-list-container"
          );
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
                <button id="rem-btn">Remover de la lista</button>
              </div>
            </div>
    
            <div class="cover">
              <img width="220px" height="300px" src="${r.book.cover}">
            </div>
          </div>
              `;
          });

          readingListContainer.innerHTML = readingListHTML;
        });
      });


      
    })

    .catch((error) => {
      console.error("Error al obtener el archivo JSON:", error);
    });
}
displayBooks();
