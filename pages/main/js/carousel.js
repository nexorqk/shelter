export const carousel = (currentNumOfCards = 3, petsArr) => {
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

  const genereateCoupleWithRandomNumbers = (exception = []) => {
    const arr = new Array(8).fill(0).map((item, index) => item + index);
    const prepArr =
      exception.length > 0
        ? arr.filter((item) => !exception.includes(item))
        : arr;
    const res = [];

    for (let i = 0; i < currentNumOfCards; i++) {
      const index = Math.floor(Math.random() * prepArr.length);
      res.push(prepArr[index]);
      prepArr.splice(index, 1);
    }

    return res;
  };

  ACTIVE_ITEM.innerHTML = "";
  const random = genereateCoupleWithRandomNumbers();
  random.forEach((item) => {
    const card = createCard(petsArr[item]);
    ACTIVE_ITEM.append(card);
  });

  const expectedArr = [];
  expectedArr.push(random);

  const secondRandom = genereateCoupleWithRandomNumbers(expectedArr[0]);
  const sideItems = [LEFT_ITEM, RIGHT_ITEM];
  sideItems.forEach((itemPos) => {
    itemPos.innerHTML = "";
    secondRandom.forEach((item) => {
      const card = createCard(petsArr[item]);
      itemPos.append(card);
    });
  });

  expectedArr.pop();
  expectedArr.push(secondRandom);

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
    const randomCouple = genereateCoupleWithRandomNumbers(expectedArr[0]);
    randomCouple.forEach((item) => {
      const card = createCard(petsArr[item]);
      changedItem.append(card);
    });

    expectedArr.pop();
    expectedArr.push(randomCouple);

    BTN_RIGHT.addEventListener("click", moveRight);
    BTN_LEFT.addEventListener("click", moveLeft);
  });

  BTN_LEFT.addEventListener("click", moveLeft);
  BTN_RIGHT.addEventListener("click", moveRight);
};
