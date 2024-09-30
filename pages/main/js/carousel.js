export const carousel = (currentNumOfCards, petsArr) => {
  const CAROUSEL = document.querySelector(".carousel");
  const BTN_LEFT = document.querySelector(".cards-left-btn");
  const BTN_RIGHT = document.querySelector(".cards-right-btn");

  const createCardInstance = (pet) => {
    const { name, img } = { ...pet };

    const cardItem = document.createElement("div");
    cardItem.classList.add("pets-cards__item");
    cardItem.innerHTML = `<img class="pets-cards__img" src="${img}" alt="${name}">
                          <div class="pets-cards__title">${name}</div>
                          <button class="pets-cards__button">Learn more</button>`;

    return cardItem;
  };

  const groupsOfCardsArr = ["left", "active", "right"];

  const createWrapperForGroupsOfCards = (positionItem) => {
    const currentGroup = document.createElement("div");
    currentGroup.classList.add("pets-cards__group", positionItem);

    return currentGroup;
  };

  groupsOfCardsArr.forEach((item) =>
    CAROUSEL.append(createWrapperForGroupsOfCards(item))
  );

  const createGroupOfCards = (cardIndexesArr, positionItem) => {
    const currentGroup = document.querySelector(
      `.pets-cards__group.${positionItem}`
    );
    currentGroup.innerHTML = "";

    for (let i = 0; i < cardIndexesArr.length; i++) {
      const item = createCardInstance(petsArr[cardIndexesArr[i]]);
      currentGroup.append(item);
    }
  };

  createGroupOfCards([3, 3, 3], groupsOfCardsArr[0]);
  createGroupOfCards([5, 1, 6], groupsOfCardsArr[1]);
  createGroupOfCards([4, 4, 4], groupsOfCardsArr[2]);

  const moveLeft = () => {
    CAROUSEL.classList.add("transition-left");
    BTN_RIGHT.removeEventListener("click", moveRight);
    BTN_LEFT.removeEventListener("click", moveLeft);
  };

  const moveRight = () => {
    CAROUSEL.classList.add("transition-right");
    BTN_RIGHT.removeEventListener("click", moveRight);
    BTN_LEFT.removeEventListener("click", moveLeft);
  };

  CAROUSEL.addEventListener("animationend", (animationEvent) => {
    console.log(animationEvent);
    // animationName
  });

  BTN_LEFT.addEventListener("click", moveLeft);
  BTN_LEFT.addEventListener("click", moveRight);
};

/* 
-при переключении влево или вправо прокручивается ровно столько карточек, сколько показывается при текущей ширине экрана (3 для 1280px, 2 для 768px, 1 для 320px): +4
- каждый новый слайд содержит псевдослучайный набор карточек животных, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:
  - в текущем блоке слайда карточки с питомцами не повторяются: +4
  - в следующем блоке нет дублирования карточек с текущим блоком. Например в слайдере из 3 элементов, следующий выезжающий слайд будет содержать 3 (из 8 доступных) новых карточки
   питомца, таких, каких не было среди 3х карточек на предыдущем уехавшем слайде: +4
  - сохраняется только одно предыдущее состояние. Т.е. при последовательном переходе два раза влево, а потом два раза вправо, мы получим набор карточек, отличный от исходного: +4
  - при каждой перезагрузке страницы формируется новая последовательность карточек: +2
  - генерация наборов карточек происходит на основе 8 объектов с данными о животных: +2
- при изменении ширины экрана (от 1280px до 320px и обратно), слайдер перестраивается и работает без перезагрузки страницы (набор карточек при этом может как изменяться, так и 
оставаться тем же, скрывая лишнюю или добавляя недостающую, и сохраняя при этом описанные для слайдера требования): +4
*/
