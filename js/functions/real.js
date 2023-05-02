/* eslint-disable import/extensions */
/* eslint-disable max-len */
import changeButtons from './shift.js';
import getLetters from './getletters.js';
import changeCase from './changeCase.js';

let lang;

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    if (localStorage.getItem('lang') === 'eng') {
      lang = 'eng';
    } else {
      lang = 'rus';
    }
  }
}
window.addEventListener('load', getLocalStorage);

// в лока сторэдж
function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
window.addEventListener('beforeunload', setLocalStorage);

// Сброс нажатых кнопок состяний
function reset() {
  const buttons = document.querySelectorAll('.keyboard__button');
  const letters = getLetters(buttons);
  changeButtons(letters, false);
  changeCase(letters, false);
}

function changeLang(buttons) {
  const letters = buttons;
  const change = document.querySelector('.keyboard__change');
  change.textContent = lang;
  reset();
  // TODO: поменять символы
  const RUS = [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
    'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '|',
    'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
    'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', '←', '↓', '→',
  ];
  const ENG = [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|',
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

export default function realPush() {
  let caps = false;
  const buttons = document.querySelectorAll('.keyboard__button');
  const display = document.querySelector('.input-block');
  const shift = document.querySelector('.keyboard__shift');
  const change = document.querySelector('.keyboard__change');
  const letters = getLetters(buttons);
  const RUS = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я'];
  const ENG = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const arrows = ['↑', '←', '↓', '→'];
  const arrowsCode = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
  document.body.addEventListener('keydown', (event) => {
    switch (event.key.toLowerCase()) {
      case 'tab': {
        event.preventDefault();
        const start = display.selectionStart;
        const end = display.selectionEnd;
        display.value = `${display.value.slice(0, start)}  ${display.value.slice(end)}`;
        display.selectionStart = start + 2;
        display.selectionEnd = start + 2;
        break;
      }
      case 'capslock': {
        caps = !caps;
        changeCase(letters, caps);
        break;
      }
      case 'shift': {
        caps = false;
        changeCase(letters, false);
        changeButtons(letters, true);
        document.body.addEventListener('keydown', (eventNew) => {
          if (eventNew.key.toLowerCase() === 'alt') {
            lang = lang === 'eng' ? 'rus' : 'eng';
            changeLang(letters);
          }
        });
        break;
      }
      case 'delete': {
        const oldStr = display.value;
        const start = display.selectionStart;
        const end = display.selectionEnd;
        display.value = oldStr.slice(0, start) + oldStr.slice(end + 1);
        // eslint-disable-next-line no-multi-assign
        display.selectionStart = display.selectionEnd = start;
        break;
      }
      case 'backspace': {
        event.preventDefault();
        const start = display.selectionStart;
        const end = display.selectionEnd;
        const oldStr = display.value;
        display.value = oldStr.slice(0, start - 1) + oldStr.slice(end);
        // eslint-disable-next-line no-multi-assign
        break;
      }
      default: {
        display.focus();
        if (arrowsCode.includes(event.code)) {
          // чтобы не было перехода назад
          event.preventDefault();
          for (let i = 0; i < 4; i += 1) {
            if (event.code === arrowsCode[i]) {
              display.value += arrows[i];
            }
          }
        }
        if (RUS.includes(event.key.toLowerCase()) && change.textContent.toLowerCase() === 'eng') {
          lang = 'rus';
          changeLang(letters);
        } else if (ENG.includes(event.key.toLowerCase()) && change.textContent.toLowerCase() === 'rus') {
          lang = 'eng';
          changeLang(letters);
        }
      }
    }
    for (let i = 0; i < buttons.length; i += 1) {
      display.selectionStart = display.value.length;
      if (buttons[i].dataset.code === event.code) {
        buttons[i].classList.add('active');
      }
    }
  });
  document.body.addEventListener('keyup', (event) => {
    if (event.key.toLowerCase() === shift.textContent.toLowerCase()) {
      changeButtons(letters, false);
    }
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].dataset.code === event.code) {
        buttons[i].classList.remove('active');
      }
    }
  });
}
