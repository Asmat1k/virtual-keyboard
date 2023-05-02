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
  const notButtonToEnter = ['Caps', 'CAPS', 'Shift', 'Ctrl', 'Win', 'Alt', 'Back', 'Del', 'eng', 'rus'];
  const deleteButtons = ['Del', 'Back'];
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.textContent.toLocaleLowerCase() === 'caps') {
        caps = !caps;
        changeCase(letters, caps);
      }
      if (button.textContent.toLocaleLowerCase() === 'shift') {
        shift = !shift;
        caps = false;
        changeCase(letters, false);
        changeButtons(letters, shift);
      }
      // Смена языка
      if (button.classList.contains('keyboard__change')) {
        lang = lang === 'eng' ? 'rus' : 'eng';
        changeLang(letters, lang);
      }
      // Удаление
      if (deleteButtons.includes(button.textContent)) {
        switch (button.textContent) {
          case 'Back': {
            if (!display.focus()) {
              display.focus();
            }
            const start = display.selectionStart;
            const end = display.selectionEnd;
            const oldStr = display.value;
            display.value = oldStr.slice(0, start - 1) + oldStr.slice(end);
            // eslint-disable-next-line no-multi-assign
            display.selectionStart = display.selectionEnd = start - 1;
            break;
          }
          case 'Del': {
            if (!display.focus()) {
              display.focus();
            }
            const oldStr = display.value;
            const start = display.selectionStart;
            const end = display.selectionEnd;
            display.value = oldStr.slice(0, start) + oldStr.slice(end + 1);
            // eslint-disable-next-line no-multi-assign
            display.selectionStart = display.selectionEnd = start;
            break;
          }
          default:
        }
      }
      // Ввод текста
      if (!notButtonToEnter.includes(button.textContent)) {
        switch (button.textContent) {
          case '__': {
            display.value += ' ';
            break;
          }
          case 'Tab': {
            display.value += '  ';
            break;
          }
          case 'Enter': {
            display.value += '\n';
            break;
          }
          default: {
            display.value += button.textContent;
            break;
          }
        }
      }
    });
  });
}
