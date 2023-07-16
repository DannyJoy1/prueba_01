export function displayBooks() {
  fetch("./books.json")
    .then((response) => response.json())
    .then((data) => {
      const bookData = data.library;

      const findedBooksContainer = document.getElementById(
        "finded-book-container"
      );
      let booksHTML = "";

      bookData.forEach((b) => {
        booksHTML += `
                    <div class="book">
                        <div class="book-card-info">
                          <h4>${b.book.title}</h4>
                          <h5>Autor: <span>${b.book.author.name}</span></h5>
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

      findedBooksContainer.innerHTML = booksHTML;

      const addButton = document.querySelectorAll(
        ".book-card-info-btns button"
      );
      const buttonArray = Array.from(addButton);

      const readingListArray = [];

      addButton.forEach((button) => {
        button.addEventListener("click", (event) => {
          const bookIndex = buttonArray.indexOf(button);

          

          readingListArray.push(bookData[bookIndex]);
    

          console.log(bookData);


          const readingListContainer = document.getElementById('reading-list-container');
          let readingListHTML = '';

          readingListArray.forEach(r => {

            readingListHTML += 
            `
            <div class="book">
                        <div class="book-card-info">
                          <h4>${r.book.title}</h4>
                          <h5>Autor: <span>${r.book.author.name}</span></h5>
                          <p>${r.book.synopsis}</p>
                          <div class="book-card-info-btns">
                            <button>Agregar a la lista</button>
                          </div>
                        </div>

                        <div class="cover">
                          <img width="220px" height="300px" src="${r.book.cover}">
                        </div>
                    </div>
            `
            
          });

          readingListContainer.innerHTML = readingListHTML;
          console.log(readingListArray);
        });


        
      });
    })

    .catch((error) => {
      console.error("Error al obtener el archivo JSON:", error);
    });
}
