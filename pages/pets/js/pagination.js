import petsArr from '../../../assets/pets.json' assert { type: 'json' };

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

export const pagination = (recordsPerPage = 8) => {
  const btnNext = document.querySelector('.btn-next');
  const btnPrev = document.querySelector('.btn-prev');
  const btnLast = document.querySelector('.btn-last');
  const btnFirst = document.querySelector('.btn-first');
  const cardsContainer = document.querySelector('.pagination__cards');
  const pageNumNode = document.querySelector('.pagination__btns-number');

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

    cardsContainer.innerHTML = '';

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

  btnNext.addEventListener('click', () => nextPage());
  btnPrev.addEventListener('click', () => prevPage());
  btnFirst.addEventListener('click', () => changePage(1));
  btnLast.addEventListener('click', () => changePage(numPages()));

  window.onload = function () {
    changePage(1);
  };
};
