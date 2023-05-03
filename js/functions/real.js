/* eslint-disable no-multi-assign */
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

export default function realPush() {
  let caps = false;
  const buttons = document.querySelectorAll('.keyboard__button');
  const display = document.querySelector('.input-block');
  const shift = document.querySelector('.keyboard__shift');
  const letters = getLetters(buttons);
  const notButtonToEnter = ['Caps', 'Shift', 'Ctrl', 'Win', 'Alt', 'Back', 'Del', 'Enter', 'Tab', '__', 'Del', 'Back', 'eng', 'rus'];
  const arrows = ['↑', '←', '↓', '→'];
  const arrowsCode = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
  document.body.addEventListener('keydown', (event) => {
    const start = display.selectionStart;
    const end = display.selectionEnd;
    const oldStr = display.value;
    let keyValue;
    for (let i = 0; i < buttons.length; i += 1) {
      display.selectionStart = display.value.length;
      if (buttons[i].dataset.code === event.code) {
        keyValue = buttons[i].textContent;
      }
    }
    switch (event.key.toLowerCase()) {
      case 'tab': {
        event.preventDefault();
        display.value = `${oldStr.slice(0, start)}  ${oldStr.slice(end)}`;
        display.selectionStart = start + 2;
        display.selectionEnd = start + 2;
        break;
      }
      case 'capslock': {
        event.preventDefault();
        caps = !caps;
        changeCase(letters, caps);
        break;
      }
      case 'shift': {
        event.preventDefault();
        changeButtons(letters, true);
        if (caps) {
          changeCase(letters, false);
        }
        document.body.addEventListener('keydown', (eventNew) => {
          if (eventNew.key.toLowerCase() === 'alt') {
            lang = lang === 'eng' ? 'rus' : 'eng';
            changeLang(letters);
          }
        });
        break;
      }
      case 'delete': {
        event.preventDefault();
        display.value = oldStr.slice(0, start) + oldStr.slice(end + 1);
        display.selectionStart = display.selectionEnd = start;
        break;
      }
      case 'enter': {
        event.preventDefault();
        display.value = `${display.value.slice(0, start)}\n${display.value.slice(end)}`;
        display.selectionStart = display.selectionEnd = start + 1;
        break;
      }
      case 'backspace': {
        event.preventDefault();
        if (start >= 1) {
          display.value = oldStr.slice(0, start - 1) + oldStr.slice(end);
          display.selectionStart = display.selectionEnd = start - 1;
        }
        else {
          display.selectionStart = display.selectionEnd = start
        }
        break;
      }
      case ' ': {
        event.preventDefault();
        display.value = `${oldStr.slice(0, start)} ${oldStr.slice(end)}`;
        display.selectionStart = display.selectionEnd = start + 1;
        break;
      }
      default: {
        event.preventDefault();
        if (!notButtonToEnter.includes(keyValue) && keyValue !== undefined) {
          display.value = `${oldStr.slice(0, start)}${keyValue}${oldStr.slice(end)}`;
          display.selectionStart = display.selectionEnd = start + 1;
        }
        if (arrowsCode.includes(event.code)) {
          for (let i = 0; i < 4; i += 1) {
            if (event.code === arrowsCode[i]) {
              display.value = `${oldStr.slice(0, start)}${arrows[i]}${oldStr.slice(end)}`;
            }
          }
        }
      }
    }
    for (let i = 0; i < buttons.length; i += 1) {
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
      if (buttons[i].dataset.code === 'ShiftLeft' || buttons[i].dataset.code === 'ShiftRight') {
        if (caps) {
          changeCase(letters, true);
        }
      }
    }
  });
}
