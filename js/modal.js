export const modal = async () => {
  const closePopup = document.querySelector(".modal-card__close-btn");
  const popup = document.querySelector(".modal-card");
  const popupItemContent = document.querySelector(".modal-card__item-content");
  const popupShadow = document.querySelector(".modal-card__shadow");
  const cardsContainer = document.querySelector(".carousel");
  const paginationCards = document.querySelector(".pagination__cards");

  const data = await fetch("/assets/pets.json");
  const petsArr = await data.json();

  closePopup.insertAdjacentHTML(
    "afterbegin",
    '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/></svg>'
  );

  const { body, documentElement } = document;
  let { scrollTop } = document.documentElement;

  const disableScroll = () => {
    document.documentElement.style.scrollBehavior = "auto";
    scrollTop = documentElement.scrollTop;
    body.style.top = `-${scrollTop}px`;
    body.classList.add("no-scroll");
  };

  const enableScroll = () => {
    body.classList.remove("no-scroll");
    documentElement.scrollTop = scrollTop;
    body.style.removeProperty("top");
    document.documentElement.style.scrollBehavior = "smooth";
  };

  const setPopupContent = (cardNode) => {
    const petName = cardNode.querySelector(".pets-cards__title").textContent;
    const {
      name,
      modal,
      type,
      breed,
      description,
      age,
      inoculations,
      diseases,
      parasites,
    } = petsArr.find((pet) => pet.name === petName);
    popupItemContent.innerHTML = `
      <img
        src=${modal}
        alt="${name}"
        class="modal-card__img"
      />
      <div class="modal-card__desc_wrapper">
        <h2 class="modal-card__name .title">
          ${name}
        </h2>
        <h3 class="modal-card__species">${type} - ${breed}</h3>
        <p class="modal-card__desc">
          ${description}
        </p>
        <ul class="modal-card__list">
          <li class="modal-card__list-item">
            Age: ${age}
          </li>
          <li class="modal-card__list-item">
            Inoculations: ${inoculations}
          </li>
          <li class="modal-card__list-item">
            Diseases: ${diseases}
          </li>
          <li class="modal-card__list-item">
            Parasites: ${parasites}
          </li>
        </ul>
    `;
  };

  if (cardsContainer) {
    cardsContainer.addEventListener("click", (e) => {
      if (e.target.closest(".pets-cards__item")) {
        popup.classList.add("active");
        disableScroll();
        setPopupContent(e.target.closest(".pets-cards__item"));
      }
    });
  } else {
    paginationCards.addEventListener("click", (e) => {
      if (e.target.closest(".pets-cards__item")) {
        popup.classList.add("active");
        disableScroll();
        setPopupContent(e.target.closest(".pets-cards__item"));
      }
    });
  }

  closePopup.addEventListener("click", () => {
    popup.classList.remove("active");
    enableScroll();
  });
  popupShadow.addEventListener("click", (e) => {
    if (!e.target.closest(".modal-card__item-content")) {
      popup.classList.remove("active");
      enableScroll();
    }
  });
};
