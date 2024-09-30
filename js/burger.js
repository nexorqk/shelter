export const burger = () => {
  const body = document.body;
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav__link");
  const shadow = document.querySelector(".shadow");

  const navLinksItems = Array.from(navLinks);

  const changeActiveLink = (clickedLink = "") => {
    navLinksItems.forEach((item) => item.classList.remove("active"));
    const href = clickedLink || window.location.href;

    if (href.endsWith("#contacts")) {
      navLinksItems.forEach((item, index) =>
        index === 3 ? item.classList.add("active") : null
      );
    } else if (href.endsWith("#help")) {
      navLinksItems.forEach((item, index) =>
        index === 2 ? item.classList.add("active") : null
      );
    } else if (href.includes("pets")) {
      navLinksItems.forEach((item, index) =>
        index === 1 ? item.classList.add("active") : null
      );
    } else {
      navLinksItems.forEach((item, index) =>
        index === 0 ? item.classList.add("active") : null
      );
    }
  };

  document.addEventListener("DOMContentLoaded", () => changeActiveLink());

  const openMenuEffects = () => {
    if (body.classList.contains("no-scroll")) {
      body.classList.remove("no-scroll");
    }

    burger.classList.toggle("open");
    nav.classList.toggle("open");
    shadow.classList.toggle("open");

    if (burger.classList.contains("open")) {
      body.classList.add("no-scroll");
    }
  };

  const closeMenuEffects = () => {
    burger.classList.remove("open");
    nav.classList.remove("open");
    shadow.classList.remove("open");
    body.classList.remove("no-scroll");
  };

  burger.addEventListener("click", openMenuEffects);

  shadow.addEventListener("click", closeMenuEffects);

  const openLink = (e) => {
    burger.classList.remove("open");
    nav.classList.remove("open");
    shadow.classList.remove("open");
    body.classList.remove("no-scroll");
    changeActiveLink(e.target.href);
  };

  navLinksItems.map((link) => link.addEventListener("click", openLink));
};
