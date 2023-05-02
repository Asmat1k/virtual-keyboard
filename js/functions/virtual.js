/* eslint-disable no-multi-assign */
/* eslint-disable import/extensions */
import changeButtons from './shift.js';
import getLetters from './getletters.js';
import changeCase from './changeCase.js';

let caps = false;
let shift = false;
let lang;

// в лока сторэдж
function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
window.addEventListener('beforeunload', setLocalStorage);

// Сброс нажатых кнопок состяний
function reset() {
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

function getLocalStorage() {
  const buttons = document.querySelectorAll('.keyboard__button');
  const letters = getLetters(buttons);
  if (localStorage.getItem('lang')) {
    if (localStorage.getItem('lang') === 'eng') {
      lang = 'eng';
    } else {
      lang = 'rus';
      changeLang(letters);
    }
  }
}
window.addEventListener('load', getLocalStorage);

export default function virtualPush() {
  const buttons = document.querySelectorAll('.keyboard__button');
  const display = document.querySelector('.input-block');
  const letters = getLetters(buttons);
  const notButtonToEnter = ['Caps', 'Shift', 'Ctrl', 'Win', 'Alt', 'Back', 'Del', 'Enter', 'Tab', '__', 'Del', 'Back', 'eng', 'rus'];
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      display.focus();
      const start = display.selectionStart;
      const end = display.selectionEnd;
      const oldStr = display.value;
      // Ввод текста
      switch (button.textContent.toLocaleLowerCase()) {
        case 'caps': {
          caps = !caps;
          changeCase(letters, caps);
          break;
        }
        case 'shift': {
          shift = !shift;
          changeButtons(letters, shift);
          if (!shift) {
            changeCase(letters, caps);
          }
          break;
        }
        case '__': {
          display.value = `${oldStr.slice(0, start)} ${oldStr.slice(end)}`;
          display.selectionStart = display.selectionEnd = start + 1;
          break;
        }
        case 'tab': {
          display.value = `${display.value.slice(0, start)}  ${display.value.slice(end)}`;
          display.selectionStart = display.selectionEnd = start + 2;
          break;
        }
        case 'enter': {
          display.value = `${display.value.slice(0, start)}\n${display.value.slice(end)}`;
          display.selectionStart = display.selectionEnd = start + 1;
          break;
        }
        case 'back': {
          if (!display.focus()) {
            display.focus();
          }
          display.value = oldStr.slice(0, start - 1) + oldStr.slice(end);
          display.selectionStart = display.selectionEnd = start - 1;
          break;
        }
        case 'del': {
          if (!display.focus()) {
            display.focus();
          }
          display.value = oldStr.slice(0, start) + oldStr.slice(end + 1);
          // eslint-disable-next-line no-multi-assign
          display.selectionStart = display.selectionEnd = start;
          break;
        }
        default: {
          if (!notButtonToEnter.includes(button.textContent)) {
            display.focus();
            display.value = `${display.value.slice(0, start)}${button.textContent}${display.value.slice(end)}`;
            display.selectionStart = display.selectionEnd = start + 1;
          }
          break;
        }
      }
      // Смена языка
      if (button.classList.contains('keyboard__change')) {
        lang = lang === 'eng' ? 'rus' : 'eng';
        changeLang(letters, lang);
      }
    });
  });
}
