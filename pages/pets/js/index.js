import { burger } from "../../../js/burger.js";
import { modal } from "../../../js/modal.js";
import { pagination } from "./pagination.js";

burger();
modal();

const viewportWidth = window.innerWidth;

if (viewportWidth >= 1280) {
  pagination(8);
} else if (viewportWidth < 1280 && viewportWidth >= 768) {
  pagination(6);
} else if (viewportWidth < 768) {
  pagination(3);
}

/* 
  Реализация пагинации на странице Pets: +36
  при перезагрузке страницы всегда открывается первая страница пагинации: +2
  при нажатии кнопок > или < открывается следующая или предыдущая страница пагинации соответственно: +2
  при нажатии кнопок >> или << открывается последняя или первая страница пагинации соответственно: +2
  при открытии первой страницы кнопки << и < неактивны: +2
  при открытии последней страницы кнопки > и >> неактивны: +2
  в кружке по центру указан номер текущей страницы. При переключении страниц номер меняется на актуальный: +2
  каждая страница пагинации содержит псевдослучайный набор питомцев, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:
  при загрузке страницы формируется массив из 48 объектов питомцев. Каждый из 8 питомцев должен встречаться ровно 6 раз: +4
  при каждой перезагрузке страницы формируется новый массив со случайной последовательностью: +4
  карточки питомцев не должны повторяться на одной странице: +4
  при переключении страницы данные меняются (для >1280px меняется порядок карточек, для остальных - меняется набор и порядок карточек): +4
  при неизменных размерах области пагинации, в том числе размерах окна браузера, и без перезагрузки страницы, возвращаясь на страницу под определенным номером, контент на ней всегда будет одинаков. Т.е. карточки питомцев будут в том же расположении, что и были до перехода на другие страницы: +2
  общее количество страниц при ширине экрана 1280px - 6, при 768px - 8, при 320px - 16 страниц: +2
  при изменении ширины экрана (от 1280px до 320px и обратно), пагинация перестраивается и работает без перезагрузки страницы (страница может оставаться той же или переключаться, при этом сформированный массив - общая последовательность карточек - не обновляется, сохраняются все остальные требования к пагинации): +4
 */
