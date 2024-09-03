import petsArr from '../../../assets/pets.json' assert { type: 'json' };

export const carousel = (currentNum = 3) => {
  const CAROUSEL = document.querySelector('.carousel');
  const BTN_LEFT = document.querySelector('.cards-left-btn');
  const BTN_RIGHT = document.querySelector('.cards-right-btn');
  const LEFT_ITEM = document.querySelector('.left-item');
  const ACTIVE_ITEM = document.querySelector('.active-item');
  const RIGHT_ITEM = document.querySelector('.right-item');

  const randomNum = () => Math.floor(Math.random() * 8);

  const createCardTemplate = () => {
    const card = document.createElement('div');
    card.classList.add('pets-cards__item');
    return card;
  };

  const cardContent = (idx) => {
    const { name, img } = petsArr[idx];
    return `<img class="pets-cards__img" src="${img}" alt="${name}">
            <div class="pets-cards__title">${name}</div>
            <button class="pets-cards__button">Learn more</button>`;
  };

  const createCardItem = (type) => {
    for (let i = 0; i < 3; i++) {
      const card = createCardTemplate();
      card.insertAdjacentHTML('afterbegin', cardContent(randomNum()));

      type.append(card);
    }

    return type;
  };

  CAROUSEL.append(createCardItem(LEFT_ITEM));
  CAROUSEL.append(createCardItem(ACTIVE_ITEM));
  CAROUSEL.append(createCardItem(RIGHT_ITEM));

  const moveLeft = () => {
    CAROUSEL.classList.add('transition-left');
    BTN_LEFT.removeEventListener('click', moveLeft);
    BTN_RIGHT.removeEventListener('click', moveRight);
  };

  const moveRight = () => {
    CAROUSEL.classList.add('transition-right');
    BTN_LEFT.removeEventListener('click', moveLeft);
    BTN_RIGHT.removeEventListener('click', moveRight);
  };

  BTN_LEFT.addEventListener('click', moveLeft);
  BTN_RIGHT.addEventListener('click', moveRight);

  CAROUSEL.addEventListener('animationend', (animationEvent) => {
    let itemWithChanges;
    if (animationEvent.animationName === 'move-left') {
      CAROUSEL.classList.remove('transition-left');
      itemWithChanges = LEFT_ITEM;
      CAROUSEL.classList.remove('transition-right');
      ACTIVE_ITEM.innerHTML = LEFT_ITEM.innerHTML;
    } else {
      CAROUSEL.classList.remove('transition-right');
      itemWithChanges = RIGHT_ITEM;
      CAROUSEL.classList.remove('transition-left');
      ACTIVE_ITEM.innerHTML = RIGHT_ITEM.innerHTML;
    }

    itemWithChanges.innerHTML = '';

    for (let i = 0; i < 3; i++) {
      const card = createCardTemplate();
      card.insertAdjacentHTML('afterbegin', cardContent(randomNum()));
      itemWithChanges.appendChild(card);
    }

    BTN_LEFT.addEventListener('click', moveLeft);
    BTN_RIGHT.addEventListener('click', moveRight);
  });
};
