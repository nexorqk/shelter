export const burger = () => {
  const body = document.body;
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const shadow = document.querySelector('.shadow');

  const navLinksItems = Array.from(navLinks);

  const openMenuEffects = () => {
    if (body.classList.contains('no-scroll')) {
      body.classList.remove('no-scroll');
    }

    burger.classList.toggle('open');
    nav.classList.toggle('open');
    shadow.classList.toggle('open');

    if (burger.classList.contains('open')) {
      body.classList.add('no-scroll');
    }
  };

  const closeMenuEffects = () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
    shadow.classList.remove('open');
    body.classList.remove('no-scroll');
  };

  burger.addEventListener('click', openMenuEffects);

  shadow.addEventListener('click', closeMenuEffects);

  const openLink = () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
    shadow.classList.remove('open');
    body.classList.remove('no-scroll');
  };

  navLinksItems.map((link) => link.addEventListener('click', openLink));

  // navLinksItems.forEach((link) => {
  //   const linkHrefItems = link.href.split('#');
  //   if (linkHrefItems.length > 1) {
  //     if (linkHrefItems[1] === 'contacts') {
  //     }
  //   }
  // });
};
