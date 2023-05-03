import getLetters from './getLetters.js';

// в лока сторэдж
function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
window.addEventListener('beforeunload', setLocalStorage);

// Сброс нажатых кнопок состяний
function reset(shift,caps) {
  const buttons = document.querySelectorAll('.keyboard__button');
  const letters = getLetters(buttons);
  if (shift) {
    shift = false;
    changeButtons(letters, false);
  }
  if (caps) {
    caps = false;
    changeCase(letters, false);
  }
}

export default function changeLang(buttons, lang, shift, caps) {
  const letters = buttons;
  const change = document.querySelector('.keyboard__change');
  change.textContent = lang;
  reset();
  // TODO: поменять символы
  const RUS = [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
    'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
    'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
    'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', '←', '↓', '→',
  ];
  const ENG = [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'",
    'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', '←', '↓', '→',
  ];
  const { length } = letters;
  if (lang === 'rus') {
    for (let i = 0; i < length; i += 1) {
      letters[i].textContent = RUS[i];
    }
  } else {
    for (let i = 0; i < length; i += 1) {
      letters[i].textContent = ENG[i];
    }
  }
  setLocalStorage('lang', lang);
}