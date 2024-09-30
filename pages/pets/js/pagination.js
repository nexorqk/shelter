const drawPetCard = ({ img, name }) => {
  return `
    <div class="pets-cards__item">
      <img
        src=${img}
        alt="${name}"
        class="pagination__cards-img"
      />
      <p class="pets-cards__title">${name}</p>
      <button class="pagination__cards-button">Learn more</button>
    </div>
  `;
};

export const pagination = async (recordsPerPage = 8) => {
  const btnNext = document.querySelector(".btn-next");
  const btnPrev = document.querySelector(".btn-prev");
  const btnLast = document.querySelector(".btn-last");
  const btnFirst = document.querySelector(".btn-first");
  const cardsContainer = document.querySelector(".pagination__cards");
  const pageNumNode = document.querySelector(".pagination__btns-number");

  const data = await fetch("../../../assets/pets.json");
  const petsArr = await data.json();

  // return > [3, 1, 6, 7, 5, 2, 4, 0]

  const shuffleArray = (arr) => {
    return arr.slice().sort(() => Math.random() - 0.5);
  };

  const petsArrPagination = [];

  for (let i = 0; i < 6; i++) {
    petsArrPagination.push(...shuffleArray(petsArr));
  }

  let currentPage = 1;

  const numPages = () => {
    return Math.ceil(petsArrPagination.length / recordsPerPage);
  };

  const changePage = (page) => {
    currentPage = page;

    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    cardsContainer.innerHTML = "";

    for (let i = (page - 1) * recordsPerPage; i < page * recordsPerPage; i++) {
      cardsContainer.innerHTML += drawPetCard(petsArrPagination[i]);
    }
    pageNumNode.textContent = page;

    if (page === 1) {
      btnPrev.disabled = true;
      btnFirst.disabled = true;
      btnNext.disabled = false;
      btnLast.disabled = false;
    }
    if (page === numPages()) {
      btnNext.disabled = true;
      btnLast.disabled = true;
      btnPrev.disabled = false;
      btnFirst.disabled = false;
    } else {
      btnNext.disabled = false;
      btnLast.disabled = false;
      btnPrev.disabled = false;
      btnFirst.disabled = false;
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      currentPage--;
      changePage(currentPage);
    }
  };

  const nextPage = () => {
    if (currentPage < numPages()) {
      currentPage++;
      changePage(currentPage);
    }
  };

  btnNext.addEventListener("click", () => nextPage());
  btnPrev.addEventListener("click", () => prevPage());
  btnFirst.addEventListener("click", () => changePage(1));
  btnLast.addEventListener("click", () => changePage(numPages()));

  window.onload = function () {
    changePage(1);
  };
};

/* 
Реализация пагинации на странице Pets: +36
- при перезагрузке страницы всегда открывается первая страница пагинации: +2
- при нажатии кнопок > или < открывается следующая или предыдущая страница пагинации соответственно: +2
- при нажатии кнопок >> или << открывается последняя или первая страница пагинации соответственно: +2
- при открытии первой страницы кнопки << и < неактивны: +2
- при открытии последней страницы кнопки > и >> неактивны: +2
- в кружке по центру указан номер текущей страницы. При переключении страниц номер меняется на актуальный: +2
- каждая страница пагинации содержит псевдослучайный набор питомцев, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:
  - при загрузке страницы формируется массив из 48 объектов питомцев. Каждый из 8 питомцев должен встречаться ровно 6 раз: +4
  - при каждой перезагрузке страницы формируется новый массив со случайной последовательностью: +4
  - карточки питомцев не должны повторяться на одной странице: +4
  - при переключении страницы данные меняются (для >1280px меняется порядок карточек, для остальных - меняется набор и порядок карточек): +4
  - при неизменных размерах области пагинации, в том числе размерах окна браузера, и без перезагрузки страницы, возвращаясь на страницу под определенным номером, контент на ней
  всегда будет одинаков. Т.е. карточки питомцев будут в том же расположении, что и были до перехода на другие страницы: +2
  - общее количество страниц при ширине экрана 1280px - 6, при 768px - 8, при 320px - 16 страниц: +2
- при изменении ширины экрана (от 1280px до 320px и обратно), пагинация перестраивается и работает без перезагрузки страницы (страница может оставаться той же или переключаться,
 при этом сформированный массив - общая последовательность карточек - не обновляется, сохраняются все остальные требования к пагинации): +4

*/
