const data = await fetch("../../../assets/pets.json");
const petsArr = await data.json();

const CAROUSEL = document.querySelector(".carousel");
const LEFT_ITEM = document.querySelector(".pets-cards__group.left");
const ACTIVE_ITEM = document.querySelector(".pets-cards__group.active");
const RIGHT_ITEM = document.querySelector(".pets-cards__group.right");
const BTN_LEFT = document.querySelector(".cards-left-btn");
const BTN_RIGHT = document.querySelector(".cards-right-btn");

const createCard = (pet) => {
  const { img, name } = pet;
  const card = document.createElement("div");
  card.classList.add("pets-cards__item");

  card.innerHTML = `
                    <img
                      class="pets-cards__img"
                      src="${img}"
                      alt="${name}"
                    />
                    <div class="pets-cards__title">${name}</div>
                    <button class="pets-cards__button">Learn more</button>`;

  return card;
};

const moveLeft = () => {
  CAROUSEL.classList.add("transition-left");

  BTN_LEFT.removeEventListener("click", moveLeft);
  BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
  CAROUSEL.classList.add("transition-right");

  BTN_LEFT.removeEventListener("click", moveLeft);
  BTN_RIGHT.removeEventListener("click", moveRight);
};

const executeCarousel = () => {
  const innerWidth = window.innerWidth;
  let currentNumberOfCards;

  if (innerWidth < 1200) {
    currentNumberOfCards = 2;
  } else if (innerWidth < 767.9) {
    currentNumberOfCards = 1;
  } else {
    currentNumberOfCards = 3;
  }

  const genereateCoupleWithRandomNumbers = (exception = []) => {
    const arr = new Array(8).fill(0).map((item, index) => item + index);
    const prepArr =
      exception.length > 0
        ? arr.filter((item) => !exception.includes(item))
        : arr;
    const res = [];

    for (let i = 0; i < currentNumberOfCards; i++) {
      const index = Math.floor(Math.random() * prepArr.length);
      res.push(prepArr[index]);
      prepArr.splice(index, 1);
    }

    return res;
  };

  const random = genereateCoupleWithRandomNumbers();
  ACTIVE_ITEM.innerHTML = "";
  random.forEach((item) => {
    const card = createCard(petsArr[item]);
    ACTIVE_ITEM.append(card);
  });

  let expectedRandomArr = [];

  const secondRandom = genereateCoupleWithRandomNumbers(random);
  const sideItems = [LEFT_ITEM, RIGHT_ITEM];
  sideItems.forEach((itemPos) => {
    itemPos.innerHTML = "";
    secondRandom.forEach((item) => {
      const card = createCard(petsArr[item]);
      itemPos.append(card);
    });
  });
  expectedRandomArr = secondRandom;

  CAROUSEL.addEventListener("animationend", (event) => {
    let changedItem;
    let secondItem;

    if (event.animationName === "move-left") {
      CAROUSEL.classList.remove("transition-left");
      changedItem = LEFT_ITEM;
      secondItem = RIGHT_ITEM;
    } else {
      CAROUSEL.classList.remove("transition-right");
      changedItem = RIGHT_ITEM;
      secondItem = LEFT_ITEM;
    }

    secondItem.innerHTML = ACTIVE_ITEM.innerHTML;

    ACTIVE_ITEM.innerHTML = changedItem.innerHTML;

    changedItem.innerHTML = "";
    const randomCouple = genereateCoupleWithRandomNumbers(expectedRandomArr);
    randomCouple.forEach((item) => {
      const card = createCard(petsArr[item]);
      changedItem.append(card);
    });
    expectedRandomArr = randomCouple;

    BTN_RIGHT.addEventListener("click", moveRight);
    BTN_LEFT.addEventListener("click", moveLeft);
  });

  BTN_LEFT.addEventListener("click", moveLeft);
  BTN_RIGHT.addEventListener("click", moveRight);
};

export const carousel = () => {
  executeCarousel();

  let timeoutFunctionID;
  window.addEventListener("resize", () => {
    clearTimeout(timeoutFunctionID);
    timeoutFunctionID = setTimeout(executeCarousel, 1000);
  });
};
